import type { Profile } from '../../domain/entities/Profile'

interface HeroProps {
  readonly profile: Profile
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="inicio" className="hero container">
      <h1 className="hero__title">{profile.fullName}</h1>
      <p className="hero__subtitle">{profile.role}</p>
      <div className="hero__about">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
