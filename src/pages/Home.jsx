import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePlan } from '../lib/usePlan'
import { GOALS, labelFor } from '../lib/plan'

export default function Home() {
  const { profile } = useAuth()
  const { routine, days, loading, error } = usePlan(profile)

  return (
    <section className="stack">
      <div>
        <h1>Hi{profile.display_name ? `, ${profile.display_name}` : ''}</h1>
        <p className="muted">
          Goal: {labelFor(GOALS, profile.goal)} · {profile.days_per_week} days a week ·{' '}
          <Link to="/onboarding">Edit answers</Link>
        </p>
      </div>

      {loading && <p className="status">Loading your plan…</p>}
      {error && (
        <p className="error">
          Couldn't load your plan: {error.message}. Has the team run supabase/seed.sql yet?
        </p>
      )}

      {routine && days && (
        <>
          <div className="card">
            <p className="eyebrow">Your routine</p>
            <h2>{routine.name}</h2>
            <p className="muted">{routine.description}</p>
          </div>

          <ul className="day-list">
            {days.map((day) => (
              <li key={day.dayNumber} className="card day">
                <div>
                  <h3>{day.label}</h3>
                  <p className="muted">
                    {day.steps.length} exercises · {day.steps.map((s) => s.name).join(', ')}
                  </p>
                </div>
                <Link className="button primary" to={`/workout/${day.dayNumber}`}>
                  Start {day.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
