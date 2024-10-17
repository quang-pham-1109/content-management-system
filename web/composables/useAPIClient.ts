import { useToast } from 'primevue/usetoast'
import { isLeft } from '@/fp-ts/Either'
import { PathReporter } from '@/io-ts/lib/PathReporter'
import {
  errorResponseC,
  type ErrorResponse,
  type HTTPMethod,
  type RequestOptions,
  type ToastSeverity,
} from '~/types/api'

/**
 * Hook to make API requests on the Client-side using $fetch
 *
 * @param loading
 * @param method
 * @returns
 */
export const useAPIClient = (loading: Ref<boolean>, method: HTTPMethod) => {
  const toast = useToast()

  /**
   * This function fetch data from the API, and does error handling validation via io-ts
   * @param url
   * @param requestOption
   */
  const fetchData = async <T>(url: string, requestOption: RequestOptions) => {
    const { headers, body, params } = requestOption

    try {
      loading.value = true

      const response = await $fetch<T>(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
        params,
      })

      return response
    } catch (error: any) {
      const decodedError = errorResponseC.decode({
        error: error.data.error,
        code: error.status,
      })

      if (isLeft(decodedError)) {
        const error = PathReporter.report(decodedError)
        return { error: error.join(', '), code: 500 }
      }

      return decodedError.right
    } finally {
      loading.value = false
    }
  }

  /**
   * This function receives message and display it as a toast
   * @param message
   * @param error
   */
  const displayMessage = ({
    title,
    detail,
    severity,
  }: {
    title: string
    detail: string
    severity: ToastSeverity
  }) => {
    toast.add({
      severity: severity,
      summary: title,
      detail: detail,
      life: 3000,
    })
  }

  return { fetchData, displayMessage }
}

/**
 * This function checks if 'code' and 'error' is in response
 * @param response
 * @returns
 */
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return 'code' in response && 'error' in response
}
