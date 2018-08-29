import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map,switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/Models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService) { }
  canActivate():Observable<boolean>{

  return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser:AppUser) =>appUser.isAdmin)
    )
  }
}
