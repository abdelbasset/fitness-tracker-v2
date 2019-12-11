import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { AngularFireAuthModule } from '../../../node_modules/@angular/fire/auth';


@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  exports: []
})
export class AuthModule {}
