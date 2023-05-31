import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';

import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Users} from "../models/users";
import {Observable} from "rxjs";
import {AuthenticationService} from "../login/services/authentification.service";
import {map} from "rxjs/operators";

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is an admin
    return this.authService.getConnectedUser().pipe(
      map((user: Users) => {
        if (user && user.role === 'ADMIN') {
          return true;
        } else {
          //une page dans le cas d'echec
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  }
}
