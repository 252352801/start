import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ConventionComponent } from './convention/convention.component';

const routes:Routes = <Routes>[
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'explanation',
    component: ExplanationComponent
  },
  {
    path: 'convention',
    component: ConventionComponent
  }
];
export const routing = RouterModule.forChild(routes);
