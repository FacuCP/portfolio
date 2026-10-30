import type { Project } from '../../domain/entities/Project'

interface ProjectCardProps {
  readonly project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card project">
      <header className="project__header">
        <h3 className="card__title">{project.title}</h3>
        <span className="project__year">{project.year}</span>
      </header>
      {project.featured && <span className="project__badge">Destacado</span>}
      <p>{project.summary}</p>
      <ul className="tags" aria-label="Tecnologías">
        {project.technologies.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>
      {(project.repositoryUrl || project.demoUrl) && (
        <div className="project__links">
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              Código
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
        </div>
      )}
    </article>
  )
}
