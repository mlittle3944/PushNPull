// UML stub for the "View My Workout Plan" slice (owner: Jania).
export default class WorkoutDay {
  #dayNumber
  #label
  #exercises

  constructor(dayNumber, label, exercises = []) {
    this.#dayNumber = dayNumber
    this.#label = label
    this.#exercises = exercises
  }

  get dayNumber() { return this.#dayNumber }
  get label() { return this.#label }

  getExercises() {
    return [...this.#exercises]
  }
}
