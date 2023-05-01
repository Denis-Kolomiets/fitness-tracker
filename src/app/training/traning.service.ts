import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>()
    exercisesChanged = new Subject<Exercise[]>()
    private availableExercises: Exercise[] = []
    private runningExercice?: Exercise
   
    constructor( private db: AngularFirestore){}

    fetchAvailableExercises() {
        this.db.collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map(
            docArray => {
              return docArray.map(doc => {
                return {
                  id: doc.payload.doc.id,
                  name: doc.payload.doc.data().name,
                  duration: doc.payload.doc.data().duration,
                  calories: doc.payload.doc.data().calories
                }
              })
            }
          )
        ).subscribe((exercises: Exercise[])=> {
            this.availableExercises = exercises
            this.exercisesChanged.next([...this.availableExercises])         
        })    
    }

    startExercise(selectId: string) {
        this.runningExercice = this.availableExercises.find(ex => ex.id === selectId) as Exercise
        this.exerciseChanged.next({...this.runningExercice})
    }
}