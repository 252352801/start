import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ConventionComponent } from './convention/convention.component';
import { BuildComponent }   from './build/build.component';
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
  },
  {
    path: 'build',
    component: BuildComponent
  }
];
export const routing = RouterModule.forChild(routes);
