import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  TAG = 'HeaderComponent :: ';
  authUser: any;

  constructor(
    public _authService: AuthService,
    private _router: Router
  ) {

  }

  doLogOut() {
    this._authService.doLogOut();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    this.authUser = this._authService.getAuthUser();
    console.log(this.TAG, 'ngOnInit() authUser: ', this.authUser);
  }

}
