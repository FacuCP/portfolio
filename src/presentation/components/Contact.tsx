import type { Profile } from '../../domain/entities/Profile'
import { useLanguage } from '../i18n/LanguageContext'
import { Section } from './Section'

interface ContactProps {
  readonly profile: Profile
}

export function Contact({ profile }: ContactProps) {
  const { t } = useLanguage()

  return (
    <Section id="contacto" title={t.sections.contacto}>
      <p>{profile.contactText}</p>
      <div className="contact">
        <a className="button button--primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        {profile.socialLinks.map((link) => (
          <a key={link.url + link.label} className="button" href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  )
}
