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
  @Input() value:boolean;
  @Output() valueChange:EventEmitter<any>=new EventEmitter();
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
    console.info('value',this.value);
    console.info('name',this.name);
    console.info('display',this.display);
    console.info('disabled',this.disabled);
  }
  toggleCheck(){
    if(!this.disabled) {
      this.value = !this.value;
      this.valueChange.emit(this.value);
    }
  }
}
