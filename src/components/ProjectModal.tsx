import { AnimatePresence, motion } from 'framer-motion'
import ProjectCarousel from './ProjectCarousel'
import TechPills from './TechPills'
import type { Project } from '../data/projectsData'

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative z-10 w-[min(96vw,1040px)] bg-[#0a1313] border border-[#16b88555] rounded-xl shadow-2xl text-[#b7f5d9]"
          >
            {/* Terminal-style header */}
            <div className="px-4 pt-3 pb-2 border-b border-[#16b88533] rounded-t-xl bg-[linear-gradient(180deg,rgba(20,26,26,0.8),rgba(10,19,19,0.8))]">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#00000033] shadow-inner"
                  title="Close"
                />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#00000033]" title="Minimize" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#00000033]" title="Maximize" />
                <div className="ml-3 flex-1 text-center text-sm text-[#9ddfbe] truncate font-mono">
                  mus — zsh — ~/projects/{project.id}
                </div>
              </div>
            </div>

            {/* Content: compact, no-scroll layout */}
            <div className="p-4 md:p-5">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                <div>
                  <div className="text-base md:text-lg font-semibold">{project.title}</div>
                  <div className="text-xs md:text-sm text-gray-300">{project.tagline}</div>

                  <div className="mt-2 text-[13px] md:text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                    {project.long}
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] uppercase text-gray-400">Key Tech</div>
                    <TechPills tech={project.tech} />
                  </div>

                  <div className="mt-3 flex gap-2 items-center flex-wrap">
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-[#0b6b4a] text-white hover:bg-[#0e7f5f] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h6v2H7v10h10v-4h2v6H5z"></path></svg>
                        {project.links.demo.includes('http') ? 'Live' : 'View Demo'}
                      </a>
                    )}
                    {project.links?.video && (
                      <a href={project.links.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M8 5v14l11-7z"></path><path d="M3 19V5h2v14H3z"></path></svg>
                        Video
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors"
                      >
                        <img
                          src="/icons/GitHub.svg"
                          alt="GitHub"
                          className="w-4 h-4 invert drop-shadow-[0_0_6px_rgba(22,184,133,0.65)] group-hover:drop-shadow-[0_0_10px_rgba(22,184,133,0.95)] transition-[filter]"
                        />
                        GitHub
                      </a>
                    )}
                    {project.links?.post && (
                      <a href={project.links.post} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3 4h18v2H3z"></path><path d="M3 9h18v2H3z"></path><path d="M3 14h12v2H3z"></path></svg>
                        {project.links.postLabel ? `Post (${project.links.postLabel})` : 'Post'}
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  {(() => {
                    const imgs = project.images && project.images.length > 0 ? project.images : project.image ? [project.image] : []
                    return imgs.length ? (
                      <ProjectCarousel images={imgs} heightClass="h-48 md:h-64" rounded auto={false} />
                    ) : (
                      <div className="h-40 bg-gray-700/30 border border-gray-700/50 rounded flex items-center justify-center text-gray-400 text-sm">
                        No images available
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
