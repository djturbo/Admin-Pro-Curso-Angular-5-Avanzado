import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent, SignInComponent, UserMainComponent } from './';
import { UserRoutingModule } from './user-routing.module';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
    UserMainComponent,
    AccountSettingComponent,
    ProfileComponent]
})
export class UserModule { }
