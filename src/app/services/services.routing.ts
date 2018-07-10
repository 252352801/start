import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { PopDemoComponent } from './pop-demo/pop-demo.component';
import { PopupDemoComponent } from './popup-demo/popup-demo.component';
import { ToasterDemoComponent } from './toaster-demo/toaster-demo.component';
import { TracertDemoComponent }   from './tracert-demo/tracert-demo.component';
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
    },
    {
        path: 'tracert',
        component: TracertDemoComponent
    }


];
export const routing = RouterModule.forChild(routes);
