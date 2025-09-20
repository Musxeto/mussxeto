import { useEffect, useRef } from 'react'

type HackerRainProps = {
  color?: string
  opacity?: number
  fontSize?: number
  speed?: number
  trailLength?: number
  clearStrength?: number
  headGlow?: boolean
  className?: string
}

export default function HackerRain({
  color = '#10b981',
  opacity = 0.12,
  fontSize = 14,
  speed = 1,
  trailLength = 8,
  clearStrength = 0.18,
  headGlow = true,
  className = ''
}: HackerRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = (canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.parentElement?.clientHeight || window.innerHeight)
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

  const chars = ['0', '1']
    const columnWidth = fontSize
    const columns = Math.floor(width / columnWidth)
  const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height / fontSize))

    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    let lastTime = performance.now()
    const draw = (time: number) => {
      const delta = Math.min(33, time - lastTime)
      lastTime = time
      // stronger fade so old characters go away quickly (configurable)
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.6, Math.max(0.06, clearStrength * (prefersReduced ? 1.2 : 1)))})`
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < columns; i++) {
        const x = i * columnWidth
        const yHead = drops[i] * fontSize

        // draw bright head
        ctx.fillStyle = color
        ctx.globalAlpha = Math.min(1, opacity * 1.4)
        if (headGlow && !prefersReduced) {
          ctx.shadowColor = color
          ctx.shadowBlur = 8
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fillText(chars[(Math.random() * 2) | 0], x, yHead)

        // draw trailing digits with decreasing alpha
        const tl = prefersReduced ? Math.min(2, trailLength) : trailLength
        ctx.shadowBlur = 0
        for (let t = 1; t <= tl; t++) {
          const y = yHead - t * fontSize
          if (y < -fontSize) break
          const a = opacity * (1 - t / (tl + 1))
          ctx.globalAlpha = a
          ctx.fillStyle = color
          ctx.fillText(chars[(Math.random() * 2) | 0], x, y)
        }

        // advance the head
        const step = prefersReduced ? 0.6 : (1 + Math.random() * 0.8) * speed * (delta / 16)
        drops[i] += step
        if (yHead > height + tl * fontSize && Math.random() > 0.92) {
          // restart above the top for a seamless entry
          drops[i] = -Math.floor(Math.random() * tl)
        }
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    const onResize = () => {
      width = (canvas.parentElement?.clientWidth || window.innerWidth)
      height = (canvas.parentElement?.clientHeight || window.innerHeight)
      const dpr2 = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr2)
      canvas.height = Math.floor(height * dpr2)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr2, dpr2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [color, opacity, fontSize, speed, trailLength, clearStrength, headGlow])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />
}
