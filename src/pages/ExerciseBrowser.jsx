import { useState } from 'react'
import { getExercisesByMuscle } from '../lib/api'
import { EQUIPMENT, MUSCLE_GROUPS, formatRest, labelFor } from '../lib/plan'

// React version of Sunny's original main.html / script.js muscle picker,
// now reading from the Supabase `exercises` table.
export default function ExerciseBrowser() {
  const [muscle, setMuscle] = useState(null)
  const [exercises, setExercises] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function showExercises(group) {
    setMuscle(group)
    setBusy(true)
    setError('')
    try {
      setExercises(await getExercisesByMuscle(group))
    } catch (err) {
      setError(err.message)
      setExercises([])
    }
    setBusy(false)
  }

  return (
    <section className="stack">
      <div>
        <h1>What do you want to train today?</h1>
        <p className="muted">Pick a muscle group to see beginner-friendly exercises.</p>
      </div>

      <div className="chips">
        {MUSCLE_GROUPS.map((group) => (
          <button
            key={group}
            type="button"
            className={`chip ${muscle === group ? 'selected' : ''}`}
            onClick={() => showExercises(group)}
          >
            {group}
          </button>
        ))}
      </div>

      {busy && <p className="status">Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!busy && muscle && exercises.length === 0 && !error && (
        <p className="muted">No exercises for {muscle} yet.</p>
      )}

      <ul className="exercise-list">
        {exercises.map((ex) => (
          <li key={ex.id} className="card">
            <h3>{ex.name}</h3>
            <p className="muted">
              {labelFor(EQUIPMENT, ex.equipment)} · {ex.sets} × {ex.reps} · rest {formatRest(ex.rest_seconds)}
            </p>
            <p>{ex.form_cue}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
