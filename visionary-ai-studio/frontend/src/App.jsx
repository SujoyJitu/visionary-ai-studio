import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ComingNext from './pages/ComingNext.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Placeholders until we build these pages */}
      <Route path="/login" element={<ComingNext title="Log in" />} />
      <Route path="/register" element={<ComingNext title="Create your account" />} />
      <Route path="*" element={<ComingNext title="Page not found" />} />
    </Routes>
  )
}
