import { Component} from '@angular/core';
@Component({
    selector: 'spinner-demo',
    templateUrl: './spinner-demo.component.html',
    styleUrls: ['./spinner-demo.component.less'],
})
export class SpinnerDemoComponent {
  tabIndex:number=1;
  changTab(index:number){
    this.tabIndex=index;
  }
}
