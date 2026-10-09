// UML stub for the "View My Workout Plan" slice (owner: Jania)
import { getRoutine } from '../lib/api'
import WorkoutDay from './WorkoutDay'

export default class Routine {
  #id
  #name
  #description
  #days

  constructor({ id, name, description, days = [] }) {
    this.#id = id
    this.#name = name
    this.#description = description
    this.#days = days
  }

  get id() { return this.#id }
  get name() { return this.#name }
  get description() { return this.#description }
  get days() { return this.#days }

  /** Loads a routine and its days from Supabase. Exercise ids are filled in from the catalog later. */
  static async findById(id) {
    const row = await getRoutine(id)
    const days = (row.routine_days ?? []).map(
      (d) => new WorkoutDay(d.day_number, d.label, (d.routine_exercises ?? []).map((e) => ({ id: e.exercise_id }))),
    )
    return new Routine({ id: row.id, name: row.name, description: row.description, days })
  }

  getDay(dayNumber) {
    return this.#days.find((d) => d.dayNumber === dayNumber) ?? null
  }
}
