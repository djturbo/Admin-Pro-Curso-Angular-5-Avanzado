import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainComponent } from './pages/main.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { AccountSettingComponent } from './pages/user/index';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas', component: Graficas1Component },
        { path: 'account-setting', component: AccountSettingComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ] },
    { path: 'login', redirectTo: 'user/sign-in', pathMatch: 'full'},
    { path: 'registrar', redirectTo: 'user/sign-up', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
