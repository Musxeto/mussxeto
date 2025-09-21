import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import type * as THREE from 'three'

type Tech = {
  id: string
  name: string
  svg: string
}

// keep icons in same order as provided; these files are in public/icons/
const TECHS: Tech[] = [
  { id: 'bash', name: 'Bash', svg: '/icons/Bash.svg' },
  { id: 'c', name: 'C', svg: '/icons/C.svg' },
  { id: 'cpp', name: 'C++', svg: '/icons/C++.svg' },
  { id: 'csharp', name: 'CSharp', svg: '/icons/CSharp.svg' },
  { id: 'css', name: 'CSS3', svg: '/icons/CSS3.svg' },
  { id: 'django', name: 'Django', svg: '/icons/Django.svg' },
  { id: 'docker', name: 'Docker', svg: '/icons/docker.svg' },
  { id: 'fastapi', name: 'FastAPI', svg: '/icons/FastAPI.svg' },
  { id: 'firebase', name: 'Firebase', svg: '/icons/Firebase.svg' },
  { id: 'flask', name: 'Flask', svg: '/icons/Flask.svg' },
  { id: 'git', name: 'Git', svg: '/icons/Git.svg' },
  { id: 'github', name: 'GitHub', svg: '/icons/GitHub.svg' },
  { id: 'gitlab', name: 'GitLab', svg: '/icons/GitLab.svg' },
  { id: 'html', name: 'HTML5', svg: '/icons/HTML5.svg' },
  { id: 'js', name: 'JavaScript', svg: '/icons/JavaScript.svg' },
  { id: 'linux', name: 'Linux', svg: '/icons/Linux.svg' },
  { id: 'matplotlib', name: 'Matplotlib', svg: '/icons/Matplotlib.svg' },
  { id: 'jupyter', name: 'Jupyter', svg: '/icons/Jupyter.svg' },
  { id: 'mssql', name: 'MSSQL', svg: '/icons/Microsoft SQL Server.svg' },
  { id: 'mongodb', name: 'MongoDB', svg: '/icons/MongoDB.svg' },
  { id: 'mysql', name: 'MySQL', svg: '/icons/MySQL.svg' },
  { id: 'node', name: 'Node.js', svg: '/icons/Node.js.svg' },
  { id: 'numpy', name: 'NumPy', svg: '/icons/NumPy.svg' },
  { id: 'opencv', name: 'OpenCV', svg: '/icons/OpenCV.svg' },
  { id: 'pandas', name: 'Pandas', svg: '/icons/Pandas.svg' },
  { id: 'postgres', name: 'Postgres', svg: '/icons/PostgresSQL.svg' },
  { id: 'python', name: 'Python', svg: '/icons/Python.svg' },
  { id: 'react', name: 'React', svg: '/icons/React.svg' },
  { id: 'scikit', name: 'scikit-learn', svg: '/icons/scikit-learn.svg' },
  { id: 'sqlite', name: 'SQLite', svg: '/icons/SQLite.svg' },
  { id: 'tailwind', name: 'Tailwind', svg: '/icons/Tailwind CSS.svg' },
  { id: 'tensorflow', name: 'TensorFlow', svg: '/icons/TensorFlow.svg' },
  { id: 'ts', name: 'TypeScript', svg: '/icons/typeScript.svg' },
  { id: 'unity', name: 'Unity', svg: '/icons/Unity.svg' },
]

function IconPlane({ tech, pos, angle }: { tech: Tech; pos: [number, number, number]; angle: number }) {
  const ref = useRef<THREE.Group | null>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, dt) => {
    if (ref.current) {
      // make the icon slowly orbit around its local Y for a slight wobble
      ref.current.rotation.y += (hovered ? 1.2 : 0.3) * dt * (0.5 + Math.abs(Math.sin(angle)))
      const s = 0.85 + (hovered ? 0.22 : 0.02)
      ref.current.scale.set(s, s, s)
    }
  })

  return (
    <group ref={ref} position={pos}>
      {/* Use Html as the visible icon; attach pointer handlers to the DOM node */}
  <Html center distanceFactor={2.2}>
        <div
          className="w-14 h-14 flex items-center justify-center cursor-pointer"
          onPointerEnter={(e) => { e.stopPropagation(); setHovered(true) }}
          onPointerLeave={(e) => { e.stopPropagation(); setHovered(false) }}
        >
          <img src={tech.svg} alt={tech.name} className="w-10 h-10" style={{ filter: 'grayscale(1) brightness(1.2) drop-shadow(0 0 6px rgba(16,185,129,0.7))' }} />
        </div>
      </Html>

      {hovered && (
        <Html position={[0, -0.9, 0]} center distanceFactor={1.8}>
          <div className="px-2 py-1 bg-black/70 border border-[rgba(16,185,129,0.12)] text-xs text-[#b7f5d9] font-mono rounded">
            {tech.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function SphereGroup({ items, positions, speed }: { items: Tech[]; positions: [number, number, number][]; speed: number }) {
  const groupRef = useRef<THREE.Group | null>(null)
  const outerRef = useRef<THREE.Mesh | null>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * delta
      groupRef.current.rotation.x += speed * delta * 0.03
    }
    if (outerRef.current) {
      const t = Date.now() * 0.001
      // store as scale pulse for subtle breathing
      outerRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02)
      // rotate slowly opposite direction
      outerRef.current.rotation.y -= speed * delta * 0.6
    }
  })

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        {items.map((tech, i) => (
          <IconPlane key={tech.id} tech={tech} pos={positions[i]} angle={i} />
        ))}
      </group>

      {/* outer glowing wireframe sphere */}
      <mesh ref={outerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[Math.max(...positions.map((p) => Math.hypot(p[0], p[1], p[2]))) + 0.6, 32, 32]} />
        <meshStandardMaterial color="#0ef1b0" emissive="#0ef1b0" emissiveIntensity={0.6} metalness={0.1} roughness={0.9} transparent opacity={0.18} wireframe />
      </mesh>
    </>
  )
}

export default function TechGrid({ radius = 3.0, speed = 0.18 }: { radius?: number; speed?: number }) {
  const items = useMemo(() => TECHS, [])

  // Fibonacci sphere distribution for even coverage
  const positions = useMemo(() => {
    const N = items.length
    const pts: [number, number, number][] = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2 // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      // bias some points toward small clusters by modulating radius slightly
      const jitter = 0.85 + (Math.sin(i * 0.7) + 1) * 0.08
      pts.push([x * radius * jitter, y * radius * 0.9 * jitter, z * radius * jitter])
    }
    return pts
  }, [items, radius])

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, Math.max(5, radius * 1.6)], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <SphereGroup items={items} positions={positions} speed={speed} />
  <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} enableDamping dampingFactor={0.08} minDistance={3} maxDistance={12} />
      </Canvas>

      {/* subtle overlay grid / prompt */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(0,0,0,0.2))]" />
        <div className="absolute left-4 bottom-4 text-xs text-[#2fd89a] font-mono opacity-40">$ tech sphere</div>
      </div>
    </div>
  )
}
