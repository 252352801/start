import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule}         from '@angular/forms';
import {RadioComponent} from './radio.component';
@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  declarations: [
    RadioComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    RadioComponent
  ]
})
export class RadioModule {
}
