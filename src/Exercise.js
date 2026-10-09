export class Exercise {
  constructor(name, muscleGroup, sets, reps, restSeconds, formCue, equipment, swappedFrom){
    this._name=name;
    this._muscleGroup= muscleGroup;
    this._sets=sets;
    this._reps=reps;
    this._restSeconds=restSeconds;
    this._formCue=formCue;
    this._equipment=equipment;
    this._swappedFrom=swappedFrom;
  }
  getRestLabel(){/*TODO*/ return '';}
}
