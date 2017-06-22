import { Component,OnInit} from '@angular/core';
@Component({
    selector: 'radio-demo',
    templateUrl: './radio-demo.component.html',
    styleUrls: ['./radio-demo.component.less'],
})
export class RadioDemoComponent implements OnInit{
  radio:any=3;
  constructor(){
  }

  ngOnInit() {
  }

}
