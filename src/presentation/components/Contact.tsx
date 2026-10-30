import type { Profile } from '../../domain/entities/Profile'
import { Section } from './Section'

interface ContactProps {
  readonly profile: Profile
}

export function Contact({ profile }: ContactProps) {
  return (
    <Section id="contacto" title="Contacto">
      <p>¿Tenés una propuesta o una pregunta? Escribime.</p>
      <div className="contact">
        <a className="button button--primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        {profile.socialLinks.map((link) => (
          <a key={link.url} className="button" href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  )
}
