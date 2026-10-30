import { useAsync } from '../hooks/useAsync'
import { Carousel, type CarouselItem } from './Carousel'
import { Section } from './Section'
import { StatusMessage } from './StatusMessage'

interface CarouselSectionProps {
  readonly id: string
  readonly title: string
  /** Debe estar memoizada (ver useAsync). */
  readonly load: () => Promise<readonly CarouselItem[]>
}

export function CarouselSection({ id, title, load }: CarouselSectionProps) {
  const state = useAsync(load)

  return (
    <Section id={id} title={title}>
      <StatusMessage state={state} />
      {state.status === 'success' && <Carousel label={title} items={state.data} />}
    </Section>
  )
}
