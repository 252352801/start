import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})
export class CheckboxComponent implements OnInit{
  @Input() name:string;
  @Input() display:string;
  @Input() disabled:string;
  @Input() size:string;
  @Input() styleClass:string;
  @Input() value:boolean=false;
  @Output() valueChange:EventEmitter<any>=new EventEmitter();
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
  }
  toggleCheck(ev){
    if(!this.disabled) {
      let target=ev.target||ev.srcElement;
      if(target.nodeName!=='INPUT'){
        this.value = !this.value;
        this.valueChange.emit(this.value);
      }
    }
  }
  changeValue(ev){
    ev.stopPropagation();
    if(!this.disabled) {
      this.value = !this.value;
      this.valueChange.emit(this.value);
    }
  }
}
