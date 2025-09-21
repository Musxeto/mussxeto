import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const nav = useNavigate()

  useEffect(() => {
    // optional auto-redirect after 4s
    const t = setTimeout(() => nav('/'), 4000)
    return () => clearTimeout(t)
  }, [nav])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071010] text-[#b7f5d9]">
      <div className="max-w-xl text-center px-6 py-8 bg-[#0a1313] border border-[#16b88555] rounded-lg">
        <div className="text-6xl font-mono text-[#ff5f56]">404</div>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-gray-300">Looks like that route doesn't exist. Redirecting you home in a few seconds.</p>
        <div className="mt-4">
          <button onClick={() => nav('/')} className="px-4 py-2 rounded bg-[#16b885] text-black font-medium">Take me home</button>
        </div>
      </div>
    </div>
  )
}
