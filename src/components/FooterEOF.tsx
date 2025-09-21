import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FooterEOF() {
  const [openRelease, setOpenRelease] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const eggRef = useRef<HTMLSpanElement | null>(null)
  const statusRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenRelease(false)
        setOpenStatus(false)
      }
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node
      if (eggRef.current && !eggRef.current.contains(target)) setOpenRelease(false)
      if (statusRef.current && !statusRef.current.contains(target)) setOpenStatus(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    if (!openStatus) return
    const t = setTimeout(() => setOpenStatus(false), 4000)
    return () => clearTimeout(t)
  }, [openStatus])

  const buildItems: Array<{ label: string; icon?: string }> = [
    { label: 'React', icon: '/icons/React.svg' },
    { label: 'TypeScript', icon: '/icons/typeScript.svg' },
    { label: 'Tailwind', icon: '/icons/Tailwind CSS.svg' },
  ]

  return (
    <footer className="relative border-t border-[rgba(16,185,129,0.08)] bg-[rgba(3,7,10,0.65)] backdrop-blur">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />

      <div className="relative container mx-auto px-6 py-8 text-gray-300">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 justify-between">
          {/* Build info */}
          <div className="flex flex-col gap-2">
            <div className="font-mono text-xs text-[#9ddfbe]">// EOF</div>
            <div className="flex items-center flex-wrap gap-3 text-sm">
              <span className="text-gray-400">Built with</span>
              <ul className="flex items-center gap-3">
                {buildItems.map((b) => (
                  <li key={b.label} className="flex items-center gap-1">
                    {b.icon ? (
                      <img
                        src={b.icon}
                        alt={b.label}
                        className="w-4 h-4 select-none"
                        onError={(e) => {
                          const el = e.currentTarget
                          el.style.display = 'none'
                          const sib = el.nextElementSibling as HTMLElement | null
                          if (sib) sib.style.display = 'inline-flex'
                        }}
                      />
                    ) : null}
                    <span className="hidden text-gray-300 text-xs px-1 py-0.5 rounded border border-white/10 bg-white/5">
                      {b.label}
                    </span>
                    {!b.icon ? (
                      <span className="text-gray-300 text-xs px-1 py-0.5 rounded border border-white/10 bg-white/5">
                        {b.label}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex items-center gap-3 text-sm">
              <span ref={statusRef} className="relative inline-block">
                <span className="text-gray-400">status:</span>{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenStatus((v) => !v)
                  }}
                  className="align-baseline font-mono text-xs text-[#9ddfbe] hover:text-white hover:underline decoration-dotted decoration-[#16b88580] transition-colors"
                  aria-haspopup="dialog"
                  aria-expanded={openStatus}
                >
                  [systems_nominal]
                </button>
                <AnimatePresence>
                  {openStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      role="dialog"
                      aria-label="Systems status"
                      className="absolute bottom-[130%] left-0 z-50 w-80 max-w-[80vw] rounded-md border border-[#16b88555] bg-[#0a1313] shadow-[0_0_28px_rgba(22,184,133,0.22)] p-3"
                      onMouseLeave={() => setOpenStatus(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono text-[#9ddfbe]">holy-c-callback</div>
                        <button
                          onClick={() => setOpenStatus(false)}
                          className="text-gray-400 hover:text-white text-xs"
                          aria-label="Close"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-200">
                        <p className="leading-relaxed font-mono text-[13px]">
                          “Linux is designed like a 1970’s mainframe. TempleOS is designed like a C64.”
                          <br />
                          <span className="text-[#9ddfbe]/80">— Terry A. Davis</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>

              <span className="text-gray-500">•</span>

              {/* Release notes Easter egg */}
              <span ref={eggRef} className="relative inline-block">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenRelease((v) => !v)
                  }}
                  className="font-mono text-xs text-[#9ddfbe] hover:text-white transition-colors"
                  aria-haspopup="dialog"
                  aria-expanded={openRelease}
                >
                  [v.2.1.0-release]
                </button>
                <AnimatePresence>
                  {openRelease && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      role="dialog"
                      aria-label="Release notes"
                      className="absolute bottom-[130%] left-0 z-50 w-72 rounded-md border border-[#16b88555] bg-[#0a1313] shadow-[0_0_28px_rgba(22,184,133,0.22)] p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono text-[#9ddfbe]">release-notes</div>
                        <button
                          onClick={() => setOpenRelease(false)}
                          className="text-gray-400 hover:text-white text-xs"
                          aria-label="Close"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-200">
                        <p className="leading-relaxed">
                          “Best in the World is just a gimmick. I actually am as good as everyone else pretends to be. It’s scary.” 
                          <br/>
                           <span className="text-[#9ddfbe]/80">— Dean Ambrose</span>
                        </p>
                        <div className="mt-3 font-mono text-xs text-[#9ddfbe]">
                          $ echo "there_is_no_eof_to_curiosity"
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>

              <span className="text-gray-500">•</span>

              {/* Free Palestine tag */}
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-xs text-[#9ddfbe]">free palestine 🇵🇸</span>
                </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ghulammustafa"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-gray-300 group-hover:fill-white">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.83v1.98h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.11V23h-4v-5.96c0-1.42-.03-3.24-1.98-3.24-1.98 0-2.28 1.55-2.28 3.14V23h-4V8.5Z" />
              </svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href="https://github.com/musxeto"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="GitHub"
            >
              <img src="/icons/GitHub.svg" alt="GitHub" className="w-4 h-4 invert group-hover:drop-shadow-[0_0_8px_rgba(22,184,133,0.65)]" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href="https://instagram.com/mustafaxgm"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              aria-label="Instagram"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-gray-300 group-hover:fill-white">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11.25 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 .002 6.002A3 3 0 0 0 12 9Z" />
              </svg>
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center md:text-right">
          <span className="font-mono text-xs text-gray-400">© {new Date().getFullYear()} musxeto</span>
        </div>
      </div>
    </footer>
  )
}
