import { pickRoutineId } from '../lib/plan'

export default class RoutineSelector {
  #defaultRoutineId = 'full_body_3'
  #maxBeginnerDays = 4

  pickRoutine(daysPerWeek, experience) {
    if (!daysPerWeek) return this.#defaultRoutineId
    if (experience === 'new' && daysPerWeek > this.#maxBeginnerDays) return 'upper_lower_4'
    return pickRoutineId({ days_per_week: daysPerWeek, experience })
  }
}
