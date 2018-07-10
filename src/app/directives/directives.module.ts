import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectivesComponent }   from './directives.component';
import { AreaPickerDemoComponent }   from './area-picker/area-picker-demo.component';
import { CurrencyFormatDemoComponent }   from './currency-format/currency-format-demo.component';
import { HTML5ValidateDemoComponent }   from './html5-validate/html5-validate-demo.component';
import { TextMaxLengthDemoComponent }   from './text-max-length/text-max-length-demo.component';
import { ToggleClassDemoComponent }   from './toggle-class/toggle-class-demo.component';
import { routing } from './directives.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      DirectivesComponent,
      AreaPickerDemoComponent,
      CurrencyFormatDemoComponent,
      HTML5ValidateDemoComponent,
      TextMaxLengthDemoComponent,
      ToggleClassDemoComponent,
    ]
})
export class DirectivesModule { }
