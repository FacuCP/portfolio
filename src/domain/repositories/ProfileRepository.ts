import type { Language } from '../entities/Language'
import type { Profile } from '../entities/Profile'

export interface ProfileRepository {
  getProfile(language: Language): Promise<Profile>
}
