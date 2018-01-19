import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent, SignInComponent, MainComponent } from './';
import { UserRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule
  ],
  declarations: [SignUpComponent, SignInComponent, MainComponent]
})
export class UserModule { }
