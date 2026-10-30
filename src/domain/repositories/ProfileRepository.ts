import type { Profile } from '../entities/Profile'

export interface ProfileRepository {
  getProfile(): Promise<Profile>
}
