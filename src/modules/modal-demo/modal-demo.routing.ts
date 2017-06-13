import { Routes, RouterModule } from '@angular/router';
import { ModalDemoComponent } from './modal-demo.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: ModalDemoComponent
    }


];
export const routing = RouterModule.forChild(routes);
