import { useEffect, useState } from 'react'
import { getAllExercises, getRoutine } from './api'
import { buildPlan, pickRoutineId } from './plan'

// Loads the user's routine + the exercise catalog and builds their personalised plan.
export function usePlan(profile) {
  const routineId = profile ? (profile.routine_id ?? pickRoutineId(profile)) : null
  const key = profile ? `${routineId}|${profile.goal}|${(profile.equipment ?? []).join(',')}` : null
  const [result, setResult] = useState({ key: null, routine: null, days: null, error: null })

  useEffect(() => {
    if (!profile) return undefined
    let active = true
    Promise.all([getRoutine(routineId), getAllExercises()])
      .then(([routine, exercises]) => {
        if (active) setResult({ key, routine, days: buildPlan(routine, exercises, profile), error: null })
      })
      .catch((error) => {
        if (active) setResult({ key, routine: null, days: null, error })
      })
    return () => {
      active = false
    }
  }, [profile, routineId, key])

  const loading = Boolean(profile) && result.key !== key
  return { ...result, loading }
}
