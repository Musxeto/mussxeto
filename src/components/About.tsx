// React import not required with JSX transform
import TechGrid from './TechGrid'

export default function About() {
  return (
    <section id="about" className="relative w-full py-16 bg-[linear-gradient(180deg,rgba(3,6,6,0.6),rgba(2,4,4,0.8))]">
      {/* subtle ghost grid background instead of HackerRain for visual variety */}
  <div className="absolute inset-0 bg-[url('/grid-ghost.svg')] opacity-6 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-[#b7f5d9] font-mono">
          <h2 className="text-2xl font-bold mb-2">About / What I do</h2>
          <p className="text-sm text-gray-300 mb-6">I build software end-to-end — low-level systems to web and AI. Below are the tools I ship with.</p>
        </div>

        <div className="mt-8">
          <TechGrid radius={3.2} speed={0.14} />
        </div>

        <div className="mt-8 max-w-3xl mx-auto text-[#b7f5d9] font-mono text-sm grid gap-4">
          <div>
            <div className="font-semibold">🛠 Core Development</div>
            <div className="text-xs text-gray-300 mt-1">Python · JavaScript · TypeScript · C/C++ · C# · Bash · React · Django · FastAPI · Tailwind</div>
          </div>

          <div>
            <div className="font-semibold">🤖 AI & Data</div>
            <div className="text-xs text-gray-300 mt-1">TensorFlow · Keras · OpenCV · NumPy · Pandas · Data pipelines</div>
          </div>

          <div>
            <div className="font-semibold">🔧 Tools & Workflow</div>
            <div className="text-xs text-gray-300 mt-1">Git · Linux · Docker · Agile · CLI-first</div>
          </div>
        </div>
      </div>
    </section>
  )
}
