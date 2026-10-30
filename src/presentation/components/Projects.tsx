import { useCallback, useState } from 'react'
import { useUseCases } from '../context/UseCasesContext'
import { useAsync } from '../hooks/useAsync'
import { ProjectCard } from './ProjectCard'
import { Section } from './Section'
import { StatusMessage } from './StatusMessage'

export function Projects() {
  const { listProjects, listProjectTechnologies } = useUseCases()
  const [technology, setTechnology] = useState<string | null>(null)

  const loadTechnologies = useCallback(() => listProjectTechnologies.execute(), [listProjectTechnologies])
  const loadProjects = useCallback(
    () => listProjects.execute({ technology: technology ?? undefined }),
    [listProjects, technology],
  )
  const technologies = useAsync(loadTechnologies)
  const projects = useAsync(loadProjects)

  return (
    <Section id="proyectos" title="Proyectos">
      {technologies.status === 'success' && (
        <div className="filters" role="group" aria-label="Filtrar por tecnología">
          {[null, ...technologies.data].map((tech) => (
            <button
              key={tech ?? 'todos'}
              type="button"
              className="filter"
              aria-pressed={technology === tech}
              onClick={() => setTechnology(tech)}
            >
              {tech ?? 'Todos'}
            </button>
          ))}
        </div>
      )}
      <StatusMessage state={projects} />
      {projects.status === 'success' &&
        (projects.data.length === 0 ? (
          <p className="status">No hay proyectos con esa tecnología.</p>
        ) : (
          <div className="projects">
            {projects.data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ))}
    </Section>
  )
}
