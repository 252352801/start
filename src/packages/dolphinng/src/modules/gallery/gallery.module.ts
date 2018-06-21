import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleryComponent} from '../../components/gallery/gallery.component';
@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [
    GalleryComponent
  ],
  providers: [],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule {
}
