import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
import { NavComponentsComponent} from './nav-components/nav-components.component';
import { SpinnerDemoComponent} from './spinner-demo/spinner-demo.component';
import { SearchbarDemoComponent} from './searchbar-demo/searchbar-demo.component';
import { GalleryDemoComponent} from './gallery-demo/gallery-demo.component';
import { DropDownDemoComponent} from './drop-down-demo/dropdown-demo.component';
import { SlideDownDemoComponent} from './slide-down-demo/slide-down-demo.component';
import { UploaderDemoComponent} from './uploader-demo/uploader-demo.component';
import { DeleteWrapDemoComponent} from './delete-wrap-demo/delete-wrap-demo.component';
import { SliderDemoComponent} from './slider/slider-demo.component';
import { DatetimePickerComponent} from './datetime-picker-demo/datetime-picker-demo.component';
import { CheckboxDemoComponent} from './checkbox-demo/checkbox-demo.component';
import { RadioDemoComponent} from './radio-demo/radio-demo.component';
import { ToggleDemoComponent} from './toggle-demo/toggle-demo.component';
import { SwitchDemoComponent } from './switch-demo/switch-demo.component';
import { SelectDemoComponent} from './select-demo/select-demo.component';
const routes: Routes = <Routes>[
    {
        path: '',
        component: ComponentsComponent
    },
  { path: 'modalDemo', component:ModalDemoComponent,data:{title:'模态框'} },
  { path: 'paginatorDemo', component:PaginatorDemoComponent,data:{title:'分页'} },
  { path: 'layoutComponents', component:LayoutComponentsComponent,data:{title:'布局组件'} },
  { path: 'navComponents', component:NavComponentsComponent,data:{title:'左侧菜单组件'} },
  { path: 'spinnerDemo', component:SpinnerDemoComponent,data:{title:'Spinner'} },
  { path: 'searchbarDemo', component:SearchbarDemoComponent,data:{title:'Searchbar'} },
  { path: 'galleryDemo', component:GalleryDemoComponent,data:{title:'画廊'} },
  { path: 'dropDownDemo', component:DropDownDemoComponent,data:{title:'drop-down'} },
  { path: 'slideDownDemo', component:SlideDownDemoComponent,data:{title:'slide-down'} },
  { path: 'uploaderDemo', component:UploaderDemoComponent,data:{title:'文件上传'} },
  { path: 'deleteWrapDemo', component:DeleteWrapDemoComponent,data:{title:'右上角删除控件'} },
  { path: 'sliderDemo', component:SliderDemoComponent,data:{title:'滑块'} },
  { path: 'datetimePickerDemo', component:DatetimePickerComponent,data:{title:'时间日期选择器'} },
  { path: 'checkboxDemo', component:CheckboxDemoComponent,data:{title:'checkbox'} },
  { path: 'radioDemo', component:RadioDemoComponent,data:{title:'radio'} },
  { path: 'toggleDemo', component:ToggleDemoComponent,data:{title:'toggle'} },
  { path: 'switchDemo', component:SwitchDemoComponent,data:{title:'switch'} },
  { path: 'selectDemo', component:SelectDemoComponent,data:{title:'select'} },


];
export const routing = RouterModule.forChild(routes);
