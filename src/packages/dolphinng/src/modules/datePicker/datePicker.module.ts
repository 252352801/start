import {NgModule} from '@angular/core';
//directives
import {DatePickerDirective} from '../../directives/datePicker/datePicker.directive';
@NgModule({
  imports:[
  ],
  declarations: [
    DatePickerDirective
  ],
  providers: [],
  exports: [
    DatePickerDirective
  ]
})
export class DatePickerModule {
}
