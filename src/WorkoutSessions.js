// src/WorkoutSession.js
export class WorkoutSession {
  constructor(id, profileId) {
    this.id = id;
    this.profileId = profileId;
    this.startedAt = null;
    this._endedAt = null;
  }
  startSession() { /* TODO */ }
  endSession() { /* TODO */ }
  saveToDatabase() { /* TODO: insert into workout_sessions via Supabase client */ return false; }
}
