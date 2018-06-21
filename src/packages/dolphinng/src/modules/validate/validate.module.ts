import {NgModule} from '@angular/core';

import {HTML5ValidateDirective} from '../../directives/HTML5Validate/HTML5Validate.directive';
@NgModule({
  imports:[],
  declarations: [
    HTML5ValidateDirective
  ],
  providers: [],
  exports: [
    HTML5ValidateDirective
  ]
})
export class ValidateModule {
}
