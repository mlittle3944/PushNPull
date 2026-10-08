import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

// Wrap routes that need a signed-in user.
// requireProfile: also send people who haven't finished onboarding to /onboarding.
export default function ProtectedRoute({ requireProfile = true }) {
  const { user, profile, loading } = useAuth()

  if (loading) return <p className="status">Loading…</p>
  if (!user) return <Navigate to="/login" replace />
  if (requireProfile && !profile?.onboarded_at) return <Navigate to="/onboarding" replace />
  return <Outlet />
}
