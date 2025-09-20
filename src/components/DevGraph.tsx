import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

type DevGraphProps = {
  mode?: 'process' | 'git'
}

type Node = {
  id: number
  pos: [number, number, number]
  level: number
  parent?: number
}

export default function DevGraph({ mode = 'process' }: DevGraphProps) {
  const nodes = useMemo<Node[]>(() => {
    if (mode === 'git') {
      // Simple git-like branches (3 lanes with merges)
      const lanes = [-0.6, 0, 0.6]
      const ns: Node[] = []
      let id = 0
      for (let lane = 0; lane < lanes.length; lane++) {
        for (let i = 0; i < 6; i++) {
          ns.push({ id: id++, pos: [i * 0.35 - 1.0, lanes[lane] * 0.8, 0], level: lane })
        }
      }
      // Connect roughly forward in each lane + a couple merges
      return ns
    }
    // Process tree: root -> 3 -> 6 -> 12
    const ns: Node[] = []
    let id = 0
    const levels = 4
    const spreadX = [0, 0.9, 1.4, 1.8]
    const countAt = [1, 3, 6, 10]
    for (let lvl = 0; lvl < levels; lvl++) {
      const count = countAt[lvl]
      for (let i = 0; i < count; i++) {
        const x = (i - (count - 1) / 2) * (spreadX[lvl] / Math.max(1, count - 1))
        const y = -0.3 + lvl * 0.35
        ns.push({ id: id++, pos: [x, y, 0], level: lvl })
      }
    }
    // assign parents: each node in lvl>0 connects to nearest parent in lvl-1
    for (let lvl = 1; lvl < levels; lvl++) {
      const prevCount = countAt[lvl - 1]
      const count = countAt[lvl]
      const start = countAt.slice(0, lvl).reduce((a, b) => a + b, 0)
      const prevStart = countAt.slice(0, lvl - 1).reduce((a, b) => a + b, 0)
      for (let i = 0; i < count; i++) {
        const node = nodesFrom(ns, start + i)
        // map proportionally to prev level index
        const parentIndex = Math.round((i / Math.max(1, count - 1)) * Math.max(0, prevCount - 1))
        node.parent = prevStart + parentIndex
      }
    }
    return ns
  }, [mode])

  const edges = useMemo(() => {
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = []
    for (const n of nodes) {
      if (typeof n.parent === 'number') {
        const p = nodes.find((x) => x.id === n.parent)
        if (p) {
          pairs.push(newLine(p.pos, n.pos))
        }
      }
    }
    return pairs
  }, [nodes])

  const instRef = useRef<THREE.InstancedMesh | null>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geom = useMemo(() => new THREE.SphereGeometry(0.06, 12, 12), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#10b981', emissive: '#062b25', emissiveIntensity: 0.35, roughness: 0.6, metalness: 0.15 }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!instRef.current) return
    const m = instRef.current
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      dummy.position.set(n.pos[0], n.pos[1], n.pos[2])
      const s = 1 + Math.sin(t * 1.5 + i) * 0.06
      const base = sizeForLevel(n.level)
      dummy.scale.set(base * s, base * s, base * s)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  const linePositions = useMemo(() => {
    if (edges.length === 0) return new Float32Array([])
    const arr = new Float32Array(edges.length * 2 * 3)
    edges.forEach((pair, i) => {
      arr.set([pair[0].x, pair[0].y, pair[0].z, pair[1].x, pair[1].y, pair[1].z], i * 6)
    })
    return arr
  }, [edges])

  return (
    <group>
      {/* Edges */}
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#0f766e" linewidth={1} transparent opacity={0.35} />
        </lineSegments>
      )}
      {/* Nodes */}
      <instancedMesh ref={instRef} args={[geom, mat, nodes.length]} castShadow />
    </group>
  )
}

function nodesFrom(ns: Node[], index: number) {
  return ns[index]
}

function newLine(a: [number, number, number], b: [number, number, number]): [THREE.Vector3, THREE.Vector3] {
  return [new THREE.Vector3(a[0], a[1], a[2]), new THREE.Vector3(b[0], b[1], b[2])]
}

function sizeForLevel(level: number) {
  return 0.10 - level * 0.012
}
