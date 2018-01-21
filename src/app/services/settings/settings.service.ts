import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  settings: SettingsConfig = {
    themeUrl: '/assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(
    @Inject(DOCUMENT) private _document
  ) { }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
    this.appyTheme(this.settings.theme);
  }

  appyTheme(themeColor: string){
    const theme = `/assets/css/colors/${themeColor}.css`;
    this._document.getElementById('colorTheme').setAttribute('href', theme);

    /** Persistencia de valores cambiados */
    this.settings.theme = themeColor;
    this.settings.themeUrl = theme;
    this.saveSettings();
  }

}

interface SettingsConfig{
  themeUrl: string;
  theme: string;
}
