import { motion } from 'framer-motion'
import {
  RiInformationLine, RiSettings4Line, RiFlowChart,
  RiBrainLine, RiShieldCheckLine, RiBarChartLine,
  RiSearchEyeLine, RiLinkM, RiCheckLine,
} from 'react-icons/ri'

const features = [
  { icon: RiBrainLine, label: 'AI Analysis', desc: 'Analyzes news content in real time' },
  { icon: RiShieldCheckLine, label: 'Credibility Score', desc: 'Multi-factor scoring system' },
  { icon: RiBarChartLine, label: 'Sentiment Analysis', desc: 'Emotional language detection' },
  { icon: RiSearchEyeLine, label: 'Pattern Recognition', desc: 'Identifies misleading language patterns' },
  { icon: RiLinkM, label: 'AI Explanation', desc: 'Provides contextual analysis insights' },
]

const steps = [
  {
    num: '01',
    title: 'Input Article',
    desc: 'Paste any news article or full text into the AI analysis terminal.',
    color: '#00d4ff',
  },
  {
    num: '02',
    title: 'AI Analyzes',
    desc: 'The AI system analyzes writing patterns, language signals, and contextual cues to evaluate article credibility.',
    color: '#38bdf8',
  },
  {
    num: '03',
    title: 'Get Verdict',
    desc: 'Receive a full report: prediction, confidence %, credibility score, keywords, sentiment, and AI explanation.',
    color: '#0ea5e9',
  },
]

const cards = [
  {
    icon: RiInformationLine,
    title: 'What Is This?',
    tag: 'About',
    content: (
      <p className="text-slate-400 text-sm leading-relaxed">
        VeritasAI is an <span className="text-cyan-400">AI-powered misinformation detection platform</span> designed
        to help users identify misleading, unreliable, or potentially fake news articles with greater confidence. 
        By analyzing patterns, language structures, and contextual signals within news content, the system delivers
        fast, intelligent, and real-time credibility analysis to help users make more informed decisions online.
      </p>
    ),
  },
  {
    icon: RiSettings4Line,
    title: 'Features',
    tag: 'Capabilities',
    content: (
      <ul className="space-y-2.5">
        {features.map((f) => (
          <li key={f.label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <f.icon size={13} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{f.label}</div>
              <div className="text-xs text-slate-500">{f.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: RiFlowChart,
    title: 'How It Works',
    tag: '3-Step Flow',
    content: (
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={s.num} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-xs"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}35`, color: s.color }}
            >
              {s.num}
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">{s.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/0 via-navy-900/30 to-navy-950/0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-cyan-500/20">
            <RiInformationLine className="text-cyan-400 text-sm" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
              About the Platform
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Intelligence You Can
            <span className="gradient-text"> Trust</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Designed to help users quickly evaluate the credibility of online news content using AI-powered analysis.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-5"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="glass-strong rounded-2xl p-6 border border-white/5 group hover:border-cyan-500/20 transition-all duration-500 hover:glow-cyan flex flex-col gap-5"
              whileHover={{ y: -4 }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors duration-300">
                  <card.icon size={18} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-600 mb-0.5">{card.tag}</div>
                  <div className="font-display font-semibold text-white">{card.title}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

              {/* Card body */}
              {card.content}
            </motion.div>
          ))}
        </motion.div>

        {/* Model accuracy callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass rounded-2xl p-6 border border-cyan-500/15 flex flex-wrap items-center gap-6"
        >
          <div className="flex items-center gap-2 text-cyan-400">
            <RiCheckLine className="text-xl" />
            <span className="font-display font-semibold">Trained and evaluated on thousands of verified news samples</span>
          </div>
          <div className="h-5 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              ['Accuracy', '99.26%'],
              ['F1 Score', '0.992'],
              ['Precision', '99.01%'],
              ['Recall', '99.43%'],
              ['CV Std', '±0.40%'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="text-slate-500">{k}:</span>
                <span className="font-mono font-semibold text-white">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}