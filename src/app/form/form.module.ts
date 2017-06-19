import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';
import { CheckboxDemoComponent } from './checkbox-demo/checkbox-demo.component';
import { RadioDemoComponent } from './radio-demo/radio-demo.component';
import { ToggleDemoComponent } from './toggle-demo/toggle-demo.component';
import { SelectDemoComponent } from './select-demo/select-demo.component';
import { ElementsComponent } from './elements/elements.component';
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
      CheckboxDemoComponent,
      RadioDemoComponent,
      ToggleDemoComponent,
      SelectDemoComponent,
      ElementsComponent

    ]
})
export class FormModule { }
