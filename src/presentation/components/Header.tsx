import { SECTIONS, SITE_NAME } from '../siteConfig'

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#inicio">
          {SITE_NAME}
        </a>
        <nav aria-label="Secciones">
          <ul className="header__nav">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
