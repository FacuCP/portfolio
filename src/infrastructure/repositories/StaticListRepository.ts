import type { Language } from '../../domain/entities/Language'
import type { ListRepository } from '../../domain/repositories/ListRepository'

/** Repositorio en memoria: `load` arma la colección con los textos del idioma pedido. */
export class StaticListRepository<T> implements ListRepository<T> {
  private readonly load: (language: Language) => readonly T[]

  constructor(load: (language: Language) => readonly T[]) {
    this.load = load
  }

  async getAll(language: Language): Promise<readonly T[]> {
    return this.load(language)
  }
}
