import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';
import { routing } from './form.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      FormComponent,
      DatePickerDemoComponent
    ]
})
export class FormModule { }
