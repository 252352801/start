import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit{

  @Input() type:string;
  @Input() size:string;
  @Input() isDark:boolean=false;
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){

  }
}
