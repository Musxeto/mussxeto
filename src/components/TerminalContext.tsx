import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import FullTerminalModal from './FullTerminalModal'

type TerminalContextValue = {
  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
}

const TerminalContext = createContext<TerminalContextValue | undefined>(undefined)

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openTerminal = useCallback(() => setOpen(true), [])
  const closeTerminal = useCallback(() => setOpen(false), [])
  const toggleTerminal = useCallback(() => setOpen((v) => !v), [])

  // Global keyboard shortcut: Ctrl + ` (tilde/backtick) or Ctrl+Alt+T
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key
      if ((e.ctrlKey && (key === '`' || key === '~')) || (e.ctrlKey && e.altKey && (key.toLowerCase() === 't'))) {
        e.preventDefault()
        toggleTerminal()
      }
      if (open && key === 'Escape') {
        e.preventDefault()
        closeTerminal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, toggleTerminal, closeTerminal])

  const value = useMemo(() => ({ openTerminal, closeTerminal, toggleTerminal }), [openTerminal, closeTerminal, toggleTerminal])

  return (
    <TerminalContext.Provider value={value}>
      {children}
      <FullTerminalModal isOpen={open} onClose={closeTerminal} />
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminal must be used within TerminalProvider')
  return ctx
}
