import type { Profile } from '../../domain/entities/Profile'
import type { Project } from '../../domain/entities/Project'
import type { Skill } from '../../domain/entities/Skill'

/*
 * Único lugar donde vive el contenido del portfolio.
 * Para agregar un proyecto o cambiar un texto se edita solo este archivo.
 * Los valores marcados con TODO son de ejemplo y hay que reemplazarlos.
 */

export const profile: Profile = {
  fullName: 'Facundo Caceres',
  role: 'Desarrollador de Software', // TODO: ajustar el rol
  headline: 'Construyo aplicaciones web claras, mantenibles y pensadas para las personas que las usan.',
  about: [
    // TODO: reemplazar por tu presentación
    'Soy desarrollador de software y me interesa escribir código fácil de entender, probar y cambiar.',
    'En este portfolio reúno proyectos en los que trabajé, las tecnologías que uso y cómo contactarme.',
  ],
  location: 'Argentina', // TODO: ajustar ubicación
  email: 'tu-email@ejemplo.com', // TODO: email de contacto público
  socialLinks: [
    { label: 'GitHub', url: 'https://github.com/' }, // TODO: tu usuario
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' }, // TODO: tu perfil
  ],
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Facundo Caceres',
    summary:
      'Este mismo sitio: una SPA en React y TypeScript organizada con Clean Architecture, con el contenido separado de la interfaz.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    year: 2026,
    featured: true,
    repositoryUrl: undefined, // TODO: URL del repositorio
  },
  {
    id: 'proyecto-ejemplo-api',
    title: 'Proyecto de ejemplo: API REST', // TODO: reemplazar por un proyecto real
    summary: 'Descripción breve del problema que resolvía, tu rol y el resultado.',
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL'],
    year: 2025,
    featured: false,
  },
  {
    id: 'proyecto-ejemplo-web',
    title: 'Proyecto de ejemplo: aplicación web', // TODO: reemplazar por un proyecto real
    summary: 'Descripción breve del problema que resolvía, tu rol y el resultado.',
    technologies: ['React', 'CSS'],
    year: 2024,
    featured: false,
  },
]

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Git', category: 'Herramientas' },
  { name: 'Vite', category: 'Herramientas' },
]
