import { useEffect, useState } from 'react'

export type AsyncState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: Error }

/**
 * Ejecuta `load` y expone su estado. `load` debe estar memoizada
 * (useCallback): cada vez que cambia se vuelve a ejecutar.
 */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load().then(
      (data) => {
        if (active) setState({ status: 'success', data })
      },
      (error: unknown) => {
        if (active) {
          setState({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) })
        }
      },
    )
    return () => {
      active = false
    }
  }, [load])

  return state
}
