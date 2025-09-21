import { motion } from 'framer-motion'
import TechPills from './TechPills'
import type { Experience } from '../data/experienceData'

export function ExperienceItem({ exp, align }: { exp: Experience; align: 'left' | 'right' }) {
  const isLeft = align === 'left'
  return (
    <div className={`relative w-full md:w-1/2 ${isLeft ? 'md:pr-10 md:pl-0' : 'md:pl-10 md:pr-0'} mb-10`}> 
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-[#0a1313] border border-[#16b88522] rounded-lg p-4 shadow-[0_0_0_1px_rgba(22,184,133,0.08)] hover:shadow-[0_0_24px_rgba(22,184,133,0.18)] hover:border-[#16b88555] transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#b7f5d9] font-semibold text-base">{exp.role}</div>
            <div className="text-sm text-gray-300">
              {exp.companyUrl ? (
                <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
            </div>
          </div>
          {/* Logo placeholder */}
          <div className={`w-10 h-10 rounded bg-[#0f1a1a] border border-[#16b88522] grid place-items-center text-[10px] text-[#9ddfbe] ${exp.current ? 'shadow-[0_0_12px_rgba(22,184,133,0.5)]' : ''}`}>
            {exp.company.split(' ').slice(0,2).map(w => w[0]).join('')}
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-400">
          {exp.start} – {exp.end} | {exp.location}
        </div>

        {exp.summary && (
          <p className="mt-2 text-sm text-gray-300">{exp.summary}</p>
        )}

        <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-200">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <TechPills tech={exp.tech} />
      </motion.div>

      {/* Timeline dot */}
      <div className={`hidden md:block absolute top-4 ${isLeft ? 'right-[-10px]' : 'left-[-10px]'} w-5 h-5 rounded-full bg-[#071010] border-2 border-[#16b885] shadow-[0_0_12px_rgba(22,184,133,0.6)]`} />
    </div>
  )
}

export default ExperienceItem;