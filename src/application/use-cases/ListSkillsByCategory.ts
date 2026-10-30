import { groupSkillsByCategory, type SkillGroup } from '../../domain/entities/Skill'
import type { SkillRepository } from '../../domain/repositories/SkillRepository'

export class ListSkillsByCategory {
  private readonly repository: SkillRepository

  constructor(repository: SkillRepository) {
    this.repository = repository
  }

  async execute(): Promise<SkillGroup[]> {
    return groupSkillsByCategory(await this.repository.getAll())
  }
}
