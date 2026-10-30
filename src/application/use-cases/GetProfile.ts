import type { Profile } from '../../domain/entities/Profile'
import type { ProfileRepository } from '../../domain/repositories/ProfileRepository'

export class GetProfile {
  private readonly repository: ProfileRepository

  constructor(repository: ProfileRepository) {
    this.repository = repository
  }

  execute(): Promise<Profile> {
    return this.repository.getProfile()
  }
}
