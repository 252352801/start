import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectivesComponent }   from './directives.component';
import { AreaPickerDemoComponent }   from './areaPicker/area-picker-demo.component';
import { CurrencyFormatDemoComponent }   from './currencyFormat/currency-format-demo.component';
import { HTML5ValidateDemoComponent }   from './HTML5Validate/HTML5Validate-demo.component';
import { TextMaxLengthDemoComponent }   from './textMaxLength/text-max-length-demo.component';
import { routing } from './directives.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      DirectivesComponent,
      AreaPickerDemoComponent,
      CurrencyFormatDemoComponent,
      HTML5ValidateDemoComponent,
      TextMaxLengthDemoComponent
    ]
})
export class DirectivesModule { }
