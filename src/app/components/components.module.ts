import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
    declarations: [IncrementadorComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [IncrementadorComponent],
    providers: [],
})
export class ComponentsModule {}
