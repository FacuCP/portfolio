import type { Project } from '../../domain/entities/Project'
import type { ProjectRepository } from '../../domain/repositories/ProjectRepository'

export class StaticProjectRepository implements ProjectRepository {
  private readonly projects: readonly Project[]

  constructor(projects: readonly Project[]) {
    this.projects = projects
  }

  async getAll(): Promise<readonly Project[]> {
    return this.projects
  }
}
