import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, password, confirm }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Enter your name.'
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (password.length < 8) errors.password = 'Use at least 8 characters.'
  if (confirm !== password) errors.confirm = 'Passwords do not match.'
  return errors
}

export default function Register() {
  const { user, register } = useAuth()

  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setServerError('')
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setSubmitting(true)
    try {
      await register({ name: values.name, email: values.email, password: values.password })
    } catch (err) {
      setServerError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Upload images, run analyses and keep every result."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cobalt hover:underline">
            Log in
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
          id="name"
          label="Name"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
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
          autoComplete="new-password"
          hint="At least 8 characters."
          value={values.password}
          onChange={set('password')}
          error={errors.password}
        />
        <FormField
          id="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={values.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}