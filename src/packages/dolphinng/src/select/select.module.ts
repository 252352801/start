import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    SelectComponent
  ]
})
export class SelectModule {
}
