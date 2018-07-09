import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import {DatetimePickerComponent} from './datetime-picker.component';
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DatetimePickerComponent
  ],
  providers: [],
  exports: [
    DatetimePickerComponent
  ]
})
export class DatetimePickerModule {
}
