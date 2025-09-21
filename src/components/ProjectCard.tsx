import { motion } from 'framer-motion'
import ProjectCarousel from './ProjectCarousel'
import TechPills from './TechPills'
import type { Project } from '../data/projectsData'

function stop(e: React.MouseEvent) {
  e.stopPropagation()
}

export default function ProjectCard({ p, onMore }: { p: Project; onMore: (p: Project) => void }) {
  const imgs = p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : []
  const open = () => onMore(p)
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-[#0a1313] cursor-pointer border border-[#16b88522] rounded-lg overflow-hidden shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') open()
      }}
    >
      <div className="w-full bg-gradient-to-br from-gray-800/60 to-gray-700/40 text-gray-400 text-xs border-b border-[#16b88522]">
        {imgs.length ? (
          <ProjectCarousel images={imgs} heightClass="h-40" onClick={open} />
        ) : (
          <div className="h-40 flex items-center justify-center">Project preview coming soon</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#b7f5d9]">{p.title}</h3>
        <p className="text-xs text-gray-300 mt-1">{p.tagline}</p>
        <p className="text-sm text-gray-400 mt-2">{p.description}</p>

        <TechPills tech={p.tech} />

        <div className="mt-4 flex gap-2 items-center flex-wrap" onClick={stop}>
          {p.links?.demo && (
            <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-[#0b6b4a] text-white hover:bg-[#0e7f5f] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h6v2H7v10h10v-4h2v6H5z"></path></svg>
              {p.links.demo.includes('http') ? 'Live' : 'View Demo'}
            </a>
          )}
          {p.links?.video && (
            <a href={p.links.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M8 5v14l11-7z"></path><path d="M3 19V5h2v14H3z"></path></svg>
              Video
            </a>
          )}
          {p.links?.github && (
            <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
              <img src="/icons/GitHub.svg" alt="GitHub" className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          {p.links?.post && (
            <a href={p.links.post} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3 4h18v2H3z"></path><path d="M3 9h18v2H3z"></path><path d="M3 14h12v2H3z"></path></svg>
              {p.links.postLabel ? `Post (${p.links.postLabel})` : 'Post'}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
