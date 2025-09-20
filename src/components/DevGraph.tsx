import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

type DevGraphProps = {
  mode?: 'process' | 'git'
}

type Node = {
  id: number
  pos: [number, number, number]
  level: number
  parent?: number
  label?: string
}

type Edge = { from: THREE.Vector3; to: THREE.Vector3; fromIndex?: number; toIndex?: number }
type Graph = { nodes: Node[]; edges: Edge[] }

export default function DevGraph({ mode = 'process' }: DevGraphProps) {
  const groupRef = useRef<THREE.Group | null>(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // pointer-based parallax
  const pointerRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      pointerRef.current.x = nx
      pointerRef.current.y = ny
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Graph generation
  const [graph, setGraph] = useState<Graph>(() => createGraph(mode))
  useEffect(() => setGraph(createGraph(mode)), [mode])

  // Hovered node for highlight and label
  const [hovered, setHovered] = useState<number | null>(null)

  // Growth/decay progress across levels
  const [progress, setProgress] = useState(0)
  const progRef = useRef(0)
  const dirRef = useRef<1 | -1>(1)
  const tickAccum = useRef(0)
  const maxLevel = useMemo(() => (graph.nodes.length ? Math.max(...graph.nodes.map((n) => n.level)) : 0), [graph.nodes])
  useEffect(() => {
    progRef.current = 0
    setProgress(0)
    dirRef.current = 1
  }, [mode])

  // Occasional highlight
  const [highlightEdge, setHighlightEdge] = useState<number | null>(null)
  useEffect(() => {
    const id = window.setInterval(() => {
      const edgeCount = graph.edges.length
      if (edgeCount > 0) setHighlightEdge(Math.floor(Math.random() * edgeCount))
      window.setTimeout(() => setHighlightEdge(null), 1200)
    }, 5000)
    return () => window.clearInterval(id)
  }, [graph.edges.length])

  // Node instances
  const instRef = useRef<THREE.InstancedMesh | null>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geom = useMemo(() => new THREE.SphereGeometry(0.08, 16, 16), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#10b981', emissive: '#062b25', emissiveIntensity: 0.38, roughness: 0.6, metalness: 0.15 }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      const amt = prefersReduced ? 0 : 0.06
      const px = pointerRef.current.x * amt
      const py = -pointerRef.current.y * amt
      groupRef.current.position.lerp(new THREE.Vector3(px, py, 0), 0.05)
      if (!prefersReduced) groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.02
    }
    if (!instRef.current) return
    const m = instRef.current
    // update global progress
    const spd = prefersReduced ? 0.18 : 0.6
    const dt = 1 / 60 // stable step for consistent feel
    tickAccum.current += dt
    progRef.current += dirRef.current * spd * dt
    if (progRef.current > maxLevel + 0.8) {
      dirRef.current = -1
    } else if (progRef.current < -0.4) {
      dirRef.current = 1
      // slight regeneration for variety
      if (!prefersReduced) setGraph(createGraph(mode))
    }
    // throttle React state updates (~30fps)
    if (tickAccum.current >= (prefersReduced ? 0.1 : 0.033)) {
      tickAccum.current = 0
      setProgress(progRef.current)
    }

    for (let i = 0; i < graph.nodes.length; i++) {
      const n = graph.nodes[i]
      // subtle breathing on top of level-based visibility
      const breathe = prefersReduced ? 1 : 0.98 + Math.sin(t * 0.7 + i * 0.35) * 0.06
      dummy.position.set(n.pos[0], n.pos[1], n.pos[2])
      // level-based visibility (growth/decay along levels)
      const levelVis = THREE.MathUtils.clamp(progRef.current - n.level + 1, 0, 1)
      const base = sizeForLevel(n.level) * 1.25
      const pulse = prefersReduced ? 1 : 1 + Math.sin(t * 1.1 + i) * 0.06
      const hoverBoost = hovered === i ? 1.18 : 1
      const s = base * pulse * hoverBoost * breathe * levelVis
      dummy.scale.set(s, s, s)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef} scale={[1.25, 1.25, 1.25]}>
      {/* Edges with curves and data flow */}
      {graph.edges.map((e, i) => {
        // edge fades in when both nodes visible
        const fromIdx = e.fromIndex
        const toIdx = e.toIndex
        const visFrom = typeof fromIdx === 'number' ? THREE.MathUtils.clamp(progress - graph.nodes[fromIdx].level + 1, 0, 1) : 1
        const visTo = typeof toIdx === 'number' ? THREE.MathUtils.clamp(progress - graph.nodes[toIdx].level + 1, 0, 1) : 1
        const alpha = Math.min(visFrom, visTo)
        if (alpha <= 0.01) return null
        return (
        <EdgeCurve
          key={i}
          from={e.from}
          to={e.to}
          highlight={i === highlightEdge || hovered === fromIdx || hovered === toIdx}
          curved={mode !== 'git'}
          alpha={alpha}
        />
      )})}
      {/* Nodes */}
      <instancedMesh
        ref={instRef}
        args={[geom, mat, graph.nodes.length]}
        castShadow
        onPointerMove={(e) => {
          if (typeof e.instanceId === 'number') setHovered(e.instanceId)
        }}
        onPointerOut={() => setHovered(null)}
      />

      {/* Hover label */}
      {hovered !== null && graph.nodes[hovered] && (
        <Html
          position={[graph.nodes[hovered].pos[0], graph.nodes[hovered].pos[1] + 0.18, graph.nodes[hovered].pos[2]]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(183,245,217,0.92)',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(16,185,129,0.2)',
            padding: '2px 6px',
            borderRadius: '4px',
            backdropFilter: 'blur(3px)'
          }}>
            {graph.nodes[hovered].label ?? `node-${graph.nodes[hovered].id}`}
          </div>
        </Html>
      )}
    </group>
  )
}

function createGraph(mode: 'process' | 'git'): Graph {
  if (mode === 'git') {
    const lanes = [-0.6, 0, 0.6]
    const nodes: Node[] = []
    let id = 0
    for (let lane = 0; lane < lanes.length; lane++) {
      for (let i = 0; i < 6; i++) {
        const z = -0.12 * lane + (Math.random() - 0.5) * 0.04
        nodes.push({ id: id++, pos: [i * 0.32 - 1.0, lanes[lane] * 0.8, z], level: lane, label: `branch-${lane}:${i}` })
      }
    }
    // Parents: forward links within lanes + a couple merges
    const edges: Edge[] = []
    for (let lane = 0; lane < lanes.length; lane++) {
      for (let i = 1; i < 6; i++) {
        const a = nodes[lane * 6 + (i - 1)]
        const b = nodes[lane * 6 + i]
        edges.push({ from: v(a.pos), to: v(b.pos), fromIndex: a.id, toIndex: b.id })
      }
    }
    // merges
    edges.push({ from: v(nodes[0 * 6 + 3].pos), to: v(nodes[1 * 6 + 4].pos), fromIndex: nodes[0 * 6 + 3].id, toIndex: nodes[1 * 6 + 4].id })
    edges.push({ from: v(nodes[2 * 6 + 2].pos), to: v(nodes[1 * 6 + 3].pos), fromIndex: nodes[2 * 6 + 2].id, toIndex: nodes[1 * 6 + 3].id })
    return { nodes, edges }
  }
  // Process tree: levels with branching
  const levels = 4
  const countAt = [1, 3, 5, 7]
  const spreadX = [0, 0.8, 1.3, 1.8]
  const nodes: Node[] = []
  let id = 0
  for (let lvl = 0; lvl < levels; lvl++) {
    const count = countAt[lvl]
    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * (spreadX[lvl] / Math.max(1, count - 1))
      const y = -0.35 + lvl * 0.35
      const z = -0.08 * lvl + (Math.random() - 0.5) * 0.06
      nodes.push({ id: id++, pos: [x, y, z], level: lvl, label: `proc-${lvl}:${i}` })
    }
  }
  const edges: Edge[] = []
  for (let lvl = 1; lvl < levels; lvl++) {
    const prevCount = countAt[lvl - 1]
    const count = countAt[lvl]
    const start = countAt.slice(0, lvl).reduce((a, b) => a + b, 0)
    const prevStart = countAt.slice(0, lvl - 1).reduce((a, b) => a + b, 0)
    for (let i = 0; i < count; i++) {
      const parentIndex = Math.round((i / Math.max(1, count - 1)) * Math.max(0, prevCount - 1))
      const child = nodes[start + i]
      const parent = nodes[prevStart + parentIndex]
      edges.push({ from: v(parent.pos), to: v(child.pos), fromIndex: parent.id, toIndex: child.id })
    }
  }
  return { nodes, edges }
}

function EdgeCurve({ from, to, highlight, curved, alpha = 1 }: { from: THREE.Vector3; to: THREE.Vector3; highlight?: boolean; curved?: boolean; alpha?: number }) {
  const curve = useMemo<{ points: Float32Array; getPointAt: (t: number) => THREE.Vector3 }>(() => {
    if (!curved) {
      const pts = new Float32Array([from.x, from.y, from.z, to.x, to.y, to.z])
      return { points: pts, getPointAt: (t: number) => from.clone().lerp(to, t) }
    }
    const mid = from.clone().add(to).multiplyScalar(0.5)
    const dir = to.clone().sub(from)
    // get a sideways normal and a slight z bend for true 3D
    const normal = new THREE.Vector3(-dir.y, dir.x, 0).normalize()
    const amp = 0.18 + Math.random() * 0.12
    const control = mid.clone().add(normal.multiplyScalar(amp))
    control.z += (Math.random() - 0.5) * amp * 0.3
    const q = new THREE.QuadraticBezierCurve3(from.clone(), control, to.clone())
    const pts = q.getPoints(18)
    const arr = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => arr.set([p.x, p.y, p.z], i * 3))
    return { points: arr, getPointAt: (t: number) => q.getPoint(t) }
  }, [from, to, curved])

  const speed = useMemo(() => 0.25 + Math.random() * 0.35, [])
  const offset = useMemo(() => Math.random(), [])
  const dotRef = useRef<THREE.Mesh | null>(null)
  useFrame(({ clock }) => {
    if (!dotRef.current) return
    const t = (clock.getElapsedTime() * speed + offset) % 1
    const p = curve.getPointAt(t)
    dotRef.current.position.set(p.x, p.y, p.z)
  })

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[curve.points, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={highlight ? '#14b8a6' : '#0f766e'} transparent opacity={(highlight ? 0.6 : 0.3) * alpha} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial color="#22c55e" emissive="#083c34" emissiveIntensity={(highlight ? 0.9 : 0.6) * (0.5 + alpha * 0.5)} />
      </mesh>
    </group>
  )
}

function sizeForLevel(level: number) {
  return 0.10 - level * 0.012
}

function v(p: [number, number, number]) {
  return new THREE.Vector3(p[0], p[1], p[2])
}
