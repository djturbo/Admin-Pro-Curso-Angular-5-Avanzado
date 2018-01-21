import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../../services';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT)private _document,
    private _settingsService: SettingsService
  ) {

   }

  changeThemeColor(themeColor: string, link: any) {
    this._settingsService.appyTheme(themeColor);

    this.setActivated(link);
  }

  setActivated(link?: any) {
    const selectores: any = this._document.getElementsByClassName('selector');
    if (link) {
      for (const ref of selectores) {
        ref.classList.remove('working');
      }
      link.classList.add('working');
    } else {
      const settingsTheme = JSON.parse(localStorage.getItem('settings')).theme;

      for (const ref of selectores) {
        if (settingsTheme === ref.getAttribute('data-theme')) {
          ref.classList.add('working');
        }
      }
    }
  }
  ngOnInit() {
    this.setActivated();
  }

}
