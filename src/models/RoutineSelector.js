// UML stub for the "Complete Onboarding" slice (owner: Jania).
import { pickRoutineId } from '../lib/plan'

export default class RoutineSelector {
  #defaultRoutineId = 'full_body_3'
  #maxBeginnerDays = 4

  /** Returns a routines.id: full body (2-3 days), upper/lower (4, or brand new), push/pull/legs (5+). */
  pickRoutine(daysPerWeek, experience) {
    if (!daysPerWeek) return this.#defaultRoutineId
    if (experience === 'new' && daysPerWeek > this.#maxBeginnerDays) return 'upper_lower_4'
    return pickRoutineId({ days_per_week: daysPerWeek, experience })
  }
}
