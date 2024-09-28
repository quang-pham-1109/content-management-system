import { useToast } from 'primevue/usetoast'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
}

interface ErrorOptions {
  code: number
  message: string
}

export function useAPI<T>(loading: Ref<boolean>, method: HTTPMethod = 'GET') {
  const toast = useToast()

  const fetchData = async (
    url: string,
    options: RequestOptions = {}
  ): Promise<T | ErrorOptions> => {
    loading.value = true
    try {
      // Build query
      let fullUrl = url
      if (method === 'GET' && options.params) {
        const query = new URLSearchParams(options.params).toString()
        fullUrl += `?${query}`
      }

      // Add addtional headers
      const fetchOptions: any = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      }

      if (method !== 'GET' && options.body) {
        fetchOptions.body = JSON.stringify(options.body)
      }

      const response = await $fetch<T>(fullUrl, fetchOptions)
      return response
    } catch (error: any) {
      console.error(typeof error, error)
      // Extract error message
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred.'

      // Display error toast using PrimeVue
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000,
      })

      return {
        code: error?.response?.status || 500,
        message,
      }
    } finally {
      loading.value = false
    }
  }

  return { fetchData }
}
