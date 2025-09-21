import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Project = {
  id: string
  title: string
  tagline: string
  description: string
  long: string
  tech: string[]
  links?: { demo?: string; github?: string; video?: string; post?: string; postLabel?: string }
  image?: string
  images?: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'aalim-ai',
    title: 'Aalim AI',
    tagline: 'AI-powered assistant answering Islamic questions',
    description: 'Answers questions, references tafseer/hadith, and gives structured guidance.',
    long:
      "Aalim AI is my attempt at blending modern NLP with traditional knowledge. It answers Islamic queries, fetches tafseer/hadith references, and delivers structured responses — like a digital scholar’s assistant. I built it to explore how AI can help Muslims navigate authentic resources without noise.",
    tech: ['React', 'Python', 'FastAPI','LangChain','ChromaDB', 'Tailwind', 'MongoDB'],
    links: { github: 'https://github.com/Musxeto/aalim-ai', video: 'https://lnkd.in/p/djRJyQET' },
    image: '/projects/aalim-ai/aalim-ai-home.png',
    images: [
      '/projects/aalim-ai/aalim-ai-home.png',
      '/projects/aalim-ai/aalim-ai-light.png',
      '/projects/aalim-ai/aalim-ai-signup.png',
    ],
  },
  {
    id: 'facial-attendance',
    title: 'Facial Attendance System',
    tagline: 'AI-driven attendance tracker using facial recognition',
    description: 'Recognizes faces in real-time and logs attendance with clean exports.',
    long:
      'This project replaces boring manual attendance with computer vision. Built with OpenCV and deep learning models, it recognizes students/employees in real-time, logs their presence, and exports clean attendance sheets. It was a mix of ML and practical software engineering — a step toward smarter classrooms/offices.',
    tech: ['Python', 'OpenCV', 'FastApi'],
    links: { github: 'https://github.com/Musxeto/salvo-facial-attendance', post: 'https://lnkd.in/p/dYprkvni', postLabel: '500+ likes' },
    image: '/projects/fras/me-side.jpeg',
    images: [
      '/projects/fras/me-side.jpeg',
      '/projects/fras/me-behind.jpeg',
      '/projects/fras/hassan-side.jpeg',
    ],
  },
  {
    id: 'arcadeos',
    title: 'ArcadeOS',
    tagline: 'A custom lightweight OS for retro gaming and fun CLI tools',
    description: 'Bootable OS environment for retro-style games and utilities.',
    long:
      'ArcadeOS started as a fun side quest: a custom os environment for retro-style games and utilities. Think of it as a nerdy playground — a mini OS where you can run games, play around with commands, and experience old-school computing vibes. It taught me a lot about system-level coding and custom builds.',
    tech: ['Assembly', 'Bash', 'Linux'],
    links: { github: 'https://github.com/Musxeto/ArcadeOS' },
    image: '/projects/arcadeos/arcadeos-home.png',
    images: [
      '/projects/arcadeos/arcadeos-logo.jpg',
    ],
  },
  {
    id: 'gym-store',
    title: 'Berserk Gym Store',
    tagline: 'E-commerce app with cart and checkout',
    description: 'A sleek store for gym equipment with real-world UX touches.',
    long:
      'Berserk Gym Store is an online platform to browse, filter, and order gym equipment. Built with React, Firebase, and Tailwind, it has a sleek UI and smooth cart/checkout system. I made it production-ready with real-world UX details and scalable design.',
    tech: ['React', 'Firebase', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/berserk-gym-store', demo: 'https://berserkfit.netlify.app/' },
    image: '/projects/berserkfitstore/berserk-fit-home.png',
    images: [
      '/projects/berserkfitstore/berserk-fit-home.png',
      '/projects/berserkfitstore/featured-prod.png',
      '/projects/berserkfitstore/admin-prod.png',
      '/projects/berserkfitstore/admin-berserk.png',
    ],
  },
  {
    id: 'moseeqify',
    title: 'Moseeqify',
    tagline: 'A Spotify-inspired music streaming app',
    description: 'Personal Spotify-like app with playlists, browsing, and playback.',
    long:
      'Moseeqify is my take on a personal Spotify clone. It handles playlists, track browsing, and playback, with a clean UI inspired by real-world apps. This project was about mastering APIs, React state management, and responsive design — plus it was just plain fun to hack music into a working app.',
    tech: ['React', 'Tailwind','Flask', 'Firebase', 'REST APIs'],
    links: { github: 'https://github.com/Musxeto/Moseeqify' },
    image: '/projects/moseeqify/home.png',
    images: [
      '/projects/moseeqify/home.png',
      '/projects/moseeqify/album.png',
    ],
  },
  {
    id: 'berserk-website',
    title: 'Berserk Gym (Website)',
    tagline: 'Modern landing page for a fitness brand',
    description: 'Responsive site showcasing services, trainers, and plans.',
    long:
      'Berserk Gym is a responsive website for a local gym — showcasing services, trainers, and membership plans. It’s simple but polished: a place where design, branding, and clean code come together. Built fast, shipped fast, and designed to look professional without over-engineering.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/berserk-gym', demo: 'https://berserkgym.vercel.app/' },
    image: '/projects/berserk-gym/gym-home.png',
    images: [
      '/projects/berserk-gym/gym-home.png',
      '/projects/berserk-gym/services.png',
    ],
  },
  {
    id: 'mauqah',
    title: 'Mauqah',
    tagline: 'Responsive Islamic landing page for a startup idea',
    description: 'Smooth scrolls, CTAs, and mobile-first design.',
    long:
      'Mauqah was about speed and clean execution. It’s a modern Islamic landing page with smooth scrolls, call-to-action buttons, and mobile-first design. Even though it’s lightweight, it packs a professional look and strong messaging — perfect for startups.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/mauqah', demo: 'https://mauqah.netlify.app/' },
    image: '/projects/mauqah/home-mauqah.png',
    images: [
      '/projects/mauqah/home-mauqah.png',
    ],
  },
  {
    id: 'amica',
    title: 'Amica Foundation',
    tagline: 'Charity/nonprofit website with a clean modern UI',
    description: 'Modern NGO platform for mission, programs, and donations.',
    long:
      'Amica Foundation’s site is a modern, responsive NGO platform that shares their mission, programs, and donation options. It balances functionality with a soft, inviting design. It taught me how to make design decisions that align with real-world organizations.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/amica-foundation', demo: 'https://amicafoundation.netlify.app/' },
    image: '/projects/amicafoundation/amica.png',
    images: [
      '/projects/amicafoundation/amica.png',
      '/projects/amicafoundation/amica-projects.png',
    ],
  },
]

// All projects are now in PROJECTS; removed separate Other Notables list.

function TechPills({ tech }: { tech: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="text-[10px] uppercase tracking-wide bg-black/30 border border-[#2fd89a22] text-[#b7f5d9] px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
  )
}

function Carousel({
  images,
  heightClass = 'h-40',
  rounded = false,
  auto = true,
  interval = 3000,
  onClick,
}: {
  images: string[]
  heightClass?: string
  rounded?: boolean
  auto?: boolean
  interval?: number
  onClick?: () => void
}) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [hover, setHover] = useState(false)

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIdx((i) => (i + 1) % images.length)
  }
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIdx((i) => (i - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (!auto || images.length <= 1) return
    if (hover) return
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, interval) as unknown as number
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [auto, images.length, interval, hover])

  return (
    <div
      className={`${heightClass} w-full relative overflow-hidden ${rounded ? 'rounded-lg' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Open project details' : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt="Project image"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0.0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 grid place-items-center"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 grid place-items-center"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setIdx(i)
                }}
                className={`w-1.5 h-1.5 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function stop(e: React.MouseEvent) {
  e.stopPropagation()
}

function ProjectCard({ p, onMore }: { p: Project; onMore: (p: Project) => void }) {
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
          <Carousel images={imgs} heightClass="h-40" onClick={open} />
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

  {/* Modal */}
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
                {/* Terminal-style header */}
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
                      mus — zsh — ~/projects/{active.id}
                    </div>
                  </div>
                </div>

                {/* Content: compact, no-scroll layout */}
                <div className="p-4 md:p-5">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
                    <div>
                      <div className="text-base md:text-lg font-semibold">{active.title}</div>
                      <div className="text-xs md:text-sm text-gray-300">{active.tagline}</div>

                      <div className="mt-2 text-[13px] md:text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                        {active.long}
                      </div>

                      <div className="mt-3">
                        <div className="text-[10px] uppercase text-gray-400">Key Tech</div>
                        <TechPills tech={active.tech} />
                      </div>

                      <div className="mt-3 flex gap-2 items-center flex-wrap">
                        {active.links?.demo && (
                          <a href={active.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-[#0b6b4a] text-white hover:bg-[#0e7f5f] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h6v2H7v10h10v-4h2v6H5z"></path></svg>
                            {active.links.demo.includes('http') ? 'Live' : 'View Demo'}
                          </a>
                        )}
                        {active.links?.video && (
                          <a href={active.links.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M8 5v14l11-7z"></path><path d="M3 19V5h2v14H3z"></path></svg>
                            Video
                          </a>
                        )}
                        {active.links?.github && (
                          <a href={active.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            <img src="/icons/GitHub.svg" alt="GitHub" className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                        {active.links?.post && (
                          <a href={active.links.post} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded border border-[#16b88566] text-[#9ff1c9] hover:bg-[#0a1515] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3 4h18v2H3z"></path><path d="M3 9h18v2H3z"></path><path d="M3 14h12v2H3z"></path></svg>
                            {active.links.postLabel ? `Post (${active.links.postLabel})` : 'Post'}
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      {(() => {
                        const imgs = active.images && active.images.length > 0 ? active.images : active.image ? [active.image] : []
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

        <div className="mt-8 text-center">
          <a href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#16b885] text-black font-medium hover:brightness-95">View all projects</a>
        </div>
      </div>
    </section>
  )
}

export { PROJECTS, ProjectCard, Carousel }
export type { Project }
