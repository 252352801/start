import { Component,OnInit} from '@angular/core';
@Component({
    selector: 'checkbox-demo',
    templateUrl: './checkbox-demo.component.html',
    styleUrls: ['./checkbox-demo.component.less'],
})
export class CheckboxDemoComponent implements OnInit{
  checkbox1:boolean=false;
  checkbox2:boolean=true;
  checkbox3:boolean=true;
  checkbox4:boolean=false;
  checkbox5:boolean=true;
  checkbox6:boolean=true;
  checkbox7:boolean=false;
  
  constructor(){
  }

  ngOnInit() {
  }

}
