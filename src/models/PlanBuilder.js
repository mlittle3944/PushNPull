import Routine from './Routine'
import { chooseExercise, prescribe } from '../lib/plan'

export default class PlanBuilder {
  #profile
  #catalog

  /** profile: shared Profile (owner yk). catalog: Exercise[] from Exercise.fetchAll() (owner Jeann72). */
  constructor(profile, catalog) {
    this.#profile = profile
    this.#catalog = catalog
  }

  /** Returns the user's WorkoutDay[] with exercises swapped for equipment and adjusted for their goal. */
  async buildPlan() {
    const routine = await Routine.findById(this.#profile.getRoutineId())
    return routine.days.map(({ dayNumber }) => {
      const day = routine.getDay(dayNumber)
      const exercises = day
        .getExercises()
        .map(({ id }) => this.#catalog.find((e) => e.id === id))
        .filter(Boolean)
        .map((exercise) => this.#prescribe(this.#chooseExercise(exercise, this.#profile.equipment), this.#profile.goal))
      return { dayNumber, label: day.label, exercises }
    })
  }

  #chooseExercise(exercise, equipment) {
    return chooseExercise(exercise, this.#catalog, equipment).exercise
  }

  #prescribe(exercise, goal) {
    return { ...exercise, ...prescribe(exercise, goal) }
  }
}
