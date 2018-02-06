import { Injectable } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Injectable()
export class SidebarService {
  public menu: any[] = [];

  constructor(
    private _authService: AuthService
  ) {
    this.menu = _authService.menu;
  }

  loadMenu() {
    this.menu = this._authService.menu;
  }

}
