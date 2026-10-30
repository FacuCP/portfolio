import type { Language } from '../entities/Language'

/** Puerto genérico para colecciones de solo lectura, con los textos en el idioma pedido. */
export interface ListRepository<T> {
  getAll(language: Language): Promise<readonly T[]>
}
