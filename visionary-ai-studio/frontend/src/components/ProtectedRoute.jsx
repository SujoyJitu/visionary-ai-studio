import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-cobalt" />
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  // Remember where the person was going so login can send them back there.
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />

  return <Outlet />
}