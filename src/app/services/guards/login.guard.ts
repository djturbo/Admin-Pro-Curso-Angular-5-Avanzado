import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../user/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  TAG = 'LoginGuard';

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const canNavigate = this._authService.isAuthenticated();
    console.log(this.TAG, 'canActivate ', canNavigate);
    if (!canNavigate) {
      this._router.navigate(['/login']);
    }
    return canNavigate;
  }
}
