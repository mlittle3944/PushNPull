import { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import { getProfile } from '../lib/api'
import { AuthContext } from './AuthContext'

// Keeps track of who is signed in and their `profiles` row.
// profile: undefined = still loading, null = signed in but not onboarded yet.
export default function AuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(undefined)
  const userIdRef = useRef(null)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setAuthReady(true)

      // Only reload the profile when a different user signs in (not on token refresh).
      const userId = newSession?.user?.id ?? null
      if (userId === userIdRef.current) return
      userIdRef.current = userId

      if (!userId) {
        setProfile(null)
        return
      }
      setProfile(undefined)
      // Supabase recommends not awaiting other Supabase calls inside this callback.
      setTimeout(() => {
        getProfile(userId)
          .then(setProfile)
          .catch((err) => {
            console.error('Could not load profile', err)
            setProfile(null)
          })
      }, 0)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  async function refreshProfile() {
    if (!session) return null
    const fresh = await getProfile(session.user.id)
    setProfile(fresh)
    return fresh
  }

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading: !authReady || (Boolean(session) && profile === undefined),
    refreshProfile,
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
