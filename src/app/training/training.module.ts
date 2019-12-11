import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        TrainingComponent, 
        CurrentTrainingComponent, 
        NewTrainingComponent, 
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports:[
        SharedModule,
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}