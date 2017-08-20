import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
import { SpinnerDemoComponent} from './spinner-demo/spinner-demo.component';
import { SearchbarDemoComponent} from './searchbar-demo/searchbar-demo.component';
import { GalleryDemoComponent} from './gallery-demo/gallery-demo.component';
import { UploaderDemoComponent} from './uploader-demo/uploader-demo.component';
import { DeleteWrapDemoComponent} from './delete-wrap-demo/delete-wrap-demo.component';
const routes: Routes = <Routes>[
    {
        path: '',
        component: ComponentsComponent
    },
  { path: 'modalDemo', component:ModalDemoComponent,data:{title:'模态框'} },
  { path: 'paginatorDemo', component:PaginatorDemoComponent,data:{title:'分页'} },
  { path: 'layoutComponents', component:LayoutComponentsComponent,data:{title:'布局组件'} },
  { path: 'spinnerDemo', component:SpinnerDemoComponent,data:{title:'Spinner'} },
  { path: 'searchbarDemo', component:SearchbarDemoComponent,data:{title:'Searchbar'} },
  { path: 'galleryDemo', component:GalleryDemoComponent,data:{title:'画廊'} },
  { path: 'uploaderDemo', component:UploaderDemoComponent,data:{title:'文件上传'} },
  { path: 'deleteWrapDemo', component:DeleteWrapDemoComponent,data:{title:'右上角删除控件'} }


];
export const routing = RouterModule.forChild(routes);
