import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    //private user: User;
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackBar: MatSnackBar
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscription();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {

        }).catch(error => {
            this.snackBar.open(error.message, null, { duration: 3000 });

        });
    }

    login(authData: AuthData) {
        // this.user = {
        //     email : authData.email,
        //     userId: Math.round(Math.random() * 10000 ).toString()
        // }
        //this.authSuccessfully();
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {

        }).catch(error => {
            this.snackBar.open(error.message, null, { duration: 3000 });

        });

    }

    logout() {
        //this.user = null;
        this.afAuth.auth.signOut();

    }

    // getUser(){
    //     return { ...this.user };
    // }

    isAuth() {
        //return this.user !== null;
        return this.isAuthenticated;
    }


}