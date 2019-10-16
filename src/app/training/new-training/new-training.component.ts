import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
    this.db.collection('availableExercises')
           .snapshotChanges()
           .pipe(map(docArray => { 
            console.log(docArray);
              return docArray.map(doc => { 
                return {
                  id: '1',
                  name: 'test',
                  duration: 10,
                  calories: 20

                };
              });
            }))
           .subscribe(result => {
            console.log(result);
    })
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

}
