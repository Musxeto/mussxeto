import { useState } from 'react'
import { motion } from 'framer-motion'
import { EXPERIENCES } from '../data/experienceData'

function LogoBadge({ src, alt, initials, highlight }: { src: string; alt?: string; initials: string; highlight?: boolean }) {
  const [failed, setFailed] = useState(false)
  const glow = highlight ? 'drop-shadow-[0_0_18px_rgba(22,184,133,0.55)]' : 'drop-shadow-[0_0_8px_rgba(0,0,0,0.45)]'
  return (
    <>
      {!failed ? (
        <img
          src={src}
          alt={alt || initials}
          loading="lazy"
          className={`w-24 h-24 sm:w-20 sm:h-20 object-contain ${glow}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-[#b7f5d9] text-sm font-semibold">{initials}</span>
      )}
    </>
  )
}

function TechIcons({ tech }: { tech: string[] }) {
  const ICONS: Record<string, string> = {
    // Web / FE
    React: '/icons/React.svg',
    TypeScript: '/icons/typeScript.svg',
    'Tailwind CSS': '/icons/Tailwind CSS.svg',
    'Node.js': '/icons/Node.js.svg',
    JavaScript: '/icons/JavaScript.svg',
    // Python / DS / BE
    Python: '/icons/Python.svg',
    FastAPI: '/icons/FastAPI.svg',
    Flask: '/icons/Flask.svg',
    Django: '/icons/Django.svg',
    'scikit-learn': '/icons/scikit-learn.svg',
    TensorFlow: '/icons/TensorFlow.svg',
    NumPy: '/icons/NumPy.svg',
    Pandas: '/icons/Pandas.svg',
    OpenCV: '/icons/OpenCV.svg',
    // Databases
    PostgreSQL: '/icons/PostgresSQL.svg',
    MongoDB: '/icons/MongoDB.svg',
    MySQL: '/icons/MySQL.svg',
    SQLite: '/icons/SQLite.svg',
    'Microsoft SQL Server': '/icons/Microsoft SQL Server.svg', // Keep this line
    // DevOps / Tools
    docker: '/icons/docker.svg', // lowercase alias
    Git: '/icons/Git.svg',
    Linux: '/icons/Linux.svg',
    Firebase: '/icons/Firebase.svg',
    Redis: '/icons/Redis.svg',
    SQLAlchemy: '/icons/SQLAlchemy.svg',
    AWSS3: '/icons/AWS.svg',
    Celery: '/icons/celery.svg'
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {tech.map((t) => {
        const src = ICONS[t]
        if (src) {
          return (
            <img
              key={t}
              src={src}
              alt={`${t} icon`}
              loading="lazy"
              className="h-5 w-5 object-contain drop-shadow-[0_0_4px_rgba(22,184,133,0.4)]"
              title={t}
            />
          )
        }
        return (
          <span
            key={t}
            className="text-[10px] px-2 py-1 rounded border border-[#16b88533] text-[#9ddfbe] bg-[#0d1717]"
            title={t}
          >
            {t}
          </span>
        )
      })}
    </div>
  )
}

export default function ExperienceTimeline({ title = 'Experience', intro }: { title?: string; intro?: string }) {
  // Custom, explicit ordering and grouping (single column)
  const scLatest = EXPERIENCES.find((e) => e.id === 'smart-computing-junior-backend')
  const scOlder = EXPERIENCES.find((e) => e.id === 'smart-computing-intern')
  const chelan = EXPERIENCES.find((e) => e.id === 'chelan-react-native')
  const salvo = EXPERIENCES.find((e) => e.id === 'salvo-intern')
  const gcs = EXPERIENCES.find((e) => e.id === 'gcs-intern')
  return (
    <section id="experience" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(2,6,6,0.5),rgba(1,3,3,0.8))]">
      <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {intro && <p className="text-sm text-gray-300">{intro}</p>}
        </div>

        <div className="relative mt-10 space-y-10">
          {/* Vertical timeline line on the left */}
          <div className="absolute left-8 top-0 w-px h-full bg-[#16b88544]" />

          {/* Smart Computing — latest role */}
          {scLatest && (
            <div className="relative pl-20">
              {/* Dot */}
              <div className="absolute left-8 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_12px_rgba(22,184,133,0.6)]" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
              >
                <div className="mb-3">
                  <LogoBadge
                    src="/companies/smartcompuitings.png"
                    alt="Smart Computing SMC Pvt Ltd logo"
                    initials="SC"
                    highlight={Boolean(scLatest.current)}
                  />
                </div>
                <div className="text-[#b7f5d9] font-semibold text-base">{scLatest.role}</div>
                <div className="text-sm text-gray-300">Smart Computing SMC Pvt Ltd</div>
                <div className="mt-1 text-xs text-gray-400">{scLatest.start} – {scLatest.end} | {scLatest.location}</div>
                {scLatest.summary && <p className="mt-3 text-sm text-gray-300">{scLatest.summary}</p>}
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-200">
                  {scLatest.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
                <TechIcons tech={scLatest.tech} />
              </motion.div>
            </div>
          )}

          {/* Smart Computing — older role */}
          {scOlder && (
            <div className="relative pl-20">
              {/* Dot */}
              <div className="absolute left-8 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_10px_rgba(22,184,133,0.6)]" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
              >
                <div className="mb-3">
                  <LogoBadge
                    src="/companies/smartcompuitings.png"
                    alt="Smart Computing SMC Pvt Ltd logo"
                    initials="SC"
                    highlight={false}
                  />
                </div>
                <div className="text-[#b7f5d9] font-semibold text-base">{scOlder.role}</div>
                <div className="text-sm text-gray-300">Smart Computing SMC Pvt Ltd</div>
                <div className="mt-1 text-xs text-gray-400">{scOlder.start} – {scOlder.end} | {scOlder.location}</div>
                {scOlder.summary && <p className="mt-3 text-sm text-gray-300">{scOlder.summary}</p>}
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-200">
                  {scOlder.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
                <TechIcons tech={scOlder.tech} />
              </motion.div>
            </div>
          )}

          {/* Chelan */}
          {chelan && (
            <div className="relative pl-20">
              <div className="absolute left-8 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_10px_rgba(22,184,133,0.6)]" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
              >
                <div className="mb-3">
                  <LogoBadge
                    src="/companies/chelan.svg"
                    alt="Chelan Technologies logo"
                    initials="CT"
                    highlight={Boolean(chelan.current)}
                  />
                </div>
                <div className="text-[#b7f5d9] font-semibold text-base">{chelan.role}</div>
                <div className="text-sm text-gray-300">{chelan.company}</div>
                <div className="mt-1 text-xs text-gray-400">{chelan.start} – {chelan.end} | {chelan.location}</div>
                {chelan.summary && <p className="mt-3 text-sm text-gray-300">{chelan.summary}</p>}
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-200">
                  {chelan.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
                <TechIcons tech={chelan.tech} />
              </motion.div>
            </div>
          )}

          {/* Salvo */}
          {salvo && (
            <div className="relative pl-20">
              <div className="absolute left-8 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_10px_rgba(22,184,133,0.6)]" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
              >
                <div className="mb-3">
                  <LogoBadge
                    src="/companies/salvo.png"
                    alt="Salvo Integrated Solutions logo"
                    initials="SI"
                  />
                </div>
                <div className="text-[#b7f5d9] font-semibold text-base">{salvo.role}</div>
                <div className="text-sm text-gray-300">{salvo.company}</div>
                <div className="mt-1 text-xs text-gray-400">{salvo.start} – {salvo.end} | {salvo.location}</div>
                {salvo.summary && <p className="mt-3 text-sm text-gray-300">{salvo.summary}</p>}
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-200">
                  {salvo.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
                <TechIcons tech={salvo.tech} />
              </motion.div>
            </div>
          )}

          {/* GCS */}
          {gcs && (
            <div className="relative pl-20">
              <div className="absolute left-8 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_10px_rgba(22,184,133,0.6)]" />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
              >
                <div className="mb-3">
                  <LogoBadge
                    src="/companies/gcs.png"
                    alt="GCS Pvt Ltd logo"
                    initials="GCS"
                  />
                </div>
                <div className="text-[#b7f5d9] font-semibold text-base">{gcs.role}</div>
                <div className="text-sm text-gray-300">{gcs.company}</div>
                <div className="mt-1 text-xs text-gray-400">{gcs.start} – {gcs.end} | {gcs.location}</div>
                {gcs.summary && <p className="mt-3 text-sm text-gray-300">{gcs.summary}</p>}
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-200">
                  {gcs.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
                <TechIcons tech={gcs.tech} />
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 px-6 sm:px-0">
          <a
            href="/resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded bg-[#16b885] text-black font-medium text-sm sm:text-base hover:brightness-95"
          >
            View Full Resume (PDF)
          </a>
          <a
            href="https://www.linkedin.com/in/mustafa-gm"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded border border-[#16b88566] text-[#9ff1c9] text-sm sm:text-base hover:bg-[#0a1515]"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
