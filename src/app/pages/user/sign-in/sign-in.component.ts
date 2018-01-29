import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../../services';
declare function initPlugins();
declare const gapi: any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  TAG = 'SignInComponent :: ';

  login = {
     rememberme: false,
     email: '',
     password: ''
  };
  auth2: any;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  signIn(frmLogin: NgModel) {
    console.log(this.TAG, 'login go to dashboard frmLogin: ', frmLogin);
    this._authService.doLogin(this.login).subscribe(
      success => {
        console.log(this.TAG, 'login success: ', success);
        this._router.navigate(['/dashboard']);
      },
      err => {
        console.error(this.TAG, 'Login error, Error: ', err);
      }
    );
    // this._router.navigate(['dashboard']);
  }

  ngOnInit() {
    initPlugins();
    this.googleInit();
    if (this._authService.getAuthUser()) {
      this.login.email = this._authService.getAuthUser().email;
      if (this.login.email !== '' && this.login.email.indexOf('@') !== -1) {
        this.login.rememberme = true;
      }
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '761652014368-224p92osr9a085p36er7b3pgg6hvqg61.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {}, (googleuser) => {
      const profile = googleuser.getBasicProfile();
      console.log(this.TAG, 'PROFILE: ', profile);
      const token = googleuser.getAuthResponse().id_token;
      console.log(this.TAG, 'TOKEN: ', token);
      this._authService.doLoginWithOAuth({token: token}).subscribe(
        success => {
          console.log(this.TAG, 'success login with oauth google token ', success);
          this._router.navigate(['/dashboard']);
        },
        error => {
          console.error(this.TAG, 'error al intentar autenticarse con sign in de google error: ', error);
        }
      );
    } );
  }

}
