import { Component,Input,Output,OnInit,ElementRef} from '@angular/core';
declare var $:any;  //定义jquery
@Component({
  selector: 'nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.less']
})
export class NavWrapComponent implements OnInit{
  test:string='hellow';
  constructor(private elemRef:ElementRef){
      console.log($('active'));

  }
  ngOnInit(){
    let elem=this.elemRef.nativeElement.querySelector('.navi');

  }
}
