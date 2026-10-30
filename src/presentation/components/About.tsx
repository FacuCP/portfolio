import type { Profile } from '../../domain/entities/Profile'
import { Section } from './Section'

interface AboutProps {
  readonly profile: Profile
}

export function About({ profile }: AboutProps) {
  return (
    <Section id="sobre-mi" title="Sobre mí">
      <div className="about">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="about__location">📍 {profile.location}</p>
      </div>
    </Section>
  )
}
