import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsComponent }   from './components.component';
import { ModalDemoComponent, } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
import { ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent } from 'dolphinng';
import { routing } from './components.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      ComponentsComponent,
      ModalDemoComponent,
      ModalComponent,
      ModalHeaderComponent,
      ModalBodyComponent,
      ModalFooterComponent,
      PaginatorDemoComponent,
      LayoutComponentsComponent
    ]
})
export class ComponentsModule { }
