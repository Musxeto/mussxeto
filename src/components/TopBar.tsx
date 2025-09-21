import { NavLink, Link } from 'react-router-dom'
import { useTerminal } from './useTerminal'

export default function TopBar() {
  const { openTerminal } = useTerminal()
  const base = 'hidden md:flex gap-3'
  return (
    <header className="sticky top-0 z-40 w-full py-2 px-4 bg-[rgba(3,7,10,0.75)] backdrop-blur border-b border-[rgba(16,185,129,0.06)] flex items-center justify-between text-sm text-gray-200">
      <div className="flex items-center gap-4">
        <Link to="/" className="px-2 py-1 rounded-md bg-[rgba(16,185,129,0.08)] text-[#10b981] font-mono tracking-wider">musxeto</Link>
        <nav className={base}>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white')}>Projects</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white')}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white')}>Contact</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" aria-hidden></span>
          <span className="font-mono">dev</span>
        </div>
        {/* subtle terminal trigger */}
        <button
          onClick={openTerminal}
          aria-label="Open musxeto terminal"
          className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white px-2 py-1 rounded border border-white/5 hover:border-white/10"
          title="Open terminal (Ctrl+~)"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2.5 2.5 1.4-1.4L12 10.8l-3.1 3.1-1.4-1.4L9.2 10 7.5 8.5ZM11 15h6v2h-6v-2Z"/>
          </svg>
          <span className="hidden md:inline">terminal</span>
        </button>
      </div>
    </header>
  )
}
