import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.less']
})
export class RadioComponent implements OnInit{
  @Input() name:string;
  @Input() display:string;
  @Input() disabled:string;
  @Input() size:string;
  @Input() value:any;
  @Input() key:any;
  @Input() styleClass:string;
  @Input() customBackground:string;//勾选时的背景
  @Output() keyChange:EventEmitter<any>=new EventEmitter();
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
  }
  toggleCheck(ev){
    if(!this.disabled) {
      let target=ev.target||ev.srcElement;
      if(target.nodeName!=='INPUT'){
        this.keyChange.emit(this.value);
      }
    }
  }
  changeValue(ev){
    ev.stopPropagation();
    if(!this.disabled) {
      this.keyChange.emit(this.value);
    }
  }
}
