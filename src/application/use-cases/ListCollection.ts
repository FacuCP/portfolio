import type { Language } from '../../domain/entities/Language'
import type { ListRepository } from '../../domain/repositories/ListRepository'

/** Devuelve los elementos de una colección en el orden en que están cargados. */
export class ListCollection<T> {
  private readonly repository: ListRepository<T>

  constructor(repository: ListRepository<T>) {
    this.repository = repository
  }

  execute(language: Language): Promise<readonly T[]> {
    return this.repository.getAll(language)
  }
}
