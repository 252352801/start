import {NgModule} from '@angular/core';

import {AreaPickerDirective} from '../../directives/areaPicker/areaPicker.directive';
@NgModule({
  imports:[],
  declarations: [
    AreaPickerDirective
  ],
  providers: [],
  exports: [
    AreaPickerDirective
  ]
})
export class AreaPickerModule {
}
export {AreaPicker} from '../../directives/areaPicker/areaPicker.directive';
