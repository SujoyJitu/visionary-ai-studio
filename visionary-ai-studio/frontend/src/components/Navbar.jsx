import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        solid ? 'border-line bg-fog/85 backdrop-blur' : 'border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <Link to="/" aria-label="Visionary AI Studio home" className="text-ink">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-[15px] font-medium text-slate transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-ink/5"
          >
            Log in
          </Link>
          <Button to="/register" variant="outline">Sign up</Button>
          <Button to="/register">Get started</Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto max-w-6xl px-5 pb-6 pt-2 sm:px-8">
              <ul className="flex flex-col">
                {LINKS.map((l) => (
                  <li key={l.label} className="border-b border-line">
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-base font-medium text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <Button to="/register" size="lg">Get started</Button>
                <Button to="/register" variant="outline" size="lg">Sign up</Button>
                <Button to="/login" variant="outline" size="lg">Log in</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
