import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';
import { CheckboxDemoComponent } from './checkbox-demo/checkbox-demo.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'datePickerDemo',
    component: DatePickerDemoComponent
  },
  {
    path: 'checkboxDemo',
    component: CheckboxDemoComponent
  }
];
export const routing = RouterModule.forChild(routes);
