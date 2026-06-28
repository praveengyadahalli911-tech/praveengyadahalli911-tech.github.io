import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Social from './sections/Social'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary dark:bg-gray-100">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Experience />
        <Social />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
