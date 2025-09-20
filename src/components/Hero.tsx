import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Typewriter from 'typewriter-effect'
import * as THREE from 'three'

type HeroProps = {
  commands?: string[]
  onOpen?: () => void
}

function LowPolyMesh() {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // random vertex displacement to make it 'low-poly' like
  const geometry = useMemo(() => {
    // edgy torus-knot shape for a punk/goth feel
    return new THREE.TorusKnotGeometry(0.8, 0.25, 140, 16)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    if (!prefersReduced) {
      meshRef.current.rotation.y = t * 0.2
      meshRef.current.rotation.x = Math.sin(t / 2) * 0.07
      meshRef.current.position.y = Math.sin(t) * 0.04
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow>
      <meshStandardMaterial color="#9b111e" flatShading metalness={0.3} roughness={0.5} emissive="#16050a" emissiveIntensity={0.5} />
    </mesh>
  )
}

export default function Hero({ commands = ['whoami', 'ls projects', 'cat README.md'], onOpen }: HeroProps) {
  useEffect(() => {
    // noop: keep for possible future side-effects
  }, [])

  const handleOpen = () => {
    if (onOpen) return onOpen()
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-container relative w-full min-h-screen bg-[#0a0c0c] grunge-bg crt-scanlines vignette flex items-center overflow-hidden">
      <div className="jail-bars grunge-dirt"></div>
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

        <div className="hero-visual flex-1 w-full max-w-md h-64 md:h-80 rounded-lg overflow-hidden bg-transparent">
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <LowPolyMesh />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
          </Canvas>

          <div className="terminal-overlay absolute top-6 right-6 md:top-10 md:right-10">
            <div
              className="terminal rounded-md bg-[rgba(0,0,0,0.55)] border border-[#153f2e] px-3 py-2 text-sm text-[#b7f5d9] font-mono shadow-lg backdrop-blur"
              role="button"
              tabIndex={0}
              onClick={handleOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpen()
              }}
              aria-label="Open projects or show more information"
            >
              <div className="prompt flex items-center gap-2">
                <span className="prompt-symbol text-[#10b981]">&gt;</span>
                <div className="typewriter max-w-[14rem] overflow-hidden">
                  <Typewriter
                    options={{
                      strings: commands,
                      autoStart: true,
                      loop: true,
                      delay: 40,
                      deleteSpeed: 20,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
