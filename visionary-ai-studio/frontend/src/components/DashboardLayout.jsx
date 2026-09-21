import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { History, LayoutDashboard, LogOut, Menu, ScanSearch, Settings, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze', label: 'Analyze', icon: ScanSearch },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full flex-col">
      <Link to="/" aria-label="Visionary AI Studio home" className="px-5 py-5 text-ink">
        <Logo />
      </Link>

      <nav aria-label="Dashboard" className="flex-1 px-3">
        <ul className="space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    isActive ? 'bg-ink text-white' : 'text-slate hover:bg-ink/5 hover:text-ink'
                  }`
                }
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cobalt text-sm font-bold text-white"
          >
            {user.name.trim().charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-[13px] text-slate">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-slate transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <LogOut size={18} aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-paper lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-fog/85 px-5 backdrop-blur lg:hidden">
        <Link to="/" aria-label="Visionary AI Studio home" className="text-ink">
          <Logo />
        </Link>
        <button
          type="button"
          className="-mr-2 rounded-lg p-2"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-paper shadow-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                aria-label="Close menu"
                className="absolute right-3 top-4 rounded-lg p-2"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
        <Outlet />
      </main>
    </div>
  )
}