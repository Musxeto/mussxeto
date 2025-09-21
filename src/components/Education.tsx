import { motion } from 'framer-motion'
import { useState } from 'react'

function LogoBadge({ src, alt, initials }: { src: string; alt?: string; initials: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full bg-[#0f1a1a] border border-[#16b88533] overflow-hidden shadow-[0_0_14px_rgba(22,184,133,0.25)]">
      {!failed ? (
        <img
          src={src}
          alt={alt || initials}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full grid place-items-center">
          <span className="text-[#b7f5d9] text-base font-semibold">{initials}</span>
        </div>
      )}
    </div>
  )
}

function TechIcons({ tech }: { tech: string[] }) {
  const ICONS: Record<string, string> = {
    Python: '/icons/Python.svg',
    OpenCV: '/icons/OpenCV.svg',
    MySQL: '/icons/MySQL.svg',
    'Microsoft SQL Server': '/icons/Microsoft SQL Server.svg',
    Linux: '/icons/Linux.svg',
    Bash: '/icons/Bash.svg',
    'C': '/icons/C.svg',
    'Cplusplus': '/icons/Cplusplus.svg',
    'CSharp': '/icons/CSharp.svg',
    JavaScript: '/icons/JavaScript.svg',
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {tech.map((t) =>
        ICONS[t] ? (
          <img key={t} src={ICONS[t]} alt={`${t} icon`} loading="lazy" className="h-5 w-5 object-contain" title={t} />
        ) : (
          <span key={t} className="text-[10px] px-2 py-1 rounded border border-[#16b88533] text-[#9ddfbe] bg-[#0d1717]" title={t}>
            {t}
          </span>
        ),
      )}
    </div>
  )
}

export default function Education({ title = 'Education', intro = 'My academic foundation that underpins my technical expertise.' }: { title?: string; intro?: string }) {
  const degree = "Bachelor’s in Computer Science"
  const institution = 'Lahore Garrison University'
  const institutionUrl = 'https://lgu.edu.pk'
  const dates = 'Oct 2022 – Jul 2026 (expected)'
  const gpa = 'CGPA: 3.60 / 4.00'
  const achievements = "4.0 GPA semester (Spring 2025), Dean's List (Fall 2024)"
  const coursework = [
    'Data Structures & Algorithms',
    'Databases',
    'Operating Systems',
    'Database Systems',
    'Artificial Intelligence',
    'Game Design & Development',
    'Digital Image Processing',
    'Programming with Python Lab',
  ]
  const keySkills = ['Python', 'OpenCV', 'MySQL', 'Microsoft SQL Server', 'C', 'Cplusplus', 'CSharp', 'Bash', 'Unity']

  return (
    <section id="education" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(2,6,6,0.5),rgba(1,3,3,0.8))]">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {intro && <p className="text-sm text-gray-300">{intro}</p>}
        </div>

        {/* Single terminal-styled card, Linux Mint vibe */}
        <div className="relative mt-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-3xl mx-auto rounded-xl border border-[#16b88555] bg-[#0a1313]/95 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_28px_rgba(22,184,133,0.22)] hover:border-[#16b88577] transition-all"
          >
            {/* Terminal header */}
            <div className="px-4 pt-3 pb-2 border-b border-[#16b88533] rounded-t-xl bg-[linear-gradient(180deg,rgba(20,26,26,0.85),rgba(10,19,19,0.85))]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#00000033] shadow-inner" title="Mint" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#00000033]" title="Minimize" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#00000033]" title="Close" />
                <div className="ml-3 flex-1 text-center text-sm text-[#9ddfbe] truncate font-mono">
                  mus — zsh — ~/education/lgu
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <LogoBadge src="/companies/lgu.png" alt="Lahore Garrison University" initials="LGU" />
                <div>
                  <div className="text-[#b7f5d9] font-semibold text-lg">{degree}</div>
                  <a href={institutionUrl} target="_blank" rel="noreferrer" className="text-sm text-gray-300 hover:text-[#9ff1c9] underline/20">
                    {institution}
                  </a>
                  <div className="mt-1 text-xs text-gray-400">{dates}</div>
                  <div className="mt-1 text-xs text-[#9ddfbe] font-mono">{gpa}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-300">
                <span className="text-[11px] uppercase text-gray-400">Notable achievement: </span>
                {achievements}
              </div>

              <div className="mt-3">
                <div className="text-[11px] uppercase text-gray-400">Relevant coursework</div>
                <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-200 list-disc list-inside">
                  {coursework.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-[11px] uppercase text-gray-400">Key skills</div>
                <TechIcons tech={keySkills} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
