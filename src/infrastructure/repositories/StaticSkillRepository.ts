import type { Skill } from '../../domain/entities/Skill'
import type { SkillRepository } from '../../domain/repositories/SkillRepository'

export class StaticSkillRepository implements SkillRepository {
  private readonly skills: readonly Skill[]

  constructor(skills: readonly Skill[]) {
    this.skills = skills
  }

  async getAll(): Promise<readonly Skill[]> {
    return this.skills
  }
}
