import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../user/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _authService: AuthService,
    private _router: Router) {

  }

  canActivate() {

      if (this._authService.getAuthUser().role === 'ADMIN_ROLE' ) {
        return true;
      } else {
        this._authService.doLogOut();
        this._router.navigate(['/login']);
          return false;
      }
  }
}
