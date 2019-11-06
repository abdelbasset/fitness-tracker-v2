import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    //private user: User;
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){}
    registerUser(authData: AuthData){
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then( result => {
            console.log(result);
            this.authSuccessfully();
        }).catch(error => {console.log(error)});

        //this.authSuccessfully();
    }

    login(authData: AuthData){
        // this.user = {
        //     email : authData.email,
        //     userId: Math.round(Math.random() * 10000 ).toString()
        // }
        //this.authSuccessfully();
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then( result => {
            console.log(result);
            this.authSuccessfully();
        }).catch(error => {console.log(error)});
        
    }

    logout(){
        //this.user = null;
        this.trainingService.cancelSubscription();
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    // getUser(){
    //     return { ...this.user };
    // }

    isAuth(){
        //return this.user !== null;
        return this.isAuthenticated;
    }

    private authSuccessfully(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}