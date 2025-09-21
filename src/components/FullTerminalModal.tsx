import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PROJECTS } from '../data/projectsData'
import { EXPERIENCES } from '../data/experienceData'

type Props = { isOpen: boolean; onClose: () => void }

type Line = { text: string; kind?: 'out' | 'err' | 'sys' }

function useAutoScroll(dep: unknown) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [dep])
  return ref
}

function nowStr() {
  const d = new Date()
  return d.toLocaleString()
}

function makeCal(): string {
  const d = new Date()
  const month = d.toLocaleString(undefined, { month: 'long' })
  const year = d.getFullYear()
  const first = new Date(year, d.getMonth(), 1)
  const startDay = first.getDay() // 0 Sun
  const days = new Date(year, d.getMonth() + 1, 0).getDate()
  const header = `${month} ${year}`
  const wk = 'Su Mo Tu We Th Fr Sa'
  const slots: string[] = []
  for (let i = 0; i < startDay; i++) slots.push('  ')
  for (let i = 1; i <= days; i++) slots.push(i.toString().padStart(2, ' '))
  const lines = [] as string[]
  for (let i = 0; i < slots.length; i += 7) lines.push(slots.slice(i, i + 7).join(' '))
  return [header, wk, ...lines].join('\n')
}

const ASCII = `
⠄⣾⣿⡇⢸⣿⣿⣿⠄⠈⣿⣿⣿⣿⠈⣿⡇⢹⣿⣿⣿⡇⡇⢸⣿⣿⡇⣿⣿⣿
⢠⣿⣿⡇⢸⣿⣿⣿⡇⠄⢹⣿⣿⣿⡀⣿⣧⢸⣿⣿⣿⠁⡇⢸⣿⣿⠁⣿⣿⣿ 
⢸⣿⣿⡇⠸⣿⣿⣿⣿⡄⠈⢿⣿⣿⡇⢸⣿⡀⣿⣿⡿⠸⡇⣸⣿⣿⠄⣿⣿⣿
⢸⣿⡿⠷⠄⠿⠿⠿⠟⠓⠰⠘⠿⣿⣿⡈⣿⡇⢹⡟⠰⠦⠁⠈⠉⠋⠄⠻⢿⣿
⢨⡑⠶⡏⠛⠐⠋⠓⠲⠶⣭⣤⣴⣦⣭⣥⣮⣾⣬⣴⡮⠝⠒⠂⠂⠘⠉⠿⠖⣬ 
⠈⠉⠄⡀⠄⣀⣀⣀⣀⠈⢛⣿⣿⣿⣿⣿⣿⣿⣿⣟⠁⣀⣤⣤⣠⡀⠄⡀⠈⠁
⠄⠠⣾⡀⣾⣿⣧⣼⣿⡿⢠⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣧⣼⣿⣿⢀⣿⡇⠄ 
⡀⠄⠻⣷⡘⢿⣿⣿⡿⢣⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⢿⣿⣿⡿⢃⣾⠟⢁⠈
⢃⢻⣶⣬⣿⣶⣬⣥⣶⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣷⣾⣾⢣`

const NEOFETCH = `musxetoOS (musxeto-terminal)\n\nOS: MusxetoOS 1.0 (Ubuntu 22.04 LTS base)\nHost: portfolio.musxeto (musxeto.vercel.app)\nKernel: 6.x.x-generic (Human-Powered Intellect)\nUptime: 1 year, 2 months, 27 days\nPackages: 1234 (apt), 56 (snap)\nShell: zsh 5.8\nResolution: 1920x1080\nDE: musxeto-desktop\nWM: AwesomeWM\nTerminal: musxeto-terminal\nCPU: Human-Powered Intellect (12) @ 3.5GHz\nGPU: Visionary Graphics Unit (Integrated)\nMemory: Infinite Ideas / 128GB RAM (Used: ~30GB)`

export default function FullTerminalModal({ isOpen, onClose }: Props) {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [dir, setDir] = useState<'~' | '~/projects' | '~/about' | '~/experience' | '~/education' | '~/contact'>('~')
  const [hist, setHist] = useState<string[]>([])
  const ptrRef = useRef<number>(-1)
  const outRef = useAutoScroll(lines.length)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Focus when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Init neofetch on open
  useEffect(() => {
    if (!isOpen) return
    setLines([
      { text: ASCII, kind: 'sys' },
      { text: NEOFETCH, kind: 'out' },
    ])
    setDir('~')
  setHist([])
  ptrRef.current = -1
  // reset history pointer implicitly
    setInput('')
  }, [isOpen])

  const projectsById = useMemo(() => {
    const map: Record<string, (typeof PROJECTS)[number]> = {}
    for (const p of PROJECTS) map[p.id] = p
    return map
  }, [])

  const experiencesById = useMemo(() => {
    const map: Record<string, (typeof EXPERIENCES)[number]> = {}
    for (const e of EXPERIENCES) map[e.id] = e
    return map
  }, [])

  const contactItems = useMemo(() => ({
    email: 'mustafamalikawan786@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mustafa-gm',
    github: 'https://github.com/musxeto',
    instagram: 'https://instagram.com/mustafaxgm',
  }), [])

  const educationInfo = useMemo(() => ({
    degree: "Bachelor’s in Computer Science — Lahore Garrison University",
    gpa: 'CGPA: 3.60 / 4.00',
    achievements: "4.0 GPA semester (Spring 2025), Dean's List (Fall 2024)",
    coursework: [
      'Data Structures & Algorithms',
      'Databases',
      'Operating Systems',
      'Database Systems',
      'Artificial Intelligence',
      'Game Design & Development',
      'Digital Image Processing',
      'Programming with Python Lab',
    ],
  }), [])

  const prompt = useMemo(() => `musxetos@portfolio:${dir} $ `, [dir])

  function append(text: string | string[], kind: Line['kind'] = 'out') {
    const arr = Array.isArray(text) ? text : text.split('\n')
    setLines((prev) => [...prev, ...arr.map((t) => ({ text: t, kind }))])
  }

  function handleEnter(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return
  setHist((h) => [...h, cmd])
  ptrRef.current = -1
    append(`${prompt}${cmd}`, 'sys')

    const [base, ...args] = cmd.split(/\s+/)
    const arg = args.join(' ')

    switch (base) {
      case 'help': {
        append(`Available commands:\nhelp, whoami, clear, exit, date, cal, pwd, ls, cd <dir>, cat <file>, open <section|project>, man <cmd>, ping <host>, fortune, talk musxeto, sudo rm -rf /`)
        break
      }
      case 'whoami': {
        append('Ghulam Mustafa — Junior Backend Developer @ Smart Computing')
        break
      }
      case 'date': {
        append(nowStr())
        break
      }
      case 'cal': {
        append(makeCal())
        break
      }
      case 'pwd': {
        append(dir)
        break
      }
      case 'clear': {
        setLines([])
        break
      }
      case 'exit': {
        onClose()
        break
      }
      case 'ls': {
        if (dir === '~') {
          append('about/  experience/  education/  projects/  contact/  resume.pdf  readme.md  about.txt')
        } else if (dir === '~/projects') {
          append(PROJECTS.map((p) => p.id).join('  '))
        } else if (dir === '~/experience') {
          append(EXPERIENCES.map((e) => e.id).join('  '))
        } else if (dir === '~/about') {
          append('readme.md  about.txt')
        } else if (dir === '~/education') {
          append('degree.txt  gpa.txt  achievements.txt  coursework.txt')
        } else if (dir === '~/contact') {
          append('email  linkedin  github  instagram')
        } else {
          append('Nothing to list here.')
        }
        break
      }
      case 'cd': {
        const d = args[0]
        if (!d) { append('usage: cd <directory>', 'err'); break }
        if (d === '.' ) { /* no-op */ }
        else if (d === '..') {
          if (dir !== '~') setDir('~')
        }
        else if (d === '~' || d === '/') setDir('~')
        else if (d === 'projects' || d === '~/projects') setDir('~/projects')
        else if (['about', 'experience', 'education', 'contact'].includes(d)) setDir((`~/${d}`) as typeof dir)
        else append(`zsh: no such file or directory: ${d}`, 'err')
        break
      }
      case 'cat': {
        const f = args[0]
        if (!f) { append('usage: cat <file>', 'err'); break }
        if (f === 'readme.md' || f.toLowerCase() === 'readme') {
          append('Fullstack dev shipping code that works — web apps, APIs, and AI. Sometimes for clients, sometimes for fun.')
        } else if (f === 'about.txt') {
          append('I’m Ghulam Mustafa (musxeto). Backend-focused, FastAPI/SQLAlchemy/Celery, plus React/TS. Fitness, reading, and building useful things.')
        } else if (f === 'resume.pdf') {
          append('Opening resume.pdf ...')
          window.open('/resume.pdf', '_blank')
        } else if (dir === '~/projects' && projectsById[f]) {
          const p = projectsById[f]
          append(`${p.title}\n${p.tagline || ''}\nTech: ${p.tech.join(', ')}`)
        } else if (dir === '~/experience' && experiencesById[f]) {
          const e = experiencesById[f]
          append([
            `${e.role} — ${e.company}`,
            `${e.start} – ${e.end} | ${e.location}`,
            e.summary || '',
            e.bullets.length ? 'Highlights:' : '',
            ...e.bullets.map((b) => `- ${b}`),
            e.tech.length ? `Tech: ${e.tech.join(', ')}` : '',
          ].filter(Boolean) as string[])
        } else if (dir === '~/education') {
          if (f === 'degree.txt') append(educationInfo.degree)
          else if (f === 'gpa.txt') append(educationInfo.gpa)
          else if (f === 'achievements.txt') append(educationInfo.achievements)
          else if (f === 'coursework.txt') append(educationInfo.coursework.map((c) => `- ${c}`))
          else append(`zsh: ${f}: No such file`, 'err')
        } else if (dir === '~/contact') {
          const key = f as keyof typeof contactItems
          if (contactItems[key]) append(`${key}: ${contactItems[key]}`)
          else append(`zsh: ${f}: No such file`, 'err')
        } else if (dir === '~/about') {
          if (f === 'about.txt' || f === 'readme.md') {
            append(f === 'about.txt' ? 'I’m Ghulam Mustafa (musxeto). Backend-focused, FastAPI/SQLAlchemy/Celery, plus React/TS.' : 'Fullstack dev shipping code that works — web apps, APIs, and AI.')
          } else append(`zsh: ${f}: No such file`, 'err')
        } else {
          append(`zsh: ${f}: No such file`, 'err')
        }
        break
      }
      case 'open': {
        const target = args[0]
        if (!target) { append('usage: open <section|project|resume>', 'err'); break }
        if (['projects', 'about', 'experience', 'education', 'contact'].includes(target)) {
          const el = document.getElementById(target === 'projects' ? 'projects' : target)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          append(`Opening ${target} ...`)
        } else if (target === 'resume') {
          window.open('/resume.pdf', '_blank')
          append('Opening resume.pdf ...')
        } else if (projectsById[target]) {
          window.dispatchEvent(new CustomEvent('open-project-modal', { detail: { id: target } }))
          append(`Opening project: ${target}`)
        } else if (experiencesById[target]) {
          const el = document.getElementById('experience')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          append(`Opening experience: ${target} (scrolling to timeline) ...`)
        } else if (dir === '~/contact' && target in contactItems) {
          const key = target as keyof typeof contactItems
          const val = contactItems[key]
          if (key === 'email') window.open(`mailto:${val}`, '_blank')
          else window.open(val, '_blank')
          append(`Opening ${target} ...`)
        } else {
          append(`zsh: cannot open ${target}`, 'err')
        }
        break
      }
      case 'man': {
        const m = args[0]
        if (!m) { append('usage: man <command>', 'err'); break }
        const entries: Record<string, string> = {
          ls: 'ls — list directories/files in current simulated directory.',
          cd: 'cd — change directory. e.g., cd projects | cd ..',
          cat: 'cat — print a file. cat readme.md | about.txt | resume.pdf | <projectId> (in ~/projects)',
          open: 'open — open sections or projects. open projects | open aalim-ai | open resume',
          clear: 'clear — clear the terminal screen.',
          exit: 'exit — close the terminal.',
          whoami: 'whoami — print your identity.',
          date: 'date — show current date/time.',
          cal: 'cal — print current month calendar.',
          help: 'help — list available commands.'
        }
        append(entries[m] || `No manual entry for ${m}`)
        break
      }
      case 'ping': {
        const host = args[0] || 'musxeto.vercel.app'
        append(`PING ${host} (192.0.2.123): 56 data bytes\n64 bytes from ${host}: icmp_seq=0 ttl=55 time=23.5 ms\n64 bytes from ${host}: icmp_seq=1 ttl=55 time=22.8 ms\n--- ${host} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`)
        break
      }
      case 'fortune': {
        append('“There is no EOF to curiosity.” — musxeto')
        break
      }
      case 'talk': {
        if (arg.toLowerCase() === 'musxeto') append('musxeto: keep building. ship > hype.')
        else append('nobody answered.')
        break
      }
      case 'sudo': {
        if (args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
          append('sudo: a password is required.')
          append('Permission denied. nice try. 😉')
        } else append('sudo: permission denied')
        break
      }
      default: {
        append(`zsh: command not found: ${base}`, 'err')
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleEnter(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = ptrRef.current
      const next = prev < 0 ? hist.length - 1 : Math.max(0, prev - 1)
      ptrRef.current = next
      setInput(hist[next] ?? input)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const prev = ptrRef.current
      if (prev < 0) return
      const next = prev + 1
      if (next >= hist.length) {
        setInput('')
        ptrRef.current = -1
      } else {
        setInput(hist[next])
        ptrRef.current = next
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[rgba(5,50,40,0.7)] backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
          >
            <div className="w-[min(92vw,1100px)] h-[min(88vh,900px)] rounded-xl border border-[#16b88575] bg-[#0b1312]/95 shadow-[0_0_28px_rgba(22,184,133,0.22)] text-[#b7f5d9] font-terminal flex flex-col overflow-hidden">
              {/* Title bar */}
              <div className="px-4 pt-3 pb-2 border-b border-[#16b88533] bg-[linear-gradient(180deg,rgba(20,26,26,0.85),rgba(10,19,19,0.85))] flex items-center gap-2">
                <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#00000033] shadow-inner" aria-label="Close" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#00000033]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#00000033]" />
                <div className="ml-3 flex-1 text-center text-xs text-[#9ddfbe] truncate">mus — zsh — ~/musxeto-terminal</div>
              </div>
              {/* Output */}
              <div ref={outRef} className="flex-1 overflow-auto px-4 py-3 text-sm custom-scrollbar">
                {lines.map((l, i) => (
                  <pre key={i} className={`${l.kind === 'err' ? 'text-red-300' : l.kind === 'sys' ? 'text-[#9ddfbe]' : 'text-gray-200'} whitespace-pre-wrap leading-relaxed`}>{l.text}</pre>
                ))}
              </div>
              {/* Input */}
              <div className="px-4 py-3 border-t border-[#16b88533] bg-[#0a1313] text-[#9ddfbe]">
                <div className="flex items-center gap-2">
                  <span className="text-[#9ddfbe] whitespace-pre text-xs sm:text-sm">{prompt}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none text-gray-100 text-sm caret-[#16b885]"
                    aria-label="Terminal input"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
