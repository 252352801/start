import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { PopDemoComponent } from './pop-demo/pop-demo.component';
import { PopupDemoComponent } from './popup-demo/popup-demo.component';
import { ToasterDemoComponent } from './toaster-demo/toaster-demo.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: ServicesComponent
    },
    {
        path: 'pop',
        component: PopDemoComponent
    },
    {
        path: 'popup',
        component: PopupDemoComponent
    },
    {
        path: 'toaster',
        component: ToasterDemoComponent
    }


];
export const routing = RouterModule.forChild(routes);
