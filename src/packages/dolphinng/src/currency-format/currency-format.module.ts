import {NgModule} from '@angular/core';
//directives
import {CurrencyFormatDirective} from './currency-format.deirective';
import {CurrencyFormatPipe} from './currency-format.pipe';
@NgModule({
  imports:[
  ],
  declarations: [
    CurrencyFormatDirective,
    CurrencyFormatPipe
  ],
  providers: [],
  exports: [
    CurrencyFormatDirective,
    CurrencyFormatPipe
  ]
})
export class CurrencyFormatModule {
}
