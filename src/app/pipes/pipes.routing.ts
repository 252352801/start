import {Routes, RouterModule} from '@angular/router';
import {PipesComponent} from './pipes.component';
import {DatePipeDemoComponent} from './date/date-pipe-demo.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: PipesComponent
  },
  {
    path: 'date',
    component: DatePipeDemoComponent,
    data: {title: '管道'}
  }
];
export const routing = RouterModule.forChild(routes);
