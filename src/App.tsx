import Hero from './components/Hero'
import TopBar from './components/TopBar'
import About from './components/About'
import Projects from './components/Projects'

function App() {
  return (
    <div className="min-h-screen bg-[#071010] text-white">
      <TopBar />
      <Hero />
      <About />
  <Projects />
    </div>
  )
}

export default App
