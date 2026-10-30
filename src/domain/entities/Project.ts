export interface Project {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly technologies: readonly string[]
  readonly year: number
  readonly featured: boolean
  readonly repositoryUrl?: string
  readonly demoUrl?: string
}

export function usesTechnology(project: Project, technology: string): boolean {
  const wanted = technology.trim().toLowerCase()
  return project.technologies.some((tech) => tech.toLowerCase() === wanted)
}

/** Destacados primero, luego los más recientes, luego por título. */
export function compareProjects(a: Project, b: Project): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  if (a.year !== b.year) return b.year - a.year
  return a.title.localeCompare(b.title)
}
