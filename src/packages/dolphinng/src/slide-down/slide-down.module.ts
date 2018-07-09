import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideDownComponent } from './slide-down.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SlideDownComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    SlideDownComponent
  ]
})
export class SlideDownModule {
}
