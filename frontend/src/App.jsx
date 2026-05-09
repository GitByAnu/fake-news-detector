import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Detector from './components/Detector'
import About from './components/About'
import Statistics from './components/Statistics'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 relative">
      {/* Global background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(14,165,233,0.08),transparent)] pointer-events-none" />

      <Navbar />
      <main>
        <Hero />
        <Detector />
        <About />
        <Statistics />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}