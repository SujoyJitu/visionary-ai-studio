import { Github, Mail } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Dashboard', href: '/login' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API guide', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="about" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-white/15 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="headline text-3xl font-bold sm:text-4xl">Try it on your own image.</h2>
            <p className="mt-3 max-w-md text-white/70">
              Create an account, upload a photo, and see what the model finds.
            </p>
          </div>
          <Button to="/register" variant="accent" size="lg" className="self-start md:self-auto">
            Start analyzing
          </Button>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo dot="var(--color-marigold)" />
            <p className="mt-4 max-w-xs leading-relaxed text-white/70">
              An image analysis workspace. Upload a photo, choose an analysis, and read the result with confidence scores.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Visionary AI Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-white">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Email" className="transition-colors hover:text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
