import Hero from './components/Hero'
import TopBar from './components/TopBar'
import About from './components/About'

function App() {
  return (
    <div className="min-h-screen bg-[#071010] text-white">
      <TopBar />
      <Hero />
      <About />
    </div>
  )
}

export default App
