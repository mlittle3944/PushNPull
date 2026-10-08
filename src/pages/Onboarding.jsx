import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { saveProfile } from '../lib/api'
import { DAYS_PER_WEEK, EQUIPMENT, EXPERIENCE, GOALS, pickRoutineId } from '../lib/plan'

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()

  // Pre-fill when someone comes back to edit their answers.
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [goal, setGoal] = useState(profile?.goal ?? '')
  const [experience, setExperience] = useState(profile?.experience ?? '')
  const [daysPerWeek, setDaysPerWeek] = useState(profile?.days_per_week ?? 3)
  const [equipment, setEquipment] = useState(
    profile?.equipment?.length ? profile.equipment : ['machines', 'dumbbells', 'bodyweight'],
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function toggleEquipment(value) {
    setEquipment((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!goal || !experience) {
      setError('Pick a goal and your experience level so we can choose your plan.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await saveProfile(user.id, {
        display_name: displayName.trim() || null,
        goal,
        experience,
        days_per_week: daysPerWeek,
        equipment,
        routine_id: pickRoutineId({ days_per_week: daysPerWeek, experience }),
        onboarded_at: profile?.onboarded_at ?? new Date().toISOString(),
      })
      await refreshProfile()
      navigate('/')
    } catch (err) {
      setError(`Couldn't save your answers: ${err.message}`)
      setBusy(false)
    }
  }

  return (
    <section className="card">
      <h1>{profile?.onboarded_at ? 'Update your answers' : "Let's build your plan"}</h1>
      <p className="muted">Four quick questions. You can change these any time.</p>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="display-name">What should we call you? (optional)</label>
        <input
          id="display-name"
          type="text"
          autoComplete="given-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <fieldset>
          <legend>1. What's your main goal?</legend>
          <div className="choices">
            {GOALS.map((g) => (
              <label key={g.value} className={`choice ${goal === g.value ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="goal"
                  value={g.value}
                  checked={goal === g.value}
                  onChange={() => setGoal(g.value)}
                />
                {g.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>2. How much have you lifted before?</legend>
          <div className="choices">
            {EXPERIENCE.map((x) => (
              <label key={x.value} className={`choice ${experience === x.value ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="experience"
                  value={x.value}
                  checked={experience === x.value}
                  onChange={() => setExperience(x.value)}
                />
                {x.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>3. How many days a week can you go?</legend>
          <div className="segmented">
            {DAYS_PER_WEEK.map((d) => (
              <label key={d} className={`segment ${daysPerWeek === d ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="days"
                  value={d}
                  checked={daysPerWeek === d}
                  onChange={() => setDaysPerWeek(d)}
                />
                {d}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>4. What are you comfortable using?</legend>
          <div className="choices">
            {EQUIPMENT.map((eq) => (
              <label
                key={eq.value}
                className={`choice ${equipment.includes(eq.value) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={eq.value}
                  checked={equipment.includes(eq.value)}
                  onChange={() => toggleEquipment(eq.value)}
                />
                {eq.label}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary" disabled={busy}>
          {busy ? 'Saving…' : 'Show me my plan'}
        </button>
      </form>
    </section>
  )
}
