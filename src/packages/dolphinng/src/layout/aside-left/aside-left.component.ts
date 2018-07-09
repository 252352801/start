import { Component,Input,Output} from '@angular/core';
@Component({
  selector: 'aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.less']
})
export class AsideLeftComponent {
  @Input() theme:string='';
  constructor(){

  }
}
