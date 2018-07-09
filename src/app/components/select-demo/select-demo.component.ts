import { Component} from '@angular/core';
@Component({
    selector: 'select-demo',
    templateUrl: './select-demo.component.html',
    styleUrls: ['./select-demo.component.less'],
})
export class SelectDemoComponent {
  selectValue='';
  options=[{
    label:'请选择',
    value:'',
  },{
    label:'小明',
    value:'1',
  },{
    label:'小强',
    value:'2',
  },{
    label:'大胖',
    value:'3',
  }];

  tabIndex:number=1;
  constructor(){
  }

  changTab(index:number){
    this.tabIndex=index;
  }
}
