import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { USE_MOCK } from '../services/api.js'

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Link to="/" aria-label="Back to home" className="self-start text-ink">
          <Logo />
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="headline text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-slate">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-[15px] text-slate">{footer}</p>
          {USE_MOCK && (
            <p className="mt-8 rounded-lg bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed text-slate ring-1 ring-line">
              Demo mode: accounts are saved in this browser only, until the backend is connected.
            </p>
          )}
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <svg
          aria-hidden="true"
          viewBox="0 0 28 28"
          fill="none"
          className="absolute -right-16 -top-16 h-[28rem] w-[28rem] text-white/10"
        >
          <path
            d="M2 9V4.5A2.5 2.5 0 0 1 4.5 2H9M19 2h4.5A2.5 2.5 0 0 1 26 4.5V9M26 19v4.5a2.5 2.5 0 0 1-2.5 2.5H19M9 26H4.5A2.5 2.5 0 0 1 2 23.5V19"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="14" cy="14" r="4.5" fill="#ffb800" fillOpacity="0.9" />
        </svg>

        <div className="relative max-w-sm">
          <h2 className="headline text-3xl font-bold">Every analysis, saved and searchable.</h2>
          <p className="mt-4 leading-relaxed text-white/70">
            Your account keeps a history of each image you analyze, with the labels and confidence scores the model returned.
          </p>
        </div>
      </aside>
    </div>
  )
}