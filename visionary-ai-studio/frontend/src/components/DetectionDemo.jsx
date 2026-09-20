import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquareText, ScanSearch, Tags } from 'lucide-react'

// Sample data only. Later this shape comes from the FastAPI /analysis/run response.
const OBJECTS = [
  { id: 'dog', label: 'Dog', conf: 0.96, box: { x: 298, y: 208, w: 210, h: 208 }, color: '#2440f0', delay: 0.85 },
  { id: 'tree', label: 'Tree', conf: 0.91, box: { x: 16, y: 88, w: 176, h: 224 }, color: '#0b7f5d', delay: 0.2 },
  { id: 'ball', label: 'Ball', conf: 0.87, box: { x: 190, y: 370, w: 40, h: 44 }, color: '#d63a16', delay: 0.6 },
]

const CLASSES = [
  { label: 'Golden retriever', conf: 0.924 },
  { label: 'Labrador retriever', conf: 0.048 },
  { label: 'Cocker spaniel', conf: 0.012 },
]

const CAPTION = 'A dog sitting on the grass.'

const MODES = [
  { id: 'detect', label: 'Detect objects', icon: ScanSearch },
  { id: 'caption', label: 'Describe', icon: MessageSquareText },
  { id: 'classify', label: 'Classify', icon: Tags },
]

const pct = (n, digits = 0) => `${(n * 100).toFixed(digits)}%`

function Scene() {
  return (
    <>
      {/* sky */}
      <rect width="640" height="480" fill="#cfe3f7" />
      <circle cx="540" cy="82" r="34" fill="#ffe08a" />
      <g fill="#fff" opacity="0.9">
        <ellipse cx="250" cy="92" rx="46" ry="16" />
        <ellipse cx="285" cy="82" rx="34" ry="16" />
        <ellipse cx="222" cy="86" rx="28" ry="12" />
      </g>

      {/* ground */}
      <path d="M0 300 Q120 232 240 286 T480 268 T640 292 V330 H0 Z" fill="#9fd0b0" />
      <rect y="300" width="640" height="180" fill="#6dbb86" />
      <path d="M0 430 Q160 400 320 430 T640 424 V480 H0 Z" fill="#5aa874" />

      {/* tree */}
      <ellipse cx="102" cy="316" rx="46" ry="8" fill="#000" opacity="0.12" />
      <rect x="90" y="196" width="22" height="118" rx="6" fill="#7a5a3c" />
      <g fill="#3e9b62">
        <circle cx="100" cy="150" r="60" />
        <circle cx="60" cy="185" r="42" />
        <circle cx="145" cy="185" r="45" />
      </g>

      {/* ball */}
      <ellipse cx="210" cy="414" rx="26" ry="5" fill="#000" opacity="0.12" />
      <circle cx="210" cy="392" r="20" fill="#ff5a3c" />
      <path d="M192 386 Q210 376 228 386" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* dog */}
      <ellipse cx="405" cy="416" rx="92" ry="9" fill="#000" opacity="0.12" />
      <path d="M346 380 Q302 366 306 322" stroke="#c8842e" strokeWidth="14" strokeLinecap="round" fill="none" />
      <ellipse cx="400" cy="340" rx="62" ry="72" fill="#d9953f" />
      <ellipse cx="410" cy="345" rx="34" ry="46" fill="#f0c687" />
      <rect x="380" y="378" width="24" height="38" rx="11" fill="#e3a550" />
      <rect x="418" y="378" width="24" height="38" rx="11" fill="#e3a550" />
      <circle cx="410" cy="255" r="42" fill="#e3a550" />
      <ellipse cx="372" cy="238" rx="14" ry="26" transform="rotate(-20 372 238)" fill="#a96b22" />
      <ellipse cx="448" cy="238" rx="14" ry="26" transform="rotate(20 448 238)" fill="#a96b22" />
      <ellipse cx="414" cy="272" rx="20" ry="15" fill="#f3d3a0" />
      <ellipse cx="416" cy="288" rx="6" ry="8" fill="#e8667a" />
      <circle cx="414" cy="266" r="6" fill="#2b2b2b" />
      <circle cx="398" cy="250" r="4" fill="#222" />
      <circle cx="430" cy="250" r="4" fill="#222" />
    </>
  )
}

function DetectOverlay() {
  return (
    <g>
      {OBJECTS.map((o) => {
        const tag = `${o.label} ${Math.round(o.conf * 100)}%`
        const tagWidth = tag.length * 10.5 + 18
        return (
          <g key={o.id} className="det" style={{ animationDelay: `${o.delay}s` }}>
            <rect
              x={o.box.x}
              y={o.box.y}
              width={o.box.w}
              height={o.box.h}
              rx="4"
              fill={o.color}
              fillOpacity="0.08"
              stroke={o.color}
              strokeWidth="3"
            />
            <rect x={o.box.x - 1.5} y={o.box.y - 30} width={tagWidth} height="30" rx="4" fill={o.color} />
            <text x={o.box.x + 8} y={o.box.y - 9} fill="#fff" fontSize="19" fontWeight="600">
              {tag}
            </text>
          </g>
        )
      })}
      <g className="scan-line">
        <rect x="-56" y="0" width="56" height="480" fill="url(#scan-trail)" />
        <rect x="0" y="0" width="3" height="480" fill="#2440f0" />
      </g>
    </g>
  )
}

function DetectPanel() {
  const sorted = [...OBJECTS].sort((a, b) => b.conf - a.conf)
  return (
    <ul className="divide-y divide-line">
      {sorted.map((o) => (
        <li key={o.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
          <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: o.color }} />
          <span className="font-semibold">{o.label}</span>
          <span className="ml-auto hidden text-sm tabular-nums text-slate sm:inline">
            [{o.box.x}, {o.box.y}, {o.box.x + o.box.w}, {o.box.y + o.box.h}]
          </span>
          <span className="w-12 text-right font-semibold tabular-nums">{pct(o.conf)}</span>
        </li>
      ))}
    </ul>
  )
}

function CaptionPanel() {
  return (
    <p className="font-display text-2xl font-semibold leading-snug sm:text-[1.75rem]">{CAPTION}</p>
  )
}

function ClassifyPanel() {
  return (
    <ul className="space-y-3">
      {CLASSES.map((c, i) => (
        <li key={c.label}>
          <div className="mb-1 flex items-baseline justify-between text-[15px]">
            <span className={i === 0 ? 'font-semibold' : 'text-slate'}>{c.label}</span>
            <span className={`tabular-nums ${i === 0 ? 'font-semibold' : 'text-slate'}`}>{pct(c.conf, 1)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div
              className={`h-full rounded-full ${i === 0 ? 'bg-cobalt' : 'bg-slate/60'}`}
              style={{ width: pct(c.conf, 1) }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function DetectionDemo() {
  const [mode, setMode] = useState('detect')

  return (
    <div>
      <div role="group" aria-label="Analysis type" className="mb-3 flex flex-wrap gap-2">
        {MODES.map(({ id, label, icon: Icon }) => {
          const active = mode === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setMode(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? 'bg-ink text-white' : 'bg-paper text-slate ring-1 ring-line hover:text-ink'
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_48px_-24px_rgba(15,27,51,0.35)]">
        <svg
          viewBox="0 0 640 480"
          className="block h-auto w-full"
          role="img"
          aria-label="Sample photo of a dog sitting on grass beside a ball and a tree"
        >
          <defs>
            <linearGradient id="scan-trail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#2440f0" stopOpacity="0" />
              <stop offset="1" stopColor="#2440f0" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <Scene />
          {mode === 'detect' && <DetectOverlay />}
        </svg>

        <div className="border-t border-line p-5">
          <div className="min-h-[9.5rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                {mode === 'detect' && <DetectPanel />}
                {mode === 'caption' && <CaptionPanel />}
                {mode === 'classify' && <ClassifyPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 flex justify-between text-[13px] text-slate">
            <span>Processed in 1.42 s</span>
            <span>Sample result, not a live analysis</span>
          </p>
        </div>
      </div>
    </div>
  )
}
