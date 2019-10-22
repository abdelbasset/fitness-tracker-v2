import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    constructor(private db: AngularFirestore){}

    fetchAvilableExercises() {
        this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => { 
           return docArray.map(doc => { 
             return {
               id: doc.payload.doc.id,
               name: doc.payload.doc.data()['name'],
               duration: doc.payload.doc.data()['duration'],
               calories: doc.payload.doc.data()['calories']
             };
           });
         })).subscribe((exercises: Exercise[])=> {
             this.availableExercises = exercises;
             console.log(this.availableExercises);
             this.exercisesChanged.next([...this.availableExercises]);
         });
    }

    startExercise(selectedId: string) {
        console.log(selectedId);
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({ 
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed' 
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number){
        this.exercises.push({ 
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled' 
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises(){
        return this.exercises.slice();
    }
}