import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { usePlan } from '../lib/usePlan'
import { EQUIPMENT, formatRest, labelFor } from '../lib/plan'

// Step-by-step view: only the current exercise is shown, to avoid decision overload (REQ-4).
export default function Workout() {
  const { day } = useParams()
  const { profile } = useAuth()
  const { days, loading, error } = usePlan(profile)

  if (loading) return <p className="status">Loading workout…</p>
  if (error) return <p className="error">Couldn't load this workout: {error.message}</p>

  const workout = days?.find((d) => String(d.dayNumber) === day)
  if (!workout) {
    return (
      <p className="error">
        That workout doesn't exist. <Link to="/">Back to my plan</Link>
      </p>
    )
  }

  // key resets the step counter when switching between workout days
  return <WorkoutSteps key={workout.dayNumber} workout={workout} />
}

function WorkoutSteps({ workout }) {
  const [index, setIndex] = useState(0)
  const total = workout.steps.length
  const finished = index >= total

  if (total === 0) return <p className="muted">This workout has no exercises yet.</p>

  if (finished) {
    return (
      <section className="card narrow center">
        <p className="eyebrow">{workout.label}</p>
        <h1>Workout done</h1>
        <p className="muted">Nice work showing up. Consistency beats intensity.</p>
        <Link className="button primary" to="/">
          Back to my plan
        </Link>
      </section>
    )
  }

  const step = workout.steps[index]

  return (
    <section className="stack">
      <div className="progress-head">
        <p className="eyebrow">
          {workout.label} · Exercise {index + 1} of {total}
        </p>
        <div className="progress" aria-hidden="true">
          <div style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </div>

      <article className="card exercise">
        <p className="tag">{step.muscle_group}</p>
        <h1>{step.name}</h1>

        <dl className="prescription">
          <div>
            <dt>Sets</dt>
            <dd>{step.sets}</dd>
          </div>
          <div>
            <dt>Reps</dt>
            <dd>{step.reps}</dd>
          </div>
          <div>
            <dt>Rest</dt>
            <dd>{formatRest(step.rest_seconds)}</dd>
          </div>
        </dl>

        <h2 className="small-heading">How to do it</h2>
        <p>{step.form_cue}</p>

        <p className="muted">Equipment: {labelFor(EQUIPMENT, step.equipment)}</p>
        {step.swappedFrom && (
          <p className="notice">Swapped in for {step.swappedFrom} to match the equipment you picked.</p>
        )}
        {step.missingEquipment && (
          <p className="notice">
            This one uses equipment you didn't pick. Try it with help from ARC staff, or skip it.
          </p>
        )}
      </article>

      <div className="step-buttons">
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Back
        </button>
        <button type="button" className="primary" onClick={() => setIndex(index + 1)}>
          {index === total - 1 ? 'Finish' : 'Next exercise'}
        </button>
      </div>
    </section>
  )
}
