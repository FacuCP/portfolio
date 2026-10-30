import { compareProjects, usesTechnology, type Project } from '../../domain/entities/Project'
import type { ProjectRepository } from '../../domain/repositories/ProjectRepository'

export interface ProjectFilter {
  readonly technology?: string
}

export class ListProjects {
  private readonly repository: ProjectRepository

  constructor(repository: ProjectRepository) {
    this.repository = repository
  }

  async execute(filter: ProjectFilter = {}): Promise<Project[]> {
    const { technology } = filter
    const projects = await this.repository.getAll()
    return projects
      .filter((project) => !technology || usesTechnology(project, technology))
      .sort(compareProjects)
  }
}
