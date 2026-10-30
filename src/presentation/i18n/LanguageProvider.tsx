import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Language } from '../../domain/entities/Language'
import { detectLanguage, saveLanguage } from './detectLanguage'
import { LanguageContext } from './LanguageContext'
import { translations } from './translations'

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage)

  // El atributo lang del documento sigue al idioma (lectores de pantalla, traductores, guiones).
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      t: translations[language],
      setLanguage: (next: Language) => {
        saveLanguage(next)
        setLanguageState(next)
      },
    }),
    [language],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
