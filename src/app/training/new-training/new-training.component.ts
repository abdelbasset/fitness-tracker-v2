import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(private trainingService: TrainingService) { }
  //exercises: Exercise[] = [];
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  ngOnInit() {
    //this.exercises = this.trainingService.getAvilableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => (this.exercises = exercises) );
    this.trainingService.fetchAvilableExercises();  
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    console.log(form.value);
    this.trainingService.startExercise(form.value.exercise)
  }

}
