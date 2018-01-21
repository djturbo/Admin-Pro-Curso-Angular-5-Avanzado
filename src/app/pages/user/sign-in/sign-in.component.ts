import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare function initPlugins();
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  TAG = 'SignInComponent :: ';
  constructor(
    private _router: Router
  ) { }

  signIn() {
    console.log(this.TAG, 'login go to dashboard');
    this._router.navigate(['dashboard']);
  }

  ngOnInit() {
    initPlugins();
  }

}
