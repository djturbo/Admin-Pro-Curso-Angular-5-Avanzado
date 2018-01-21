import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { CustomGraphicComponent } from './custom-graphic/custom-graphic.component';

@NgModule({
    declarations: [IncrementadorComponent, CustomGraphicComponent],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule
    ],
    exports: [
        IncrementadorComponent,
        CustomGraphicComponent],
    providers: [],
})
export class ComponentsModule {}
