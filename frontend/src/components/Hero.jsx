import { motion } from 'framer-motion'
import { RiShieldCheckLine, RiArrowRightLine, RiBrainLine, RiBarChartLine } from 'react-icons/ri'

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

const statCards = [
  { icon: RiShieldCheckLine, value: '99.2%', label: 'Accuracy', color: 'cyan' },
  { icon: RiBrainLine, value: '44K+', label: 'Articles Trained', color: 'blue' },
  { icon: RiBarChartLine, value: '<0.5s', label: 'Analysis Time', color: 'sky' },
]

export default function Hero() {
  const scrollToDetector = () => {
    document.querySelector('#detector')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#03050f_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-cyan-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
              AI-Powered Misinformation Detection
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl leading-none tracking-tight mb-6"
          >
            <span className="text-white">Truth Has a</span>
            <br />
            <span className="gradient-text text-glow">New Guardian.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            VeritasAI helps you identify misleading or unreliable news in seconds. Paste any article and get an instant credibility analysis powered by AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <motion.button
              onClick={scrollToDetector}
              className="btn-primary flex items-center gap-2 text-base px-7 py-3.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Analyzing
              <RiArrowRightLine className="text-lg" />
            </motion.button>
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-ghost text-base"
              whileHover={{ scale: 1.03 }}
            >
              How It Works
            </motion.a>
          </motion.div>

          {/* Floating dashboard mockup */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="w-full max-w-3xl relative"
          >
            <div className="glass-strong glow-cyan rounded-2xl p-1 relative overflow-hidden">
              {/* Holographic shimmer edge */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

              {/* Mock UI panel */}
              <div className="bg-navy-900/80 rounded-xl p-6 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="glass px-4 py-1.5 rounded-full text-xs text-slate-400 font-mono border border-white/5">
                    veritas-ai.analyze
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-lg glass flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Content grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Input area */}
                  <div className="md:col-span-2 glass rounded-xl p-4 border border-white/5">
                    <div className="text-xs text-slate-500 font-mono mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Article Input
                    </div>
                    <div className="space-y-2">
                      {[90, 75, 85, 60, 70].map((w, i) => (
                        <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          />
                        </div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-4 flex items-center gap-2"
                    >
                      <div className="flex-1 h-8 glass rounded-lg border border-cyan-500/20 flex items-center px-3">
                        <span className="text-xs text-slate-500 font-mono">Analyzing content...</span>
                        <span className="cursor-blink text-cyan-400 ml-1 text-xs">|</span>
                      </div>
                      <div className="h-8 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center">
                        <span className="text-xs font-bold text-navy-950">Analyze</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Result panel */}
                  <div className="glass rounded-xl p-4 border border-cyan-500/15 flex flex-col gap-3">
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      AI Verdict
                    </div>

                    <div className="text-center py-2">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.4, type: 'spring' }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/15 border border-cyan-500/30 glow-cyan mb-2"
                      >
                        <RiShieldCheckLine className="text-cyan-400 text-2xl" />
                      </motion.div>
                      <div className="badge-real text-xs mx-auto w-fit">VERIFIED REAL</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Confidence</span>
                        <span className="text-cyan-400 font-mono font-semibold">96.4%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '96.4%' }}
                          transition={{ delay: 1.6, duration: 1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Credibility</span>
                        <span className="text-cyan-400 font-mono font-semibold">88/100</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '88%' }}
                          transition={{ delay: 1.8, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom stat chips */}
                <div className="flex gap-3 mt-4">
                  {statCards.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="flex-1 glass rounded-xl p-3 border border-white/5 text-center"
                    >
                      <div className="text-lg font-display font-bold gradient-text">{s.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow ring underneath */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-cyan-500/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}