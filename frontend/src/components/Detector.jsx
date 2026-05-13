import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import {
  RiSearchEyeLine, RiLink, RiFileTextLine, RiShieldCheckLine,
  RiAlertLine, RiBrainLine, RiBarChartGroupedLine, RiCloseLine,
  RiCheckLine, RiLoader4Line, RiSparklingLine,
} from 'react-icons/ri'

/* ─── Circular confidence gauge ─── */
function ConfidenceRing({ value, color }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute inset-0 ring-rotate" width="112" height="112" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <motion.circle
          cx="56" cy="56" r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          transform="rotate(-90 56 56)"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display font-bold text-2xl"
          style={{ color }}
        >
          {value.toFixed(1)}%
        </motion.div>
        <div className="text-xs text-slate-500">confidence</div>
      </div>
    </div>
  )
}

/* ─── Score bar ─── */
function ScoreBar({ label, value, color, icon: Icon }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-sm text-slate-400">
          <Icon size={13} />
          <span>{label}</span>
        </div>
        <span className="text-sm font-mono font-semibold" style={{ color }}>
          {value}/100
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

/* ─── Scanning animation ─── */
function ScanAnimation() {
  return (
    <div className="relative h-48 glass rounded-xl overflow-hidden flex items-center justify-center border border-cyan-500/20">
      <div className="scan-line" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:100%_8px]" />
      <div className="flex flex-col items-center gap-4 z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-2 border-t-cyan-400 border-r-cyan-400/30 border-b-transparent border-l-transparent"
        />
        <div className="text-center">
          <div className="text-cyan-400 font-mono text-sm font-semibold">
            AI Processing
          </div>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-slate-500 text-xs mt-1 font-mono"
          >
            Analyzing patterns...
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─── Result Panel ─── */
function ResultPanel({ result }) {
  const isFake = result.label === 'FAKE'
  const accentColor = isFake ? '#ef4444' : '#00d4ff'
  const bgGlow = isFake
    ? 'rgba(239,68,68,0.08)'
    : 'rgba(0,212,255,0.06)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(10,17,40,0.95), ${bgGlow})`,
        borderColor: `${accentColor}30`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 0 40px ${accentColor}15`,
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b flex items-center justify-between"
        style={{ borderColor: `${accentColor}20` }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 20px ${accentColor}30`,
            }}
          >
            {isFake
              ? <RiAlertLine size={22} style={{ color: accentColor }} />
              : <RiShieldCheckLine size={22} style={{ color: accentColor }} />
            }
          </motion.div>
          <div>
            <div className="text-xs text-slate-500 font-mono tracking-widest uppercase mb-0.5">
              AI Verdict
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold text-2xl"
              style={{ color: accentColor }}
            >
              {isFake ? '⚠ FAKE NEWS' : '✓ REAL NEWS'}
            </motion.div>
          </div>
        </div>
        <ConfidenceRing value={result.confidence} color={accentColor} />
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Scores */}
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2">
              <RiBarChartGroupedLine size={13} />
              CREDIBILITY METRICS
            </div>
            <div className="space-y-3">
              <ScoreBar
                label="Credibility Score"
                value={result.credibility_score}
                color={accentColor}
                icon={RiShieldCheckLine}
              />
              <ScoreBar
                label="Source Reliability"
                value={result.source_credibility.score}
                color={isFake ? '#f97316' : '#22d3ee'}
                icon={RiLink}
              />
              <ScoreBar
                label="Writing Objectivity"
                value={Math.max(5, 100 - result.sentiment.emotional_score)}
                color={isFake ? '#f59e0b' : '#38bdf8'}
                icon={RiFileTextLine}
              />
            </div>
          </div>

          {/* Sentiment */}
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2">
              <RiBrainLine size={13} />
              SENTIMENT ANALYSIS
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{result.sentiment.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Emotional intensity: {result.sentiment.emotional_score}%
                </div>
              </div>
              <div
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}35`,
                  color: accentColor,
                }}
              >
                {result.word_count} words
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* AI Explanation */}
          <div
            className="rounded-xl p-4 border"
            style={{
              background: `${accentColor}08`,
              borderColor: `${accentColor}25`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <RiSparklingLine size={14} style={{ color: accentColor }} />
              <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                AI Explanation
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {result.explanation}
            </p>
          </div>

          {/* Suspicious keywords */}
          {result.suspicious_keywords?.length > 0 && (
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2">
                <RiAlertLine size={13} />
                SUSPICIOUS PATTERNS
              </div>
              <div className="flex flex-wrap gap-2">
                {result.suspicious_keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs px-2.5 py-1 rounded-lg font-mono"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#fca5a5',
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emotional language detected */}
          {result.emotional_language?.length > 0 ? (
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="text-xs font-mono text-slate-500 mb-3 flex items-center gap-2">
                <RiAlertLine size={13} className="text-orange-400" />
                EMOTIONAL LANGUAGE
              </div>
              <div className="flex flex-wrap gap-2">
                {result.emotional_language.slice(0, 6).map((phrase) => (
                  <span
                    key={phrase}
                    className="text-xs px-2.5 py-1 rounded-lg font-mono"
                    style={{
                      background: 'rgba(249,115,22,0.1)',
                      border: '1px solid rgba(249,115,22,0.3)',
                      color: '#fdba74',
                    }}
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <RiCheckLine />
                <span>No manipulative language detected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Detector Section ─── */
export default function Detector() {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState('text')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const textareaRef = useRef()

  const handleAnalyze = async () => {
    const content = mode === 'text' ? text : url
    if (!content.trim()) {
      setError('Please enter some text or a URL to analyze.')
      return
    }
    if (mode === 'text' && content.trim().split(' ').length < 15) {
      setError('Please provide more content (at least 15 words) for accurate analysis.')
      return
    }

    setError('')
    setResult(null)
    setLoading(true)

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/analyze`, { text: content })
      setResult(data)
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Please wait 30 seconds and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setText('')
    setUrl('')
    setResult(null)
    setError('')
  }

  return (
    <section id="detector" className="relative py-28 overflow-hidden">
      <div className="orb" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        top: '20%', left: '-150px', position: 'absolute', borderRadius: '50%',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5 border border-cyan-500/20">
            <RiSearchEyeLine className="text-cyan-400 text-sm" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
              REAL-TIME NEWS ANALYSIS
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Detect Misinformation
            <span className="gradient-text"> Instantly</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste any news article below and receive an instant analysis of whether the content may be reliable, misleading, or potentially fake.
          </p>
        </motion.div>

        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-strong rounded-2xl p-1 mb-6"
        >
          <div className="bg-navy-900/80 rounded-xl p-6">
            {/* Mode tabs */}
            <div className="flex gap-2 mb-5">
              {[
                { id: 'text', icon: RiFileTextLine, label: 'Paste Article' },
                { id: 'url', icon: RiLink, label: 'Enter URL' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => { setMode(tab.id); setError(''); setResult(null) }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    mode === tab.id
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-500 hover:text-slate-300 border border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <AnimatePresence mode="wait">
              {mode === 'text' ? (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={text}
                      onChange={(e) => { setText(e.target.value); setError('') }}
                      placeholder="Paste a news article here to analyze its credibility...&#10;&#10;The more content you provide, the more accurate the analysis will be."
                      rows={8}
                      className="w-full bg-navy-950/60 border border-white/8 rounded-xl p-4 text-sm text-slate-300 placeholder-slate-600 resize-none outline-none focus:border-cyan-500/40 transition-colors duration-300 font-mono leading-relaxed"
                    />
                    {text && (
                      <div className="absolute bottom-3 right-3 text-xs text-slate-600 font-mono">
                        {text.split(/\s+/).filter(Boolean).length} words
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="url"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="flex items-center gap-2 bg-navy-950/60 border border-white/8 rounded-xl px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
                    <RiLink className="text-slate-500 shrink-0" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setError('') }}
                      placeholder="https://example.com/news-article"
                      className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none font-mono"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-mono">
                    Note: Some websites may restrict automatic article extraction. 
                    If the URL doesn't work, paste the article text directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                >
                  <RiAlertLine className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-5">
              <motion.button
                onClick={handleAnalyze}
                disabled={loading}
                className="btn-primary flex items-center gap-2 text-sm py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={!loading ? { scale: 1.04 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <>
                    <RiLoader4Line className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RiSearchEyeLine />
                    Analyze Article
                  </>
                )}
              </motion.button>

              {(text || url || result) && (
                <motion.button
                  onClick={handleClear}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="btn-ghost flex items-center gap-1.5 text-sm py-3 px-5"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <RiCloseLine />
                  Clear
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Loading / Result */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScanAnimation />
            </motion.div>
          )}
          {!loading && result && (
            <motion.div key="result">
              <ResultPanel result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}