import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
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
