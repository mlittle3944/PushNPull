import { describe, it, expect } from 'vitest'
import { pickRoutineId, prescribe, chooseExercise, buildPlan, formatRest } from './plan'

const ex = (id, muscle_group, equipment, extra = {}) => ({
  id,
  name: id,
  muscle_group,
  equipment,
  is_compound: true,
  sets: 3,
  reps: '8-12',
  rest_seconds: 90,
  form_cue: '',
  ...extra,
})

const catalog = [
  ex('goblet_squat', 'legs', 'dumbbells'),
  ex('leg_press', 'legs', 'machines'),
  ex('bodyweight_squat', 'legs', 'bodyweight'),
  ex('lat_pulldown', 'back', 'cables'),
  ex('plank', 'core', 'bodyweight', { reps: '20-40 sec', rest_seconds: 45, is_compound: false }),
]

describe('pickRoutineId', () => {
  it('gives full body for 2-3 days', () => {
    expect(pickRoutineId({ days_per_week: 2, experience: 'some' })).toBe('full_body_3')
    expect(pickRoutineId({ days_per_week: 3, experience: 'new' })).toBe('full_body_3')
  })
  it('gives upper/lower for 4 days', () => {
    expect(pickRoutineId({ days_per_week: 4, experience: 'some' })).toBe('upper_lower_4')
  })
  it('keeps brand-new lifters on upper/lower even at 5+ days', () => {
    expect(pickRoutineId({ days_per_week: 6, experience: 'new' })).toBe('upper_lower_4')
  })
  it('gives push/pull/legs for 5+ days with some experience', () => {
    expect(pickRoutineId({ days_per_week: 5, experience: 'some' })).toBe('push_pull_legs')
  })
})

describe('prescribe', () => {
  it('lowers reps and adds rest on compound lifts for strength', () => {
    expect(prescribe(catalog[0], 'get_stronger')).toEqual({ sets: 3, reps: '6-8', rest_seconds: 120 })
  })
  it('raises reps and shortens rest for fat loss', () => {
    expect(prescribe(catalog[0], 'lose_fat')).toEqual({ sets: 3, reps: '12-15', rest_seconds: 75 })
  })
  it('leaves timed exercises alone', () => {
    expect(prescribe(catalog[4], 'lose_fat')).toEqual({ sets: 3, reps: '20-40 sec', rest_seconds: 45 })
  })
})

describe('chooseExercise', () => {
  it('keeps the exercise when the user has the equipment', () => {
    expect(chooseExercise(catalog[0], catalog, ['dumbbells']).exercise.id).toBe('goblet_squat')
  })
  it('swaps to an available exercise for the same muscle', () => {
    const result = chooseExercise(catalog[0], catalog, ['machines'])
    expect(result.exercise.id).toBe('leg_press')
    expect(result.swappedFrom.id).toBe('goblet_squat')
  })
  it('flags missing equipment when nothing else fits', () => {
    const result = chooseExercise(catalog[3], catalog, [])
    expect(result.exercise.id).toBe('lat_pulldown')
    expect(result.missingEquipment).toBe(true)
  })
})

describe('buildPlan', () => {
  const routine = {
    routine_days: [
      {
        day_number: 2,
        label: 'B',
        routine_exercises: [{ position: 1, exercise_id: 'plank' }],
      },
      {
        day_number: 1,
        label: 'A',
        routine_exercises: [
          { position: 2, exercise_id: 'leg_press' },
          { position: 1, exercise_id: 'goblet_squat' },
        ],
      },
    ],
  }

  it('sorts days and exercises and never repeats an exercise in a day', () => {
    const plan = buildPlan(routine, catalog, { equipment: [], goal: 'build_muscle' })
    expect(plan.map((d) => d.label)).toEqual(['A', 'B'])
    // Both leg moves need equipment the user doesn't have; the second can't reuse the first swap.
    expect(plan[0].steps.map((s) => s.id)).toEqual(['bodyweight_squat', 'leg_press'])
    expect(plan[0].steps[1].missingEquipment).toBe(true)
  })
})

describe('formatRest', () => {
  it('formats seconds for people', () => {
    expect(formatRest(90)).toBe('1 min 30 sec')
    expect(formatRest(60)).toBe('1 min')
    expect(formatRest(45)).toBe('45 sec')
  })
})
