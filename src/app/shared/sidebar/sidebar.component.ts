import { Component, OnInit } from '@angular/core';
import { SidebarService, AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  TAG = 'SidebarComponent :: ';
  authUser: any;

  constructor(
    public _sidebarService: SidebarService,
    public _authService: AuthService,
    private _router: Router
  ) { }

  doLogOut() {
    this._authService.doLogOut();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    this.authUser = this._authService.getAuthUser();
    this._sidebarService.loadMenu();
    console.log(this.TAG, 'ngOnInit() authUser: ', this.authUser, ' menu: ', this._sidebarService.menu);
  }

}
