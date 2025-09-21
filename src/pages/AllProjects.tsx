import { useMemo, useState } from 'react'
import { PROJECTS } from '../components/Projects'
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../data/projectsData'
import ProjectModal from '../components/ProjectModal'

export default function AllProjectsPage() {
  const [active, setActive] = useState<Project | null>(null)
  const projects = useMemo(() => PROJECTS, [])

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(2,6,6,0.6),rgba(1,3,3,0.8))] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono mb-8">
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="text-sm text-gray-300 mt-2">Full list of experiments, side quests and products.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} onMore={setActive} />
          ))}
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </div>
    </main>
  )
}
