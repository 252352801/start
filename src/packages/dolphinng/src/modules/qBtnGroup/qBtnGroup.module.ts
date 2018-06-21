import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule}         from '@angular/forms';
import {QBtnGroupComponent} from '../../components/q-btn-group/q-btn-group.component';
@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  declarations: [
    QBtnGroupComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    QBtnGroupComponent
  ]
})
export class QBtnGroupModule {
}
