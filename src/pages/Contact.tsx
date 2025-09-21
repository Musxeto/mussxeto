import { motion } from 'framer-motion'

export default function Contact() {
  const email = 'mustafamalikawan786@gmail.com'
  const mailto = `mailto:${email}`
  return (
    <section id="contact" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(2,6,6,0.5),rgba(1,3,3,0.8))]">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center text-[#b7f5d9] font-mono">
          <h2 className="text-2xl font-bold mb-2">/bin/contact</h2>
          <p className="text-sm text-gray-300">&gt; echo "Let's connect and build something amazing"</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-3xl mx-auto mt-10 rounded-xl border border-[#16b88555] bg-[#0a1313]/95 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_28px_rgba(22,184,133,0.22)] hover:border-[#16b88577] transition-all"
        >
          {/* Terminal Header */}
          <div className="px-4 pt-3 pb-2 border-b border-[#16b88533] rounded-t-xl bg-[linear-gradient(180deg,rgba(20,26,26,0.85),rgba(10,19,19,0.85))]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#00000033] shadow-inner" title="Close" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#00000033]" title="Minimize" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#00000033]" title="Maximize" />
              <div className="ml-3 flex-1 text-center text-sm text-[#9ddfbe] truncate">
                mus ~ zsh /bin/contact
              </div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-[#c8ffe1]">
            <div className="text-sm">
              <div className="text-[#9ddfbe]">musxetos@portfolio:~$ initiate_connection</div>

              <div className="mt-4 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-[#9ddfbe] opacity-90"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8.21l7.4 5.55a1 1 0 0 0 1.2 0L20 8.21V18H4Z" />
                  </svg>
                  <div>
                    <span className="text-[#9ff1c9]">Email:</span>{' '}
                    <a href={mailto} aria-label="Send email" className="underline decoration-dotted hover:text-white">{email}</a>
                  </div>
                </div>
                <div>
                  <a href={mailto} className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-[#0b6b4a] text-white hover:bg-[#0e7f5f]">
                    sendmail --to=ghulam
                  </a>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-3">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-[#9ddfbe] opacity-90">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.83v1.98h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.11V23h-4v-5.96c0-1.42-.03-3.24-1.98-3.24-1.98 0-2.28 1.55-2.28 3.14V23h-4V8.5Z" />
                  </svg>
                  <div>
                    <span className="text-[#9ff1c9]">LinkedIn:</span>{' '}
                    <a href="https://www.linkedin.com/in/mustafa-gm" target="_blank" rel="noreferrer noopener" className="underline decoration-dotted hover:text-white">/in/ghulammustafa</a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-3">
                  <img src="/icons/GitHub.svg" alt="GitHub" className="w-4 h-4 invert drop-shadow-[0_0_6px_rgba(22,184,133,0.65)]" />
                  <div>
                    <span className="text-[#9ff1c9]">GitHub:</span>{' '}
                    <a href="https://github.com/musxeto" target="_blank" rel="noreferrer" className="underline decoration-dotted hover:text-white">/musxeto</a>
                  </div>
                </div>

                {/* Optional: X/Twitter placeholder (hidden by default) */}
                {/* <div className="flex items-center gap-3">
                  <img src="/icons/x.svg" alt="X" className="w-4 h-4 opacity-90" />
                  <div>
                    <span className="text-[#9ff1c9]">X:</span>{' '}
                    <a href="#" target="_blank" rel="noreferrer" className="underline decoration-dotted hover:text-white">@handle</a>
                  </div>
                </div> */}

                <div className="pt-4 text-[#9ddfbe]">musxeto@portfolio:~$</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
