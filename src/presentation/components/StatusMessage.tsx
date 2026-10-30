import type { AsyncState } from '../hooks/useAsync'

interface StatusMessageProps {
  readonly state: AsyncState<unknown>
}

/** Muestra carga o error; no renderiza nada cuando la carga fue exitosa. */
export function StatusMessage({ state }: StatusMessageProps) {
  if (state.status === 'loading') return <p className="status">Cargando…</p>
  if (state.status === 'error') {
    return (
      <p className="status status--error" role="alert">
        No se pudo cargar el contenido.
      </p>
    )
  }
  return null
}
