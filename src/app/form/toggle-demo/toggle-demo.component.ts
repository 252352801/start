import { Component,OnInit} from '@angular/core';
@Component({
    selector: 'toggle-demo',
    templateUrl: './toggle-demo.component.html',
    styleUrls: ['./toggle-demo.component.less'],
})
export class ToggleDemoComponent implements OnInit{
  toggle1:boolean=false;
  toggle2:boolean=true;
  toggle3:boolean=true;
  toggle4:boolean=false;
  toggle5:boolean=true;
  toggle6:boolean=true;
  toggle7:boolean=false;
  constructor(){
  }

  ngOnInit() {
  }

}
