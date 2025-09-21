import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HackerRain from './HackerRain'
import DevGraph from './DevGraph'
import { useEffect, useState } from 'react'
import { useTerminal } from './TerminalContext'

type HeroProps = { onOpen?: () => void }

export default function Hero({ onOpen }: HeroProps) {
  const { openTerminal } = useTerminal()
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  useEffect(() => {
    // noop for future side-effects
  }, [])

  const handleOpen = () => {
    if (onOpen) return onOpen()
    openTerminal()
  }

  return (
    <section className="hero-container relative w-full min-h-screen bg-[#0a0c0c] grunge-bg crt-scanlines vignette flex items-center overflow-hidden">
      <HackerRain opacity={0.14} speed={1.1} fontSize={12} trailLength={10} clearStrength={0.22} headGlow className="mix-blend-screen" />
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 px-6">
        <div className="hero-text flex-1 text-left text-white">
          <div className="mb-2 text-sm text-gray-400 font-mono">mustafa g.m aka musxeto</div>
          <h1 className="hero-heading text-4xl md:text-5xl font-extrabold mb-2">Ghulam Mustafa</h1>
          <p className="text-lg text-gray-300 max-w-xl">Fullstack dev shipping code that works — from web apps to AI assistants, automation bots, and Unity games. Sometimes for clients, sometimes for fun.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={handleOpen} className="px-4 py-2 rounded-md bg-[#0ea5a0] text-black font-medium">View projects</button>
            <a href="#contact" className="px-4 py-2 rounded-md border border-[rgba(255,255,255,0.06)] text-sm text-gray-200">Contact</a>
          </div>
        </div>

        <div className="hero-visual flex-1 w-full max-w-2xl h-80 md:h-[28rem] rounded-lg overflow-hidden bg-transparent">
          <Canvas shadows camera={{ position: [0, 0, 3.8], fov: 58 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <DevGraph mode="process" onSelect={(id) => setSelectedNode(id)} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
          </Canvas>

          {/* Side panel for selected node */}
          {selectedNode !== null && (
            <div className="absolute left-full ml-4 top-2/4 transform -translate-y-1/2 w-72 bg-[rgba(0,0,0,0.7)] border border-[rgba(16,185,129,0.12)] rounded-md p-4 text-sm text-[#b7f5d9] font-mono">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">Process #{selectedNode}</div>
                <button className="text-xs px-2 py-1 border rounded" onClick={() => setSelectedNode(null)}>Close</button>
              </div>
              <div className="text-xs text-gray-300">Details are simulated. Hover a node to view full details in-place.</div>
            </div>
          )}

          <div className="terminal-overlay absolute top-6 right-6 md:top-10 md:right-10">
            <form
              className="terminal rounded-md bg-[rgba(0,0,0,0.55)] border border-[#153f2e] px-3 py-2 text-sm text-[#b7f5d9] font-mono shadow-lg backdrop-blur flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const val = (fd.get('q') as string || '').trim().toLowerCase()
                if (!val) return
                if (['terminal', 'shell', 'zsh', 'bash', 'console'].includes(val)) {
                  openTerminal()
                } else if (['projects', 'open projects'].includes(val)) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                } else if (['about', 'experience', 'education', 'contact'].includes(val)) {
                  document.getElementById(val)?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  openTerminal()
                }
                e.currentTarget.reset()
              }}
            >
              <span className="prompt-symbol text-[#10b981]">&gt;</span>
              <input
                name="q"
                placeholder="type 'terminal' and Enter"
                className="bg-transparent outline-none placeholder:text-gray-500 w-48"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
