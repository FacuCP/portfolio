import { LANGUAGES } from '../../domain/entities/Language'
import { useLanguage } from '../i18n/LanguageContext'

/** Selector ES | EN; el indicador se desliza hacia el idioma activo. */
export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="lang-switch" role="group" aria-label={t.languageSwitch} data-language={language}>
      {LANGUAGES.map((option) => (
        <button
          key={option}
          type="button"
          className="lang-switch__option"
          lang={option}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
