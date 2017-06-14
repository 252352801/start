import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';

const routes: Routes = <Routes>[
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'datePickerDemo',
    component: DatePickerDemoComponent
  }
];
export const routing = RouterModule.forChild(routes);
