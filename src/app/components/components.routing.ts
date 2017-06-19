import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { PaginatorDemoComponent, } from './paginator-demo/paginator-demo.component';
import { LayoutComponentsComponent} from './layout-components/layout-components.component';
const routes: Routes = <Routes>[
    {
        path: '',
        component: ComponentsComponent
    },
  { path: 'modalDemo', component:ModalDemoComponent,data:{title:'模态框'} },
  { path: 'paginatorDemo', component:PaginatorDemoComponent,data:{title:'分页'} },
  { path: 'layoutComponents', component:LayoutComponentsComponent,data:{title:'布局组件'} }


];
export const routing = RouterModule.forChild(routes);
