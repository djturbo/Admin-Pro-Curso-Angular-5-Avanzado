import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { CustomGraphicComponent } from './custom-graphic/custom-graphic.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadService } from './modal-upload/modal-upload.service';

@NgModule({
    declarations: [IncrementadorComponent, CustomGraphicComponent, ModalUploadComponent],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ],
    exports: [
        IncrementadorComponent,
        CustomGraphicComponent,
        ModalUploadComponent],
    providers: [
        ModalUploadService
    ],
})
export class ComponentsModule {}
