import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { DatePickerDemoComponent } from './date-picker-demo/date-picker-demo.component';
import { CheckboxDemoComponent } from './checkbox-demo/checkbox-demo.component';
import { RadioDemoComponent } from './radio-demo/radio-demo.component';
import { ToggleDemoComponent } from './toggle-demo/toggle-demo.component';
import { SelectDemoComponent } from './select-demo/select-demo.component';
import { ElementsComponent } from './elements/elements.component';
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
  },
  {
    path: 'radioDemo',
    component: RadioDemoComponent
  },
  {
    path: 'toggleDemo',
    component: ToggleDemoComponent
  },
  {
    path: 'selectDemo',
    component: SelectDemoComponent
  },
  {
    path: 'elements',
    component: ElementsComponent
  }
];
export const routing = RouterModule.forChild(routes);
