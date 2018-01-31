import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SharedService,
  SidebarService,
  ConfigService,
  AuthService,
  UserService,
  LoginGuard,
  FileUploadService
} from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    AuthService,
    LoginGuard,
    FileUploadService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (conf: ConfigService) => function() { return conf.load().subscribe(); },
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class ServiceModule { }
