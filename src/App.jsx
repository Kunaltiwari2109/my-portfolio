import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import PlugLoader from './components/PlugLoader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-backgroundPrimary overflow-x-hidden selection:bg-neonPurple selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] ${!isLoading ? 'pointer-events-none' : ''}`}
          >
            <PlugLoader onPowerOn={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
