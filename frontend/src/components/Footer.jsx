import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiGithubLine, RiMailLine, RiHeartFill } from 'react-icons/ri'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Detector', href: '#detector' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

const scrollTo = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-[1.3fr_0.8fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-cyan">
                <RiShieldCheckLine className="text-white text-sm" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Veritas<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Real-time AI-powered news credibility analysis.
            </p>
            <div className="flex gap-3 mt-5">
              <motion.a
                href="https://github.com/GitByAnu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:border-cyan-500/30 border border-transparent transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiGithubLine size={17} />
              </motion.a>
              <motion.a
                href="mailto:anupama24@gmail.com"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:border-cyan-500/30 border border-transparent transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiMailLine size={17} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-mono text-slate-600 tracking-widest uppercase mb-5">
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-slate-700 group-hover:bg-cyan-500 group-hover:w-5 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
  <div className="text-xs font-mono text-slate-600 tracking-widest uppercase mb-5">
    Our Mission
  </div>

  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
    Helping users navigate misinformation through fast, intelligent, and accessible AI-powered news analysis.
  </p>
</div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="font-mono">
            © {new Date().getFullYear()} VeritasAI.
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Model active</span>
          </div>
        </div>
      </div>
    </footer>
  )
}