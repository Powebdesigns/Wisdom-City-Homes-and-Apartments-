'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { CSSProperties } from 'react'

const VIEW_W = 1440
const VIEW_H = 320

type Win = { x: number; y: number; twinkle: boolean; delay: number; teal: boolean }
type Building = { x: number; y: number; w: number; h: number; roof: 'flat' | 'step' | 'antenna'; windows: Win[] }

type LayerConfig = {
  seed: number
  minW: number
  maxW: number
  minH: number
  maxH: number
  gap: number
  windowDensity: number
  twinkleRate: number
}

/** Deterministic PRNG so server and client render identical geometry. */
function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function buildLayer(cfg: LayerConfig): Building[] {
  const rnd = seeded(cfg.seed)
  const buildings: Building[] = []
  let x = -40 + rnd() * 40
  while (x < VIEW_W + 40) {
    const w = Math.round(cfg.minW + rnd() * (cfg.maxW - cfg.minW))
    const h = Math.round(cfg.minH + rnd() * (cfg.maxH - cfg.minH))
    const y = VIEW_H - h
    const windows: Win[] = []
    if (cfg.windowDensity > 0) {
      const cols = Math.floor((w - 12) / 14)
      const rows = Math.floor((h - 28) / 20)
      const offsetX = x + (w - cols * 14) / 2 + 4
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rnd() < cfg.windowDensity) {
            windows.push({
              x: Math.round(offsetX + c * 14),
              y: y + 16 + r * 20,
              twinkle: rnd() < cfg.twinkleRate,
              delay: Math.round(rnd() * 60) / 10,
              teal: rnd() < 0.25,
            })
          }
        }
      }
    }
    const roofRoll = rnd()
    buildings.push({
      x: Math.round(x),
      y,
      w,
      h,
      windows,
      roof: roofRoll < 0.15 ? 'antenna' : roofRoll < 0.35 ? 'step' : 'flat',
    })
    x += w + cfg.gap * rnd()
  }
  return buildings
}

const FAR = buildLayer({ seed: 7, minW: 50, maxW: 120, minH: 130, maxH: 240, gap: 6, windowDensity: 0, twinkleRate: 0 })
const MID = buildLayer({
  seed: 21,
  minW: 44,
  maxW: 110,
  minH: 90,
  maxH: 200,
  gap: 10,
  windowDensity: 0.16,
  twinkleRate: 0.1,
})
const NEAR = buildLayer({
  seed: 42,
  minW: 64,
  maxW: 140,
  minH: 56,
  maxH: 150,
  gap: 22,
  windowDensity: 0.26,
  twinkleRate: 0.14,
})

function Roof({ b, fill }: { b: Building; fill: string }) {
  if (b.roof === 'step') {
    return <rect x={b.x + b.w * 0.2} y={b.y - 14} width={b.w * 0.6} height={14} fill={fill} />
  }
  if (b.roof === 'antenna') {
    return <rect x={b.x + b.w / 2 - 1} y={b.y - 28} width={2} height={28} fill={fill} />
  }
  return null
}

function LayerSvg({ buildings, fill }: { buildings: Building[]; fill: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {buildings.map((b, i) => (
        <g key={i}>
          <Roof b={b} fill={fill} />
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={fill} />
          {b.windows.map((w, j) => (
            <rect
              key={j}
              x={w.x}
              y={w.y}
              width={6}
              height={9}
              rx={1}
              fill={w.teal ? '#19D3C5' : '#F4F7FB'}
              fillOpacity={w.teal ? 0.55 : 0.4}
              className={w.twinkle ? 'window-twinkle' : undefined}
              style={w.twinkle ? ({ animationDelay: `${w.delay}s` } as CSSProperties) : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

/** Low-rise foreground: bungalow roofs and a clock tower silhouette. */
function ForegroundSvg() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#0B1426">
        <polygon points="420,290 470,262 520,290" />
        <rect x="430" y="288" width="80" height="32" />
        <polygon points="880,286 940,254 1000,286" />
        <rect x="892" y="284" width="96" height="36" />
        <rect x="690" y="150" width="34" height="170" />
        <rect x="684" y="142" width="46" height="12" />
        <polygon points="684,142 707,108 730,142" />
        <rect x="0" y="300" width={VIEW_W} height="20" />
      </g>
      <circle cx="707" cy="172" r="9" fill="none" stroke="#19D3C5" strokeOpacity="0.6" strokeWidth="2" />
      <rect x="704" y="210" width="6" height="9" rx="1" fill="#F4F7FB" fillOpacity="0.45" className="window-twinkle" />
      <rect x="452" y="298" width="6" height="9" rx="1" fill="#F4F7FB" fillOpacity="0.4" />
      <rect x="932" y="296" width="6" height="9" rx="1" fill="#19D3C5" fillOpacity="0.55" className="window-twinkle" />
    </svg>
  )
}

function DriftLayer({
  y,
  duration,
  children,
}: {
  y?: MotionValue<number>
  duration?: number
  children: React.ReactNode
}) {
  return (
    <motion.div className="absolute inset-0" style={y ? { y } : undefined}>
      <div
        className={duration ? 'skyline-drift absolute inset-y-0 -inset-x-[4%]' : 'absolute inset-0'}
        style={duration ? ({ '--drift-duration': `${duration}s` } as CSSProperties) : undefined}
      >
        {children}
      </div>
    </motion.div>
  )
}

export function HeroSkyline() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const farY = useTransform(scrollY, [0, 800], [0, 200])
  const midY = useTransform(scrollY, [0, 800], [0, 120])
  const nearY = useTransform(scrollY, [0, 800], [0, 56])

  return (
    <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(60%_70%_at_50%_100%,rgb(25_211_197/0.18),transparent_70%)]" />
      <DriftLayer y={reduce ? undefined : farY} duration={reduce ? undefined : 70}>
        <LayerSvg buildings={FAR} fill="#1B2B4E" />
      </DriftLayer>
      <DriftLayer y={reduce ? undefined : midY} duration={reduce ? undefined : 52}>
        <LayerSvg buildings={MID} fill="#15223F" />
      </DriftLayer>
      <DriftLayer y={reduce ? undefined : nearY} duration={reduce ? undefined : 38}>
        <LayerSvg buildings={NEAR} fill="#101A31" />
      </DriftLayer>
      <DriftLayer>
        <ForegroundSvg />
      </DriftLayer>
    </div>
  )
}
