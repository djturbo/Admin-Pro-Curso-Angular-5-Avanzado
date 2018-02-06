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
import { LoginGuard, AdminGuard } from './services';
import { UsersComponent } from './pages/users/users.component';
import { HospitalsComponent } from './pages/hospitals/hospitals.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { MedicoComponent } from './pages/medicos/medico.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthService } from './services/user/auth.service';

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
            { path: 'profile/:id', component: ProfileComponent, data: {title: 'Perfil'} },
            { path: 'search/:toSearch', component: SearchComponent, data: {title: 'Búsqueda'} },
            /** Mantenimiento */
            { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: {title: 'Usuarios'} },
            { path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitales'} },
            { path: 'doctors', component: MedicosComponent, data: {title: 'Medicos'} },
            { path: 'doctor/:id', component: MedicoComponent, data: {title: 'Actualizar Medico'} },
            /** Fin Mantenimiendo */
            /*{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', component: NotFoundComponent }*/
        ] },
    { path: 'login', redirectTo: 'user/sign-in', pathMatch: 'full', data: { title: 'Log In' }},
    { path: 'registrar', redirectTo: 'user/sign-up', pathMatch: 'full', data: { title: 'Registrar' }},
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
