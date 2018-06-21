import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DropDownComponent } from '../../components/drop-down/drop-down.component'
@NgModule({
  imports:[
    CommonModule,
  ],
  declarations: [
    DropDownComponent
  ],
  providers: [],
  exports: [
    DropDownComponent
  ]
})
export class DropDownModule {
}
