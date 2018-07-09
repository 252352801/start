import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})
export class CheckboxComponent implements OnInit{
  @Input() value:boolean=false;
  @Output() valueChange:EventEmitter<any>=new EventEmitter();
  @Input() size:string;
  @Input() display:string;
  @Input() disabled:any;
  @Input() innerStyle:string;//框内的样式 默认为正方形  可选 checked
  @Input() customBackground:string;//勾选时的背景
  @Input() styleClass:string;
  @Input() name:string;
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
  }
  changeAction(ev){
    this.valueChange.emit(this.value);
  }
}
