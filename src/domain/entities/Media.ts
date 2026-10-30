/** Imagen o video que se muestra en una tarjeta del carrusel. */
export interface Media {
  readonly type: 'image' | 'video'
  readonly src: string
}
