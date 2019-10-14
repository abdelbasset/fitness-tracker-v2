import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }
  //exercises: Exercise[] = [];
  exercises: Observable<any>;


  ngOnInit() {
    //this.exercises = this.trainingService.getAvilableExercises();
    this.exercises = this.db.collection('availableExercises').valueChanges();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

}
