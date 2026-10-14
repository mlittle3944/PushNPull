import RoutineSelector from './RoutineSelector'

export default class OnboardingForm {
  #goal
  #experience
  #daysPerWeek
  #equipment

  constructor(profile, { goal = '', experience = '', daysPerWeek = 3, equipment = [] } = {}) {
    this.profile = profile
    this.#goal = goal
    this.#experience = experience
    this.#daysPerWeek = daysPerWeek
    this.#equipment = equipment
  }

  async submit() {
    if (!this.#validate()) throw new Error('Pick a goal and experience level first.')
    const routineId = new RoutineSelector().pickRoutine(this.#daysPerWeek, this.#experience)
    Object.assign(this.profile, {
      goal: this.#goal,
      experience: this.#experience,
      daysPerWeek: this.#daysPerWeek,
      equipment: this.#equipment,
      routineId,
    })
    await this.profile.save()
  }

  #validate() {
    return Boolean(this.#goal && this.#experience && this.#daysPerWeek >= 2 && this.#daysPerWeek <= 6)
  }
}
