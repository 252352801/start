import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: [],
  exports: [
    SpinnerComponent
  ]
})
export class LoaderModule {
}
