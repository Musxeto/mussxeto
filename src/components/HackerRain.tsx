import React, { useEffect, useRef } from 'react'

type HackerRainProps = {
  color?: string
  opacity?: number
  fontSize?: number
  speed?: number
  className?: string
}

// Subtle matrix-like code rain; respects prefers-reduced-motion
export default function HackerRain({
  color = '#10b981',
  opacity = 0.08,
  fontSize = 14,
  speed = 1,
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

    const chars = '01#$%<>/\\=+*'.split('')
    const columnWidth = fontSize
    const columns = Math.floor(width / columnWidth)
    const drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * height))

    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    let lastTime = performance.now()
    const draw = (time: number) => {
      const delta = Math.min(33, time - lastTime)
      lastTime = time
      // subtle fade to create trails
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.04, 0.08 - opacity * 0.2)})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * columnWidth
        const y = drops[i] * fontSize
        ctx.fillText(text, x, y)
        const step = prefersReduced ? 0 : (1 + Math.random() * 0.8) * speed * (delta / 16)
        drops[i] += step
        if (y > height && Math.random() > 0.975) drops[i] = 0
      }
      ctx.globalAlpha = 1
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
  }, [color, opacity, fontSize, speed])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />
}
