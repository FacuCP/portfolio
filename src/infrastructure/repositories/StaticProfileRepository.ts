import type { Profile } from '../../domain/entities/Profile'
import type { ProfileRepository } from '../../domain/repositories/ProfileRepository'

export class StaticProfileRepository implements ProfileRepository {
  private readonly profile: Profile

  constructor(profile: Profile) {
    this.profile = profile
  }

  async getProfile(): Promise<Profile> {
    return this.profile
  }
}
