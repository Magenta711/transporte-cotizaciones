import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSV: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree {
    console.log('AuthGuard: canActivate called ', this.authSV.isLoggedIn);
    if (this.authSV.isLoggedIn) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}
