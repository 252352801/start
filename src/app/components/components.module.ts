import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsComponent }   from './components.component';
import { ModalDemoComponent, } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
import { SpinnerDemoComponent} from './spinner-demo/spinner-demo.component';
import { SearchbarComponent} from './searchbar/searchbar.component';
import { SearchbarDemoComponent} from './searchbar-demo/searchbar-demo.component';
import { GalleryDemoComponent} from './gallery-demo/gallery-demo.component';
import { UploaderDemoComponent} from './uploader-demo/uploader-demo.component';
import { DeleteWrapDemoComponent} from './delete-wrap-demo/delete-wrap-demo.component';
import { ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent,SpinnerComponent} from 'dolphinng';
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
      SpinnerComponent,
      PaginatorDemoComponent,
      LayoutComponentsComponent,
      SearchbarDemoComponent,
      SpinnerDemoComponent,
      SearchbarComponent,
      GalleryDemoComponent,
      UploaderDemoComponent,
      DeleteWrapDemoComponent
    ]
})
export class ComponentsModule { }
