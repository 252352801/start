import {NgModule} from '@angular/core';

//components

import {QBtnGroupModule} from '../qBtnGroup/qBtnGroup.module';
//directives
import {BtnBackModule} from '../btnBack/btnBack.module';
import {TextMaxLengthModule} from '../textMaxLength/textMaxLength.module';
import {ToggleClassModule} from '../toggleClass/toggleClass.module';
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
