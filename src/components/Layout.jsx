import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Layout() {
  const { user, profile, signOut } = useAuth()
  const showNav = user && profile?.onboarded_at

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          Push<span>N</span>Pull
        </NavLink>
        {showNav && (
          <nav className="nav">
            <NavLink to="/" end>
              My plan
            </NavLink>
            <NavLink to="/exercises">Exercises</NavLink>
          </nav>
        )}
        {user && (
          <button type="button" className="link-button" onClick={signOut}>
            Sign out
          </button>
        )}
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
