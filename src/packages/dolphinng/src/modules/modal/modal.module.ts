import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from '../../components/modal/modal.component';
import {ModalHeaderComponent} from '../../components/modal/modal-header.component';
import {ModalBodyComponent} from '../../components/modal/modal-body.component';
import {ModalFooterComponent} from '../../components/modal/modal-footer.component';
@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  providers: [],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ]
})
export class ModalModule {
}
