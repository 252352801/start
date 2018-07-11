import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { ElementsComponent } from './elements/elements.component';
import { routing } from './form.routing';
@NgModule({
    imports: [
      routing,
      SharedModule
    ],
    declarations: [
      FormComponent,
      ElementsComponent

    ]
})
export class FormModule { }
