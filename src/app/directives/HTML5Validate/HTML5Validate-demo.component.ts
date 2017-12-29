import { Component} from '@angular/core';
@Component({
    selector: 'HTML5Validate-demo',
    templateUrl: './HTML5Validate-demo.component.html',
    styleUrls: ['./HTML5Validate-demo.component.less'],
  providers:[]
})
export class HTML5ValidateDemoComponent {
  name:string='';
  num:number=null;
  tabIndex:number=1;
  constructor(

  ){}
  changTab(index:number){
    this.tabIndex=index;
  }

}
