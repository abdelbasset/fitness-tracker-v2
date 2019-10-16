import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }
  //exercises: Exercise[] = [];
  exercises: Observable<Exercise[]>;


  ngOnInit() {
    //this.exercises = this.trainingService.getAvilableExercises();
    this.exercises = this.db.collection('availableExercises')
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
            }))
           
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

}
