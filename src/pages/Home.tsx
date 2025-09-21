import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import ExperienceTimeline from '../components/ExperienceTimeline'

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
  <ExperienceTimeline title="Experience" intro="A chronological overview of my professional roles and contributions." />
    </div>
  )
}
