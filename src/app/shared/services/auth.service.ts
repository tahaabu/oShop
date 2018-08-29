import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable,of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private userService:UserService
  ) { 
    this.user$=this.afAuth.authState;
  }

  login(){
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl') ||'/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(){
    
    return this.user$
    .pipe(switchMap(user=>{
    
      if (user) return this.userService.get(user.uid)
    
      return of(null);
    })
    )
  }
}