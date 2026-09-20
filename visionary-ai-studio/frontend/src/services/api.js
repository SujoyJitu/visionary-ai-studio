// One place for every call to the backend.
//
// Contract the FastAPI backend must follow (we build it in a later step):
//   POST /auth/register  { name, email, password } -> { access_token, token_type, user }
//   POST /auth/login     { email, password }       -> { access_token, token_type, user }
//   GET  /users/me       (Bearer token)            -> user   where user = { id, name, email }
//   Errors are returned as { "detail": "message" } (FastAPI's default).

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const TOKEN_KEY = 'vas_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

/* ---------------------------- real backend ---------------------------- */

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = tokenStore.get()
  if (auth && token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('Cannot reach the server. Check that the backend is running.')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(typeof data?.detail === 'string' ? data.detail : 'Something went wrong. Try again.')
  }
  return data
}

/* ------------------------- mock backend (demo) ------------------------- */
// Stores accounts in localStorage so the UI works without a server.
// Removed once VITE_USE_MOCK=false and the FastAPI backend is running.

const DB_KEY = 'vas_mock_users'
const readUsers = () => JSON.parse(localStorage.getItem(DB_KEY) || '[]')
const writeUsers = (users) => localStorage.setItem(DB_KEY, JSON.stringify(users))
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))
const publicUser = ({ id, name, email }) => ({ id, name, email })

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const mock = {
  async register({ name, email, password }) {
    await delay()
    const users = readUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      throw new Error('An account with this email already exists.')
    }
    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalized,
      passwordHash: await sha256(password),
    }
    writeUsers([...users, user])
    return { access_token: `mock.${user.id}`, token_type: 'bearer', user: publicUser(user) }
  },

  async login({ email, password }) {
    await delay()
    const normalized = email.trim().toLowerCase()
    const hash = await sha256(password)
    const user = readUsers().find((u) => u.email === normalized && u.passwordHash === hash)
    if (!user) throw new Error('Incorrect email or password.')
    return { access_token: `mock.${user.id}`, token_type: 'bearer', user: publicUser(user) }
  },

  async me() {
    await delay(150)
    const token = tokenStore.get() ?? ''
    const id = token.startsWith('mock.') ? token.slice(5) : null
    const user = readUsers().find((u) => u.id === id)
    if (!user) throw new Error('Session expired. Log in again.')
    return publicUser(user)
  },
}

/* ------------------------------ public API ----------------------------- */

export const api = {
  register: (payload) =>
    USE_MOCK ? mock.register(payload) : request('/auth/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) =>
    USE_MOCK ? mock.login(payload) : request('/auth/login', { method: 'POST', body: payload, auth: false }),
  me: () => (USE_MOCK ? mock.me() : request('/users/me')),
}