import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
      return false;
    }
    return true ;
  }
}
