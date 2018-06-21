import { Component,Input,Output,OnInit,ElementRef} from '@angular/core';
@Component({
  selector: 'nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.less']
})
export class NavWrapComponent implements OnInit{
  test:string='hellow';
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
    let elem=this.elemRef.nativeElement.querySelector('.navi');

  }
}
