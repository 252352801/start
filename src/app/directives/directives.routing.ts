import {Routes, RouterModule} from '@angular/router';
import {DirectivesComponent} from './directives.component';
import {AreaPickerDemoComponent}   from './areaPicker/area-picker-demo.component';
import { CurrencyFormatDemoComponent }   from './currencyFormat/currency-format-demo.component';
import { HTML5ValidateDemoComponent }   from './HTML5Validate/HTML5Validate-demo.component';
import { TextMaxLengthDemoComponent }   from './textMaxLength/text-max-length-demo.component';
const routes: Routes = <Routes>[
  {
    path: '',
    component: DirectivesComponent
  },
  {path: 'areaPickerDemo', component: AreaPickerDemoComponent, data: {title: '地区选择'}},
  {path: 'currencyFormatDemo', component: CurrencyFormatDemoComponent, data: {title: '输入金额格式化'}},
  {path: 'HTML5ValidateDemo', component: HTML5ValidateDemoComponent, data: {title: '自定义HTML5校验'}},
  {path: 'textMaxLengthDemo', component: TextMaxLengthDemoComponent, data: {title: '文字最大长度'}},

];
export const routing = RouterModule.forChild(routes);
