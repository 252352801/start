import { Component} from '@angular/core';
@Component({
    selector: 'about-build',
    templateUrl: './build.component.html',
    styleUrls: ['./build.component.less'],
})
export class BuildComponent {
  tabIndex:number=1;//1:css相关 2:js相关 3：angular相关
  constructor(){
  }
  changTab(tabIndex:number){
    this.tabIndex=tabIndex;
  }
}
