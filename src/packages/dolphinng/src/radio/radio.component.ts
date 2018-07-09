import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.less']
})
export class RadioComponent implements OnInit{
  @Input() key:any;
  @Output() keyChange:EventEmitter<any>=new EventEmitter();
  @Input() value:any;
  @Input() size:string;
  @Input() display:string;
  @Input() disabled:string;
  @Input() customBackground:string;//勾选时的背景
  @Input() styleClass:string;
  @Input() name:string;
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
