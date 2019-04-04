
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../core/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public _afAuth: AngularFireAuth,
    public _userService: UserService,
    private _router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._userService.getCurrentUser()
      .then(user => {
        this._router.navigate(['/user']);
        return resolve(false);
      }, err => {
        return resolve(true);
      });
    });
  }
}
