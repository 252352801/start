import { Component} from '@angular/core';
@Component({
    selector: 'currency-format-demo.',
    templateUrl: './currency-format-demo.component.html',
    styleUrls: ['./currency-format-demo.component.less'],
  providers:[]
})
export class CurrencyFormatDemoComponent {
  amount:number=null;
  tabIndex:number=1;
  constructor(

  ){}
  changTab(index:number){
    this.tabIndex=index;
  }

}
