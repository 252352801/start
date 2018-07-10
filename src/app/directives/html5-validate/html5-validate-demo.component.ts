import { Component} from '@angular/core';
@Component({
    selector: 'html5-validate-demo',
    templateUrl: './html5-validate-demo.component.html',
    styleUrls: ['./html5-validate-demo.component.less'],
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
