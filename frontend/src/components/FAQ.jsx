import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiQuestionLine, RiAddLine, RiSubtractLine } from 'react-icons/ri'

const faqs = [
  {
    q: 'How accurate is the AI detector?',
    a: `VeritasAI was trained and tested on thousands of real and fake news articles, allowing the system to identify common patterns associated with misleading or reliable reporting in real time.`,
  },
  {
    q: 'Does the detector support URL inputs?',
    a: `Yes. VeritasAI can analyze publicly accessible news article URLs. If automatic extraction is unavailable for a website, you can paste the article text directly for analysis.`,
  },
  {
    q: 'Is my text data stored or logged?',
    a: `No. Your submitted content is processed only for analysis and is not permanently stored or shared.`,
  },
  {
    q: 'How does the AI detect misinformation?',
    a: `The AI analyzes writing patterns, language signals, emotional tone, and contextual cues commonly associated with reliable or misleading news content.`,
  },
  {
    q: 'Can satire or parody articles be detected?',
    a: `Satirical or parody articles can sometimes resemble misleading news due to exaggerated language and dramatic tone. As with any AI system, occasional false positives are possible.`,
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`glass rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-cyan-500/25' : 'border-white/5 hover:border-cyan-500/15'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className={`font-medium text-sm md:text-base transition-colors duration-300 ${
          open ? 'text-white' : 'text-slate-300 group-hover:text-white'
        }`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            open
              ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
              : 'bg-white/5 border border-white/10 text-slate-500'
          }`}
        >
          <RiAddLine size={14} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent mb-4" />
              <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 overflow-hidden">
      <div className="orb" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
        top: '10%', right: '-100px', position: 'absolute', borderRadius: '50%',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-cyan-500/20">
            <RiQuestionLine className="text-cyan-400 text-sm" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
              FAQ
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400">
            Everything you need to know about how VeritasAI works.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}