/** Botón del detalle de un item: abre un enlace o descarga un archivo. */
export interface EntryAction {
  readonly kind: 'link' | 'download'
  readonly url: string
  /** Texto del botón; si falta, la interfaz usa uno genérico ("Abrir enlace", "Descargar"). */
  readonly label?: string
}
