import { Component, OnInit } from '@angular/core';
import { SidebarService, AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sidebarService: SidebarService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  doLogOut() {
    this._authService.doLogOut();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
