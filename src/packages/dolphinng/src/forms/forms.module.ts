import {NgModule} from '@angular/core';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {RadioModule}  from '../radio/radio.module';
import {ToggleModule} from '../toggle/toggle.module';
import {ValidateModule} from '../validate/validate.module';
@NgModule({
  imports:[
    CheckboxModule,
    RadioModule,
    ToggleModule,
    ValidateModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    CheckboxModule,
    RadioModule,
    ToggleModule,
    ValidateModule
  ]
})
export class FormsModule {
}
