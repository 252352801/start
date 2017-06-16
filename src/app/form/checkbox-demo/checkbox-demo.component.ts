import { Component,OnInit} from '@angular/core';
@Component({
    selector: 'checkbox-demo',
    templateUrl: './checkbox-demo.component.html',
    styleUrls: ['./checkbox-demo.component.less'],
})
export class CheckboxDemoComponent implements OnInit{
  checkbox1=false;
  checkbox2=true;
  checkbox3=true;
  checkbox4=false;
  checkbox5=true;
  checkbox6=true;

  obj:any='1';
  constructor(){
  }

  ngOnInit() {
  }

}
