import type { AsyncState } from '../hooks/useAsync'
import { useLanguage } from '../i18n/LanguageContext'

interface StatusMessageProps {
  readonly state: AsyncState<unknown>
}

/** Muestra carga o error; no renderiza nada cuando la carga fue exitosa. */
export function StatusMessage({ state }: StatusMessageProps) {
  const { t } = useLanguage()

  if (state.status === 'loading') return <p className="status">{t.loading}</p>
  if (state.status === 'error') {
    return (
      <p className="status status--error" role="alert">
        {t.loadError}
      </p>
    )
  }
  return null
}
