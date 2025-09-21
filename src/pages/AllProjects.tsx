import { useMemo, useState } from 'react'
import { PROJECTS, ProjectCard, Carousel } from '../components/Projects'
import type { Project } from '../components/Projects'
import { AnimatePresence, motion } from 'framer-motion'

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

        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/70" onClick={() => setActive(null)} />
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="relative z-10 w-[min(96vw,1040px)] bg-[#0a1313] border border-[#16b88555] rounded-xl shadow-2xl text-[#b7f5d9]"
              >
                <div className="px-4 pt-3 pb-2 border-b border-[#16b88533] rounded-t-xl bg-[linear-gradient(180deg,rgba(20,26,26,0.8),rgba(10,19,19,0.8))]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActive(null)}
                      aria-label="Close"
                      className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#00000033] shadow-inner"
                      title="Close"
                    />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#00000033]" title="Minimize" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#00000033]" title="Maximize" />
                    <div className="ml-3 flex-1 text-center text-sm text-[#9ddfbe] truncate font-mono">
                      mus — zsh — ~/projects/{active?.id}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                    <div>
                      <div className="text-base md:text-lg font-semibold">{active?.title}</div>
                      <div className="text-xs md:text-sm text-gray-300">{active?.tagline}</div>

                      <div className="mt-2 text-[13px] md:text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                        {active?.long}
                      </div>

                      <div className="mt-3">
                        <div className="text-[10px] uppercase text-gray-400">Key Tech</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {active?.tech.map((t) => (
                            <span key={t} className="text-[10px] uppercase tracking-wide bg-black/30 border border-[#2fd89a22] text-[#b7f5d9] px-2 py-1 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2 items-center flex-wrap">
                        {active?.links?.demo && (
                          <a href={active.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-[#0b6b4a] text-white hover:bg-[#0e7f5f] transition-colors">
                            Live
                          </a>
                        )}
                        {active?.links?.video && (
                          <a href={active.links.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            Video
                          </a>
                        )}
                        {active?.links?.github && (
                          <a href={active.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            GitHub
                          </a>
                        )}
                        {active?.links?.post && (
                          <a href={active.links.post} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            {active.links.postLabel ? `Post (${active.links.postLabel})` : 'Post'}
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      {(() => {
                        const imgs = active?.images && active.images.length > 0 ? active.images : active?.image ? [active.image] : []
                        return imgs.length ? (
                          <Carousel images={imgs} heightClass="h-48 md:h-64" rounded auto={false} />
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
      </div>
    </main>
  )
}
