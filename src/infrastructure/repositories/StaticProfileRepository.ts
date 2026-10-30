import type { Language } from '../../domain/entities/Language'
import type { Profile } from '../../domain/entities/Profile'
import type { ProfileRepository } from '../../domain/repositories/ProfileRepository'

/** Repositorio en memoria: `load` arma el perfil con los textos del idioma pedido. */
export class StaticProfileRepository implements ProfileRepository {
  private readonly load: (language: Language) => Profile

  constructor(load: (language: Language) => Profile) {
    this.load = load
  }

  async getProfile(language: Language): Promise<Profile> {
    return this.load(language)
  }
}
