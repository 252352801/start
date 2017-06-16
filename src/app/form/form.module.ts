import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';
import { CheckboxDemoComponent } from './checkbox-demo/checkbox-demo.component';
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import { routing } from './form.routing';
@NgModule({
    imports: [
      routing,
      SharedModule,
      PDataTableModule,
      PSharedModule
    ],
    declarations: [
      FormComponent,
      DatePickerDemoComponent,
      CheckboxDemoComponent
    ]
})
export class FormModule { }
