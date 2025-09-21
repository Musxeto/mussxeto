import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import AllProjectsPage from './pages/AllProjects'
import NotFound from './pages/NotFound'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import FooterEOF from './components/FooterEOF'
import ScrollToTop from './components/ScrollToTop'

function WebRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#071010] text-white">
        <ScrollToTop />
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FooterEOF />
      </div>
    </BrowserRouter>
  )
}

export default WebRoutes
