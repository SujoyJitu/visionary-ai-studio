// Viewfinder brackets with a dot in the middle: the "detection" mark.
export default function Logo({ dot = 'var(--color-cobalt)' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M2 9V4.5A2.5 2.5 0 0 1 4.5 2H9M19 2h4.5A2.5 2.5 0 0 1 26 4.5V9M26 19v4.5a2.5 2.5 0 0 1-2.5 2.5H19M9 26H4.5A2.5 2.5 0 0 1 2 23.5V19"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="14" cy="14" r="4.5" fill={dot} />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight">Visionary AI Studio</span>
    </span>
  )
}
