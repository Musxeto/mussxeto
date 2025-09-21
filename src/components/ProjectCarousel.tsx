import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCarousel({
  images,
  heightClass = 'h-40',
  rounded = false,
  auto = true,
  interval = 3000,
  onClick,
}: {
  images: string[]
  heightClass?: string
  rounded?: boolean
  auto?: boolean
  interval?: number
  onClick?: () => void
}) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [hover, setHover] = useState(false)

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIdx((i) => (i + 1) % images.length)
  }
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIdx((i) => (i - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (!auto || images.length <= 1) return
    if (hover) return
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, interval) as unknown as number
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [auto, images.length, interval, hover])

  return (
    <div
      className={`${heightClass} w-full relative overflow-hidden ${rounded ? 'rounded-lg' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Open project details' : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt="Project image"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0.0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 grid place-items-center"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 grid place-items-center"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setIdx(i)
                }}
                className={`w-1.5 h-1.5 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
