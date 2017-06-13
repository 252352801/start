import { Routes, RouterModule } from '@angular/router';
import { PagesComponent }   from './pages.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: PagesComponent
    }
  

];
export const routing = RouterModule.forChild(routes);
