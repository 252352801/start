import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { routing } from './form.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      FormComponent
    ]
})
export class FormModule { }
