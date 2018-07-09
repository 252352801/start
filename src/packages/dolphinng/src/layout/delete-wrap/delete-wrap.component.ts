import {Component,Input,Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'delete-wrap',
  templateUrl:'./delete-wrap.component.html',
  styleUrls:['./delete-wrap.component.less']
})
export class DeleteWrapComponent{
  @Input() size:string='md';
  @Output() remove:EventEmitter<any>=new EventEmitter();
  constructor(){

  }
  btnRemoveAction(event){
    this.remove.emit(event);
  }

}
