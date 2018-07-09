import { Component,Input,Output,OnInit,EventEmitter} from '@angular/core';
@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less']
})
export class SwitchComponent implements OnInit{
  @Input() value:any;
  @Output() valueChange:EventEmitter<any>=new EventEmitter();
  @Input() size:string;
  @Input() display:string;
  @Input() disabled:string;
  @Input() type:string;
  @Input() styleClass:string;
  @Input() auto:boolean=true;
  @Output() action:EventEmitter<any>=new EventEmitter();
  @Input() name:string;
  constructor(){

  }
  ngOnInit(){
  }
  toggleCheck(ev){
    if(!this.disabled) {
      if(!this.auto){
        this.action.emit(this.value);
      }else{
        let target=ev.target||ev.srcElement;
        if(target.nodeName!=='INPUT'){
          this.value = !this.value;
          this.valueChange.emit(this.value);
        }
      }
    }
  }
  toggle(ev){
    ev.stopPropagation();
    if(!this.disabled) {
      let target=ev.target||ev.srcElement;
        this.value = !this.value;
        this.valueChange.emit(this.value);
    }
  }

}
