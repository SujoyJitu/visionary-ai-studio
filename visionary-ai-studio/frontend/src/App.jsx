import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardPlaceholder from './pages/DashboardPlaceholder.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything below needs a logged-in user */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/analyze"
            element={<DashboardPlaceholder title="Analyze" text="Image upload and analysis come in the next steps." />}
          />
          <Route
            path="/history"
            element={<DashboardPlaceholder title="History" text="Your saved analyses will be listed here." />}
          />
          <Route
            path="/settings"
            element={<DashboardPlaceholder title="Settings" text="Profile, password and theme options will live here." />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}