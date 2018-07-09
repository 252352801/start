import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SliderComponent } from './slider.component'
@NgModule({
  imports:[
    CommonModule,
  ],
  declarations: [
    SliderComponent
  ],
  providers: [],
  exports: [
    SliderComponent
  ]
})
export class SliderModule {
}
