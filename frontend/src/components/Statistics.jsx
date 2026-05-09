import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { RiBarChartLine, RiShieldCheckLine, RiBrainLine, RiTimeLine } from 'react-icons/ri'

const stats = [
  {
    icon: RiBarChartLine,
    value: 44680,
    suffix: '+',
    label: 'Training Articles',
    sub: 'Fake & real combined',
    color: '#00d4ff',
    decimals: 0,
  },
  {
    icon: RiShieldCheckLine,
    value: 99.26,
    suffix: '%',
    label: 'Detection Accuracy',
    sub: 'On 8,936 test articles',
    color: '#22d3ee',
    decimals: 2,
  },
  {
    icon: RiBrainLine,
    value: 50000,
    suffix: '+',
    label: 'Smart Content Analysis',
    sub: 'Context-aware article evaluation',
    color: '#38bdf8',
    decimals: 0,
  },
  {
    icon: RiTimeLine,
    value: 0.4,
    suffix: 's',
    label: 'Avg. Analysis Time',
    sub: 'Real-time predictions',
    color: '#0ea5e9',
    decimals: 1,
  },
]

export default function Statistics() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Glow line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Model <span className="gradient-text">Performance</span>
          </h2>
          <p className="text-slate-500 text-sm">Performance statistics based on model evaluation results.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-strong rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-400 text-center group"
            >
              <div
                className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}35`,
                  boxShadow: `0 0 16px ${s.color}20`,
                }}
              >
                <s.icon size={20} style={{ color: s.color }} />
              </div>

              <div
                className="font-display font-bold text-3xl md:text-4xl mb-1"
                style={{ color: s.color }}
              >
                {inView ? (
                  <CountUp
                    end={s.value}
                    duration={2.2}
                    decimals={s.decimals}
                    separator=","
                    suffix={s.suffix}
                    delay={i * 0.1}
                  />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <div className="text-white text-sm font-semibold mb-1">{s.label}</div>
              <div className="text-slate-600 text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}