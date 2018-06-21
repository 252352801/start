import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.less']
})
export class ToggleComponent implements OnInit{
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
  constructor(private elemRef:ElementRef){

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
