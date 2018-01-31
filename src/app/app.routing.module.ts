import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MainComponent } from './pages/main.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { AccountSettingComponent, ProfileComponent } from './pages/user/index';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { LoginGuard } from './services/index';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [LoginGuard],
        children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
        { path: 'graficas', component: Graficas1Component, data: { title: 'Graficas' } },
        { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS Observables/Observer' } },
        { path: 'account-setting', component: AccountSettingComponent, data: { title: 'Dashboard' } },
        { path: 'profile', component: ProfileComponent, data: {title: 'Perfil'} },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ] },
    { path: 'login', redirectTo: 'user/sign-in', pathMatch: 'full', data: { title: 'Log In' }},
    { path: 'registrar', redirectTo: 'user/sign-up', pathMatch: 'full', data: { title: 'Registrar' }},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
