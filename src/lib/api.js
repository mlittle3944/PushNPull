// Every Supabase query the app makes lives here, so pages stay simple
// and the next group can see the whole data layer in one file.
import { supabase } from '../supabaseClient'

export async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) throw error
  return data // null if the user hasn't onboarded yet
}

export async function saveProfile(userId, fields) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...fields })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getAllExercises() {
  const { data, error } = await supabase.from('exercises').select('*').order('name')
  if (error) throw error
  return data
}

export async function getExercisesByMuscle(muscleGroup) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('muscle_group', muscleGroup)
    .order('name')
  if (error) throw error
  return data
}

export async function getRoutine(routineId) {
  const { data, error } = await supabase
    .from('routines')
    .select('id, name, description, days_per_week, routine_days(day_number, label, routine_exercises(position, exercise_id))')
    .eq('id', routineId)
    .single()
  if (error) throw error
  return data
}
