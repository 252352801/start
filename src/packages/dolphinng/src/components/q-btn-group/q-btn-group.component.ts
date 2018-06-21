import { Component} from '@angular/core';
@Component({
  selector: 'q-btn-group',
  templateUrl: './q-btn-group.component.html',
  styleUrls: ['./q-btn-group.component.less']
})
export class QBtnGroupComponent {

  constructor(){

  }
  goTop(){
    {
      if(document.documentElement){
        document.documentElement.scrollTop=0;
      }
      if(document.body){
        document.body.scrollTop=0;
      }
    }
  }
  back(){
    history.back();
  }
}
