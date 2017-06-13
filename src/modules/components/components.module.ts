import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsComponent }   from './components.component';
import { ModalDemoComponent, } from './modal-demo/modal-demo.component';
import { ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent } from '../../components/modal/modal.component';
import { routing } from './components.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      ComponentsComponent,
      ModalDemoComponent,
      ModalComponent,
      ModalHeaderComponent,
      ModalBodyComponent,
      ModalFooterComponent
    ]
})
export class ComponentsModule { }
