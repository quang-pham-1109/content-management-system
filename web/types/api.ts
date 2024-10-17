import * as t from 'io-ts'

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestOptions {
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
}

export const errorResponseC = t.type({
  code: t.number,
  error: t.string,
})

export type ErrorResponse = t.TypeOf<typeof errorResponseC>

// Toast severity types of @PrimeVue
export type ToastSeverity =
  | 'success'
  | 'error'
  | 'info'
  | 'warn'
  | 'secondary'
  | 'contrast'
