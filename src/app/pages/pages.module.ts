import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { MainComponent } from '../pages/main.component';
import { UserModule } from '../pages/user/user.module';
@NgModule({
    declarations: [
        NotFoundComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        UserModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    providers: [],
})
export class PagesModule {}