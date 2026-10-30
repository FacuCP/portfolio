import { createContext, useContext } from 'react'
import type { Language } from '../../domain/entities/Language'
import type { Translations } from './translations'

export interface LanguageContextValue {
  readonly language: Language
  readonly setLanguage: (language: Language) => void
  /** Textos fijos de la interfaz en el idioma actual. */
  readonly t: Translations
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return value
}
