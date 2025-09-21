import { useMemo, useState } from 'react'
import ProjectModal from './ProjectModal'
import { PROJECTS } from '../data/projectsData'
import type { Project } from '../data/projectsData'
import ProjectCard from './ProjectCard'

// All projects are now in PROJECTS; removed separate Other Notables list.

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const projects = useMemo(() => PROJECTS, [])

  return (
    <section id="projects" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(3,6,6,0.6),rgba(2,4,4,0.8))]">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
          <h2 className="text-2xl font-bold mb-2">Projects / Things I've Built</h2>
          <p className="text-sm text-gray-300">Here are some of the experiments, products, and side quests I’ve shipped.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((p) => (
            <ProjectCard key={p.id} p={p} onMore={setActive} />
          ))}
        </div>

        {/* Only featured projects shown here (first 6). Remaining projects are on the All Projects page. */}

        {/* Modal (extracted) */}
        <ProjectModal project={active} onClose={() => setActive(null)} />

        <div className="mt-8 text-center">
          <a href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#16b885] text-black font-medium hover:brightness-95">View all projects</a>
        </div>
      </div>
    </section>
  )
}

export { PROJECTS }
export type { Project }
