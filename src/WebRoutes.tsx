import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import AllProjectsPage from './pages/AllProjects'
import NotFound from './pages/NotFound'

function WebRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#071010] text-white">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          {/* catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default WebRoutes
