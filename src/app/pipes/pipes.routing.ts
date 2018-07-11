import { Routes, RouterModule } from '@angular/router';
import { PipesComponent } from './pipes.component';
import { DatePipeDemoComponent } from './date/date-pipe-demo.component';
import { CurrencyPipeDemoComponent } from './currency/currency-pipe-demo.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: PipesComponent
  },
  {
    path: 'date',
    component: DatePipeDemoComponent,
    data: { title: '日期格式化' }
  },
  {
    path: 'currency',
    component: CurrencyPipeDemoComponent,
    data: { title: '货币格式化' }
  },
];
export const routing = RouterModule.forChild(routes);
