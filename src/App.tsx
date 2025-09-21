import WebRoutes from './WebRoutes'
import { TerminalProvider } from './components/TerminalContext'

function App() {
  return (
    <TerminalProvider>
      <WebRoutes />
    </TerminalProvider>
  )
}

export default App
