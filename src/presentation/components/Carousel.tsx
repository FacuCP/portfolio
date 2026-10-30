import { useId, useRef, useState, type KeyboardEvent, type PointerEvent, type TransitionEvent } from 'react'
import type { PortfolioEntry } from '../../domain/entities/PortfolioEntry'
import { useLanguage } from '../i18n/LanguageContext'

export type CarouselItem = PortfolioEntry

interface CarouselProps {
  readonly label: string
  readonly items: readonly CarouselItem[]
}

/* Apariencia según la distancia al centro (0 = tarjeta principal). */
const SHIFT = [0, 0.5, 0.82, 1.05] // desplazamiento horizontal, en anchos de tarjeta
const SCALE = [1, 0.8, 0.64, 0.52]
const BRIGHTNESS = [1, 0.8, 0.65, 0.65] // las de atrás se ven más apagadas
const SWIPE_THRESHOLD = 40 // px

const mod = (value: number, size: number) => ((value % size) + size) % size

/**
 * Carrusel circular: la tarjeta activa queda al frente y las vecinas detrás.
 * `position` crece o decrece sin límite; cada "slot" visible se identifica
 * por su posición absoluta, así React conserva el elemento y anima el
 * movimiento, y el contenido se toma de `items` con módulo (vuelta infinita).
 *
 * "Ver más" abre un panel con el detalle de la tarjeta activa: al costado
 * (el carrusel se corre a la izquierda) o, en pantallas angostas, debajo.
 */
export function Carousel({ label, items }: CarouselProps) {
  const [position, setPosition] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const pointerStartX = useRef<number | null>(null)
  const swiped = useRef(false)
  const stageRef = useRef<HTMLUListElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const detailId = useId()
  const { t } = useLanguage()

  const count = items.length
  if (count === 0) return null

  const active = mod(position, count)
  const activeItem = items[active]
  const visibleSide = count === 1 ? 0 : count < 5 ? 1 : 2
  const renderedSide = count === 1 ? 0 : visibleSide + 1 // +1 oculto a cada lado para animar la entrada

  const move = (delta: number) => setPosition((current) => current + delta)

  const goTo = (index: number) => {
    let delta = mod(index - active, count)
    if (delta > count / 2) delta -= count
    move(delta)
  }

  const close = () => {
    setExpanded(false)
    stageRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && expanded) close()
  }

  const handleStageKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
  }

  const handlePointerDown = (event: PointerEvent) => {
    pointerStartX.current = event.clientX
    swiped.current = false
  }

  const handlePointerUp = (event: PointerEvent) => {
    if (pointerStartX.current === null) return
    const dx = event.clientX - pointerStartX.current
    pointerStartX.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      swiped.current = true
      move(dx < 0 ? 1 : -1)
    }
  }

  // En pantallas angostas el panel se abre debajo: al terminar de abrirse, se lo trae a la vista.
  const handleTransitionEnd = (event: TransitionEvent) => {
    if (expanded && event.target === event.currentTarget && event.propertyName === 'grid-template-rows') {
      detailRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  const slots = []
  for (let offset = -renderedSide; offset <= renderedSide; offset++) {
    const distance = Math.abs(offset)
    const item = items[mod(position + offset, count)]
    const isActive = offset === 0
    const hidden = distance > visibleSide

    slots.push(
      <li
        key={position + offset}
        className="carousel__item"
        aria-hidden={!isActive}
        data-side={!isActive || undefined}
        style={{
          transform: `translate(-50%, -50%) translateX(calc(var(--card-width) * ${Math.sign(offset) * SHIFT[distance]})) scale(${SCALE[distance]})`,
          zIndex: 10 - distance,
          filter: `brightness(${BRIGHTNESS[distance]})`,
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? 'none' : undefined,
        }}
        onClick={() => {
          if (swiped.current) return
          if (!isActive) move(offset)
          else if (expanded) close() // tocar la foto agrandada la achica
        }}
      >
        {item.image && <img className="carousel__image" src={item.image} alt="" draggable={false} />}
        <div className="carousel__content">
          <h3 className="carousel__title">{item.title}</h3>
          <p className="carousel__summary">{item.summary}</p>
          <button
            type="button"
            className="carousel__more"
            tabIndex={isActive && !expanded ? undefined : -1}
            aria-expanded={isActive ? expanded : undefined}
            aria-controls={isActive ? detailId : undefined}
            onClick={(event) => {
              if (!isActive || swiped.current) return // en una tarjeta lateral, el clic la trae al frente
              event.stopPropagation()
              setExpanded(true)
            }}
          >
            {t.seeMore}
          </button>
        </div>
      </li>,
    )
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription={t.carousel}
      aria-label={label}
      data-expanded={expanded || undefined}
      onKeyDown={handleKeyDown}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="carousel__viewport">
        <ul
          ref={stageRef}
          className="carousel__stage"
          tabIndex={0}
          onKeyDown={handleStageKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (pointerStartX.current = null)}
        >
          {slots}
        </ul>
        {count > 1 && (
          <div className="carousel__controls">
            <button type="button" className="carousel__button" aria-label={t.previous} onClick={() => move(-1)}>
              &#8249;
            </button>
            <div className="carousel__dots">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="carousel__dot"
                  aria-label={item.title}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button type="button" className="carousel__button" aria-label={t.next} onClick={() => move(1)}>
              &#8250;
            </button>
          </div>
        )}
      </div>
      {/* Muestra siempre la tarjeta activa: si el carrusel se mueve con el panel abierto, el detalle la sigue. */}
      <div ref={detailRef} id={detailId} className="carousel__detail" aria-hidden={!expanded} inert={!expanded}>
        <div className="carousel__detail-inner" aria-live="polite">
          <h3 className="carousel__detail-title">{activeItem.title}</h3>
          <p className="carousel__detail-summary">{activeItem.summary}</p>
          {activeItem.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <button type="button" className="carousel__close" aria-label={t.closeDetail} onClick={close}>
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}
