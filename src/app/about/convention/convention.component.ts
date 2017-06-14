import { Component} from '@angular/core';
@Component({
    selector: 'convention',
    templateUrl: './convention.component.html',
    styleUrls: ['./convention.component.less'],
})
export class ConventionComponent {
  tabIndex:number=1;//1:css相关 2:js相关 3：angular相关
  constructor(){
  }
  changTab(tabIndex:number){
    this.tabIndex=tabIndex;
  }
}
