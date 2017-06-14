import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: ComponentsComponent
    },
  { path: 'modal-demo', component:ModalDemoComponent,data:{title:'模态框'} },


];
export const routing = RouterModule.forChild(routes);
