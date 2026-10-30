import { useLanguage } from '../i18n/LanguageContext'
import { SECTION_IDS, SITE_NAME } from '../siteConfig'
import { LanguageSwitch } from './LanguageSwitch'

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#inicio">
          {SITE_NAME}
        </a>
        <nav className="header__navigation" aria-label={t.sectionsNav}>
          <ul className="header__nav">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.sections[id]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitch />
      </div>
    </header>
  )
}
