import { useContext } from 'react'
import { TerminalContext } from './TerminalContext'

export function useTerminal() {
  const ctx = useContext(TerminalContext)
  if (!ctx) throw new Error('useTerminal must be used within TerminalProvider')
  return ctx
}
