import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function FormField({ id, label, type = 'text', error, hint, ...inputProps }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          className={`w-full rounded-lg border bg-paper px-3.5 py-2.5 text-base transition-colors placeholder:text-slate/60 focus:border-cobalt ${
            error ? 'border-coral' : 'border-line'
          } ${isPassword ? 'pr-11' : ''}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate hover:text-ink"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error ? (
        <p id={messageId} className="mt-1.5 text-sm text-coral">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-sm text-slate">
          {hint}
        </p>
      ) : null}
    </div>
  )
}