import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModalDemoComponent }   from './modal-demo.component';
import { ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent }   from '../../components/modal/modal.component';
import { routing } from './modal-demo.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      ModalDemoComponent,
      ModalComponent,
      ModalHeaderComponent,
      ModalBodyComponent,
      ModalFooterComponent
    ]
})
export class ModalDemoModule { }
