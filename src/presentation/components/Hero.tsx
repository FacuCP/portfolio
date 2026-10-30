import type { Profile } from '../../domain/entities/Profile'
import { useLanguage } from '../i18n/LanguageContext'

interface HeroProps {
  readonly profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="hero container">
      <h1 className="hero__title">{profile.fullName}</h1>
      <p className="hero__subtitle">{profile.role}</p>
      <div className="hero__about">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {/* Flecha al pie de la pantalla: indica que hay más contenido abajo. */}
      <a className="hero__scroll" href="#proyectos" aria-label={t.scrollDown}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
