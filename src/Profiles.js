// src/Profile.js
export class Profile {
  constructor(id, displayName, fitnessGoal) {
    this.id = id;
    this.displayName = displayName;
    this._fitnessGoal = fitnessGoal;
  }
  updateGoal(goal) { 
    this._fitnessGoal = goal; 
  }
}
