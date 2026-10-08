// Workout-plan logic. Pure functions only (no Supabase, no React), so it's easy to test.

export const GOALS = [
  { value: 'build_muscle', label: 'Build muscle' },
  { value: 'get_stronger', label: 'Get stronger' },
  { value: 'lose_fat', label: 'Lose fat' },
  { value: 'general_fitness', label: 'Get healthier overall' },
]

export const EXPERIENCE = [
  { value: 'new', label: "I'm brand new to the gym" },
  { value: 'some', label: "I've lifted a few times before" },
]

export const EQUIPMENT = [
  { value: 'machines', label: 'Machines' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'cables', label: 'Cable station' },
  { value: 'bodyweight', label: 'Bodyweight (mat space)' },
]

export const DAYS_PER_WEEK = [2, 3, 4, 5, 6]

export const MUSCLE_GROUPS = ['chest', 'back', 'legs', 'glutes', 'shoulders', 'arms', 'core']

export function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label ?? value
}

/**
 * Pick a routine id (matches `routines.id` in supabase/seed.sql).
 * Fewer days → full body. 4 days, or brand new → upper/lower. 5+ days → push/pull/legs.
 */
export function pickRoutineId({ days_per_week, experience }) {
  if (!days_per_week || days_per_week <= 3) return 'full_body_3'
  if (days_per_week === 4 || experience === 'new') return 'upper_lower_4'
  return 'push_pull_legs'
}

/**
 * Adjust sets/reps/rest for the user's goal.
 * Timed or per-side exercises ('20-40 sec', '8 each side') stay as written.
 */
export function prescribe(exercise, goal) {
  const base = { sets: exercise.sets, reps: exercise.reps, rest_seconds: exercise.rest_seconds }
  if (/sec|each/.test(exercise.reps)) return base

  switch (goal) {
    case 'get_stronger':
      return exercise.is_compound
        ? { ...base, reps: '6-8', rest_seconds: exercise.rest_seconds + 30 }
        : base
    case 'lose_fat':
    case 'general_fitness':
      return { ...base, reps: '12-15', rest_seconds: Math.max(30, exercise.rest_seconds - 15) }
    default:
      return base
  }
}

/**
 * If the user doesn't use this exercise's equipment, swap in another exercise for the
 * same muscle group that they can do. Bodyweight is always available.
 * `used` is the set of exercise ids already in today's workout, so we don't repeat one.
 */
export function chooseExercise(exercise, allExercises, equipment = [], used = new Set()) {
  const available = new Set([...equipment, 'bodyweight'])
  if (available.has(exercise.equipment) && !used.has(exercise.id)) {
    return { exercise, swappedFrom: null, missingEquipment: false }
  }
  const alternative = allExercises.find(
    (e) =>
      e.muscle_group === exercise.muscle_group &&
      e.id !== exercise.id &&
      !used.has(e.id) &&
      available.has(e.equipment),
  )
  if (alternative) return { exercise: alternative, swappedFrom: exercise, missingEquipment: false }
  return { exercise, swappedFrom: null, missingEquipment: !available.has(exercise.equipment) }
}

/**
 * Turn a routine (from Supabase, with nested routine_days → routine_exercises) into
 * the list of workout days the app shows, personalised for the profile.
 */
export function buildPlan(routine, allExercises, profile) {
  const byId = new Map(allExercises.map((e) => [e.id, e]))
  const days = [...(routine?.routine_days ?? [])].sort((a, b) => a.day_number - b.day_number)

  return days.map((day) => {
    const used = new Set()
    const steps = [...(day.routine_exercises ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((slot) => byId.get(slot.exercise_id))
      .filter(Boolean)
      .map((original) => {
        const { exercise, swappedFrom, missingEquipment } = chooseExercise(
          original,
          allExercises,
          profile?.equipment ?? [],
          used,
        )
        used.add(exercise.id)
        return {
          ...exercise,
          ...prescribe(exercise, profile?.goal),
          swappedFrom: swappedFrom?.name ?? null,
          missingEquipment,
        }
      })
    return { dayNumber: day.day_number, label: day.label, steps }
  })
}

/** 90 → "1 min 30 sec", 60 → "1 min", 45 → "45 sec" */
export function formatRest(seconds) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  if (min && sec) return `${min} min ${sec} sec`
  if (min) return `${min} min`
  return `${sec} sec`
}
