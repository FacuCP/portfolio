export interface SocialLink {
  readonly label: string
  readonly url: string
}

export interface Profile {
  readonly fullName: string
  readonly role: string
  readonly headline: string
  readonly about: readonly string[]
  readonly location: string
  readonly email: string
  readonly socialLinks: readonly SocialLink[]
}
