import {NgModule} from '@angular/core';
import {UploaderDirective} from './uploader.directive';
@NgModule({
  declarations: [
    UploaderDirective
  ],
  providers: [],
  exports: [
    UploaderDirective,
  ]
})
export class UploaderModule {
}
export * from './Uploader';
export * from './UploadFile';
