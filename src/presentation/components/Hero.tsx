import type { Profile } from '../../domain/entities/Profile'

interface HeroProps {
  readonly profile: Profile
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="inicio" className="hero container">
      <p className="hero__eyebrow">{profile.role}</p>
      <h1 className="hero__title">{profile.fullName}</h1>
      <p className="hero__headline">{profile.headline}</p>
      <div className="hero__actions">
        <a className="button button--primary" href="#proyectos">
          Ver proyectos
        </a>
        <a className="button" href="#contacto">
          Contacto
        </a>
      </div>
    </section>
  )
}
