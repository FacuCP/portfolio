import type { ReactNode } from 'react'

interface SectionProps {
  readonly id: string
  readonly title: string
  readonly children: ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="section container" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  )
}
