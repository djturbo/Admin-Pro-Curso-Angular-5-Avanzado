import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../user/auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  TAG = 'RefreshTokenGuard :: ';
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const token = this._authService.getAuthToken();
      const payload = JSON.parse(atob( token.split('.')[1] ));
      if (this.isExpiredToken(payload.exp)) {
          this._router.navigate(['/login']);
          return false;
      } else {
        return this.verifyRefreshToken(payload.exp);
      }

  }

  verifyRefreshToken(exp: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        /** Fecha del token de expiración actual */
        const tokenExp = new Date(exp * 1000);

        const now = new Date();

        /** Aumenta 4 horas a la fecha actual  */
        now.setTime(now.getTime() + (4 * 60 * 60 * 1000));

        console.log(this.TAG, 'verifyRefreshToken TOKENEXP: ', tokenExp);
        console.log(this.TAG, 'verifyRefreshToken      NOW: ', now);
        /** Se comprueba que si la fecha actual más 4 horas es menor que la fecha de expiración para renovarlo */
        if ( tokenExp > now ) {
          resolve(true);
        } else {
          this._authService.refreshToken().subscribe(
            success => {
              resolve(true);
            },
            error => {
              reject(false);
            }
          );
        }

        resolve(true);
      }
    );
  }

  isExpiredToken(exp: number): boolean {
    const now = new Date().getTime() / 1000;
    if ( exp < now ) {
      return true;
    } else {
      return false;
    }
  }
}
