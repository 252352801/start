import {NgModule} from '@angular/core';

//components

import {QBtnGroupModule} from '../q-btn-group/q-btn-group.module';
//directives
import {BtnBackModule} from '../btn-back/btn-back.module';
import {TextMaxLengthModule} from '../text-max-length/text-max-length.module';
import {ToggleClassModule} from '../toggle-class/toggle-class.module';
@NgModule({
  imports:[
    QBtnGroupModule,
    BtnBackModule,
    TextMaxLengthModule,
    ToggleClassModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    QBtnGroupModule,
    BtnBackModule,
    TextMaxLengthModule,
    ToggleClassModule
  ]
})
export class CommonModule {
}
