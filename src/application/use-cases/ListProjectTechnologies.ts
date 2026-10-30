import type { ProjectRepository } from '../../domain/repositories/ProjectRepository'

/** Tecnologías únicas usadas en los proyectos, para construir los filtros. */
export class ListProjectTechnologies {
  private readonly repository: ProjectRepository

  constructor(repository: ProjectRepository) {
    this.repository = repository
  }

  async execute(): Promise<string[]> {
    const projects = await this.repository.getAll()
    const technologies = new Set(projects.flatMap((project) => project.technologies))
    return [...technologies].sort((a, b) => a.localeCompare(b))
  }
}
