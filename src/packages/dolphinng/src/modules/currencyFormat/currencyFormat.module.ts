import {NgModule} from '@angular/core';
//directives
import {CurrencyFormatDirective} from '../../directives/currencyFormat/currencyFormat.deirective';
import {CurrencyFormatPipe} from '../../pipes/currencyFormat/currencyFormat.pipe';
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
