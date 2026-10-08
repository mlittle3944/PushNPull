import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const { user, loading } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Once signed in, ProtectedRoute decides between the plan and onboarding.
  if (!loading && user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) setError(signUpError.message)
      else if (!data.session) setMessage('Check your email for a confirmation link, then sign in here.')
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) setError(signInError.message)
    }
    setBusy(false)
  }

  const isSignup = mode === 'signup'

  return (
    <section className="card narrow">
      <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
      <p className="muted">
        A step-by-step workout plan for beginners at the ARC Express.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="notice">{message}</p>}

        <button type="submit" className="primary" disabled={busy}>
          {busy ? 'Please wait…' : isSignup ? 'Sign up' : 'Sign in'}
        </button>
      </form>

      <button
        type="button"
        className="link-button"
        onClick={() => {
          setMode(isSignup ? 'signin' : 'signup')
          setError('')
          setMessage('')
        }}
      >
        {isSignup ? 'Already have an account? Sign in' : 'New here? Create an account'}
      </button>
    </section>
  )
}
