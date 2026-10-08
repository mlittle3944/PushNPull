import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

// Use inside any page: const { user, profile, refreshProfile, signOut } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
