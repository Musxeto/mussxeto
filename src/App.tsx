import Hero from './components/Hero'
import TopBar from './components/TopBar'

function App() {
  return (
    <div className="min-h-screen bg-[#071010] text-white">
      <TopBar />
      <Hero />
      <main id="projects" className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <p className="text-sm text-gray-300">Project cards will go here.</p>
      </main>
    </div>
  )
}

export default App
