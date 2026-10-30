export interface SocialLink {
  readonly label: string
  readonly url: string
}

export interface Profile {
  readonly fullName: string
  readonly role: string
  readonly about: readonly string[]
  readonly contactText: string
  readonly email: string
  readonly socialLinks: readonly SocialLink[]
}
