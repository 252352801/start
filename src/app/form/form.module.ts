import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormComponent }   from './form.component';
import { ListDemoComponent } from './list-demo/list-demo.component';
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
      ListDemoComponent,
      ElementsComponent

    ]
})
export class FormModule { }
