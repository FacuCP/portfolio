import { useEffect, useRef, useState } from 'react'
import type { Media } from '../../domain/entities/Media'
import { useLanguage } from '../i18n/LanguageContext'

/** Tiempo que se muestra cada imagen al recorrer los medios. */
const IMAGE_DURATION_MS = 5000

interface CardMediaProps {
  readonly media: readonly Media[]
  /**
   * false: muestra solo el primer medio, quieto (si es un video, su primer cuadro).
   * true: recorre todos; cada imagen IMAGE_DURATION_MS y cada video completo.
   * Conviene montarlo con un `key` distinto para cada valor, así al volver a
   * reproducir empieza desde el primero.
   */
  readonly playing: boolean
}

/** Imágenes y videos de una tarjeta del carrusel, con fundido entre uno y otro. */
export function CardMedia({ media, playing }: CardMediaProps) {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const count = media.length
  const current = playing ? index : 0
  const currentMedia = media[current]
  // Sin reproducir, solo se carga el primero.
  const shown = playing ? media : media.slice(0, 1)

  const goToNext = () => {
    setVideoProgress(0)
    setIndex((value) => (value + 1) % count)
  }

  // Imagen: pasa a la siguiente después de unos segundos. Video: se reproduce desde el principio.
  useEffect(() => {
    if (!playing || !currentMedia) return

    if (currentMedia.type === 'image') {
      if (count < 2) return
      const timer = window.setTimeout(() => setIndex((value) => (value + 1) % count), IMAGE_DURATION_MS)
      return () => window.clearTimeout(timer)
    }

    const video = videoRefs.current[current]
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => {
      // El navegador puede bloquear la reproducción automática: el video queda en pausa.
    })
    return () => video.pause()
  }, [playing, current, currentMedia, count])

  if (count === 0) return null

  return (
    <div className="card-media">
      {shown.map((item, i) => {
        const className = `card-media__item${i === current ? ' card-media__item--visible' : ''}`
        return item.type === 'image' ? (
          <img key={i} className={className} src={item.src} alt="" draggable={false} />
        ) : (
          <video
            key={i}
            ref={(element) => {
              videoRefs.current[i] = element
            }}
            className={className}
            // Sin reproducir, #t=0.1 hace que se vea el primer cuadro en lugar de un fondo negro.
            src={playing ? item.src : `${item.src}#t=0.1`}
            muted={muted}
            playsInline
            preload={playing ? 'auto' : 'metadata'}
            loop={count === 1}
            onTimeUpdate={(event) => {
              if (i !== current) return
              const video = event.currentTarget
              setVideoProgress(video.duration ? video.currentTime / video.duration : 0)
            }}
            onEnded={() => {
              if (count > 1) goToNext()
            }}
          />
        )
      })}

      {playing && count > 1 && (
        <div className="card-media__progress" aria-hidden="true">
          {media.map((item, i) => {
            const timed = i === current && item.type === 'image'
            const width =
              i < current ? '100%' : i === current && item.type === 'video' ? `${videoProgress * 100}%` : undefined
            return (
              <span key={i} className="card-media__segment">
                <span
                  className={`card-media__fill${timed ? ' card-media__fill--timed' : ''}`}
                  style={{ width, animationDuration: `${IMAGE_DURATION_MS}ms` }}
                />
              </span>
            )
          })}
        </div>
      )}

      {playing && currentMedia?.type === 'video' && (
        <button
          type="button"
          className="card-media__sound"
          aria-label={muted ? t.unmute : t.mute}
          aria-pressed={!muted}
          onClick={(event) => {
            event.stopPropagation() // tocar la foto agrandada la achica; este botón no
            setMuted((value) => !value)
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
          </svg>
        </button>
      )}
    </div>
  )
}
