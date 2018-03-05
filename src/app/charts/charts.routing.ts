import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent }   from './charts.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: ChartsComponent
  }
];
export const routing = RouterModule.forChild(routes);
