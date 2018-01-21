import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
    UserMainComponent,
    SignUpComponent,
    SignInComponent } from './';


const routes: Routes = [
    {
        path: 'user',
        component: UserMainComponent,
        children: [
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: '', component: SignInComponent },
            { path: '**', redirectTo: 'user', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
