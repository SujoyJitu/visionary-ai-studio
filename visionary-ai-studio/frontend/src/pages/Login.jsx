import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ email, password }) {
  const errors = {}
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (!password) errors.password = 'Enter your password.'
  return errors
}

export default function Login() {
  const { user, login } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/dashboard'

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to={from} replace />

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setServerError('')
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setSubmitting(true)
    try {
      await login(values)
      // AuthContext now has a user, so the <Navigate> above sends them onward.
    } catch (err) {
      setServerError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome back. Log in to see your analyses."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="font-semibold text-cobalt hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {serverError && (
          <div role="alert" className="rounded-lg border border-coral/30 bg-coral/5 px-3.5 py-2.5 text-sm text-coral">
            {serverError}
          </div>
        )}
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={set('password')}
          error={errors.password}
        />
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}