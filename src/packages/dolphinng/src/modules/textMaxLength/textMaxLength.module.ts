import {NgModule} from '@angular/core';

import {TextMaxLengthDirective} from '../../directives/textMaxLength/textMaxLength.directive';
@NgModule({
  imports:[],
  declarations: [
    TextMaxLengthDirective
  ],
  providers: [],
  exports: [
    TextMaxLengthDirective
  ]
})
export class TextMaxLengthModule {
}
