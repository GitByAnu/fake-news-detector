import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldCheckLine, RiMenuLine, RiCloseLine } from 'react-icons/ri'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Detector', href: '#detector' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (label, href) => {
    setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-cyan-500/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleNav('Home', '#home')}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-cyan-strong group-hover:scale-110 transition-transform duration-300">
              <RiShieldCheckLine className="text-white text-lg" />
            </div>
            <div className="absolute -inset-0.5 rounded-lg bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display font-700 text-white text-lg tracking-tight">
              Veritas<span className="gradient-text">AI</span>
            </span>
          </div>
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <motion.button
                onClick={() => handleNav(link.label, link.href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active === link.label
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {active === link.label && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => handleNav('Detector', '#detector')}
            className="btn-primary text-sm py-2.5 px-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Now
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          className="md:hidden text-white p-2 rounded-lg glass"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <ul className="py-3 px-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.label, link.href)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active === link.label
                        ? 'bg-cyan-500/15 text-cyan-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5">
                <button
                  onClick={() => handleNav('Detector', '#detector')}
                  className="btn-primary w-full text-sm py-2.5"
                >
                  Analyze Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}