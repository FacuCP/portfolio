import { useEffect, useRef } from 'react'

/* Ajustes del cielo. */
const STAR_DENSITY = 1 / 3000 // estrellas por px² de pantalla
const STAR_COLORS = ['255, 255, 255', '150, 240, 255', '255, 160, 230'] // blanco, celeste, rosa
const COLOR_WEIGHTS = [0.25, 0.375, 0.375]
const PARALLAX = 0.06 // cuánto se desplazan las estrellas más cercanas al hacer scroll
const SHOOTING_STAR_DELAY = [1000, 4000] // ms entre estrellas fugaces
const SHOOTING_STAR_LIFE = 1100 // ms
const SHOOTING_STAR_SPEED = 0.9 // px/ms
const SHOOTING_STAR_LENGTH = 140 // px

interface Star {
  /** Posición normalizada (0..1), así un cambio de alto de la ventana no las reubica. */
  readonly x: number
  readonly y: number
  readonly radius: number
  readonly color: string
  readonly baseAlpha: number
  readonly twinkleAmount: number
  readonly twinkleSpeed: number
  readonly phase: number
  /** 0 = lejana (no se mueve con el scroll), 1 = cercana. */
  readonly depth: number
}

interface ShootingStar {
  readonly x: number
  readonly y: number
  readonly dx: number
  readonly dy: number
  readonly start: number
}

const random = (min: number, max: number) => min + Math.random() * (max - min)

function pickColor(): string {
  let roll = Math.random()
  for (let i = 0; i < STAR_COLORS.length; i++) {
    roll -= COLOR_WEIGHTS[i]
    if (roll <= 0) return STAR_COLORS[i]
  }
  return STAR_COLORS[0]
}

function createStars(width: number, height: number): Star[] {
  const count = Math.round(width * height * STAR_DENSITY)
  return Array.from({ length: count }, () => {
    const depth = Math.random() ** 2 // la mayoría lejanas y chicas
    return {
      x: Math.random(),
      y: Math.random(),
      radius: 0.4 + depth * 1.4,
      color: pickColor(),
      baseAlpha: random(0.4, 0.85),
      twinkleAmount: random(0.2, 0.5),
      twinkleSpeed: random(0.001, 0.004),
      phase: random(0, Math.PI * 2),
      depth,
    }
  })
}

/** Cielo estrellado animado, fijo detrás de todo el contenido. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    let frame = 0
    let shooting: ShootingStar | null = null
    let nextShooting = performance.now() + random(SHOOTING_STAR_DELAY[0], SHOOTING_STAR_DELAY[1])

    const drawStars = (time: number) => {
      const scroll = reducedMotion ? 0 : window.scrollY
      for (const star of stars) {
        const twinkle = reducedMotion ? 0 : star.twinkleAmount * Math.sin(time * star.twinkleSpeed + star.phase)
        const alpha = Math.min(1, Math.max(0, star.baseAlpha + twinkle))
        const x = star.x * width
        // Parallax: las estrellas cercanas suben un poco al bajar; al salir por arriba vuelven por abajo.
        const y = (((star.y * height - scroll * PARALLAX * star.depth) % height) + height) % height

        context.fillStyle = `rgba(${star.color}, ${alpha})`
        context.beginPath()
        context.arc(x, y, star.radius, 0, Math.PI * 2)
        context.fill()

        // Halo suave en las estrellas más grandes.
        if (star.radius > 1.2) {
          context.fillStyle = `rgba(${star.color}, ${alpha * 0.12})`
          context.beginPath()
          context.arc(x, y, star.radius * 3.5, 0, Math.PI * 2)
          context.fill()
        }
      }
    }

    const drawShootingStar = (time: number) => {
      if (!shooting && time >= nextShooting) {
        const angle = random(0.25, 0.55) // hacia abajo, en diagonal
        const direction = Math.random() < 0.5 ? 1 : -1
        shooting = {
          x: random(width * 0.15, width * 0.85),
          y: random(0, height * 0.4),
          dx: Math.cos(angle) * direction,
          dy: Math.sin(angle),
          start: time,
        }
      }
      if (!shooting) return

      const elapsed = time - shooting.start
      if (elapsed > SHOOTING_STAR_LIFE) {
        shooting = null
        nextShooting = time + random(SHOOTING_STAR_DELAY[0], SHOOTING_STAR_DELAY[1])
        return
      }

      const progress = elapsed / SHOOTING_STAR_LIFE
      const fade = Math.sin(progress * Math.PI) // aparece y se apaga
      const headX = shooting.x + shooting.dx * elapsed * SHOOTING_STAR_SPEED
      const headY = shooting.y + shooting.dy * elapsed * SHOOTING_STAR_SPEED
      const tailX = headX - shooting.dx * SHOOTING_STAR_LENGTH
      const tailY = headY - shooting.dy * SHOOTING_STAR_LENGTH

      const trail = context.createLinearGradient(headX, headY, tailX, tailY)
      trail.addColorStop(0, `rgba(255, 255, 255, ${fade})`)
      trail.addColorStop(0.3, `rgba(150, 240, 255, ${fade * 0.6})`)
      trail.addColorStop(1, 'rgba(255, 62, 201, 0)')
      context.strokeStyle = trail
      context.lineWidth = 1.6
      context.lineCap = 'round'
      context.beginPath()
      context.moveTo(headX, headY)
      context.lineTo(tailX, tailY)
      context.stroke()
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      drawStars(time)
      if (!reducedMotion) drawShootingStar(time)
    }

    const resize = () => {
      const widthChanged = window.innerWidth !== width
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      // En el teléfono el alto cambia al ocultarse la barra del navegador: solo se regeneran si cambia el ancho.
      if (widthChanged || stars.length === 0) stars = createStars(width, height)
      if (reducedMotion) draw(0)
    }

    const loop = (time: number) => {
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reducedMotion) frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
