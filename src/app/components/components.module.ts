import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsComponent }   from './components.component';
import { ModalDemoComponent, } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
import { NavComponentsComponent} from './nav-components/nav-components.component';
import { SpinnerDemoComponent} from './spinner-demo/spinner-demo.component';
import { SearchbarComponent} from './searchbar/searchbar.component';
import { SearchbarDemoComponent} from './searchbar-demo/searchbar-demo.component';
import { GalleryDemoComponent} from './gallery-demo/gallery-demo.component';
import { DropDownDemoComponent} from './drop-down-demo/dropdown-demo.component';
import { UploaderDemoComponent} from './uploader-demo/uploader-demo.component';
import { DeleteWrapDemoComponent} from './delete-wrap-demo/delete-wrap-demo.component';
import { SliderDemoComponent} from './slider/slider-demo.component';
import { DatetimePickerComponent} from './datetime-picker-demo/datetime-picker-demo.component';
import { CheckboxDemoComponent} from './checkbox-demo/checkbox-demo.component';
import { RadioDemoComponent} from './radio-demo/radio-demo.component';
import { ToggleDemoComponent} from './toggle-demo/toggle-demo.component';
import { SelectDemoComponent} from './select-demo/select-demo.component';
import { ModalModule} from 'dolphinng';
import { LoaderModule} from 'dolphinng';
import { LayoutModule} from 'dolphinng';
import { routing } from './components.routing';
@NgModule({
    imports: [
      routing,
      SharedModule,
      ModalModule,
      LoaderModule,
      LayoutModule
    ],
    declarations: [
      ComponentsComponent,
      ModalDemoComponent,
      PaginatorDemoComponent,
      LayoutComponentsComponent,
      NavComponentsComponent,
      SearchbarDemoComponent,
      SpinnerDemoComponent,
      SearchbarComponent,
      GalleryDemoComponent,
      DropDownDemoComponent,
      UploaderDemoComponent,
      DeleteWrapDemoComponent,
      SliderDemoComponent,
      DatetimePickerComponent,
      CheckboxDemoComponent,
      RadioDemoComponent,
      ToggleDemoComponent,
      SelectDemoComponent,
    ]
})
export class ComponentsModule { }
