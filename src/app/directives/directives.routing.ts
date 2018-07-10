import {Routes, RouterModule} from '@angular/router';
import {DirectivesComponent} from './directives.component';
import { AreaPickerDemoComponent }   from './area-picker/area-picker-demo.component';
import { CurrencyFormatDemoComponent }   from './currency-format/currency-format-demo.component';
import { HTML5ValidateDemoComponent }   from './html5-validate/html5-validate-demo.component';
import { TextMaxLengthDemoComponent }   from './text-max-length/text-max-length-demo.component';
import { ToggleClassDemoComponent }   from './toggle-class/toggle-class-demo.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: DirectivesComponent
  },
  {path: 'areaPickerDemo', component: AreaPickerDemoComponent, data: {title: '地区选择'}},
  {path: 'currencyFormatDemo', component: CurrencyFormatDemoComponent, data: {title: '输入金额格式化'}},
  {path: 'HTML5ValidateDemo', component: HTML5ValidateDemoComponent, data: {title: '自定义HTML5校验'}},
  {path: 'textMaxLengthDemo', component: TextMaxLengthDemoComponent, data: {title: '文字最大长度'}},
  {path: 'toggleClassDemo', component: ToggleClassDemoComponent, data: {title: 'toggleClass'}},

];
export const routing = RouterModule.forChild(routes);
