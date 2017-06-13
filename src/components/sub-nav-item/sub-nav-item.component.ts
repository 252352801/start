import { Component,Input,Output,OnInit,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'sub-nav-item',
  templateUrl: './sub-nav-item.component.html',
  styleUrls: ['./sub-nav-item.component.less']
})
export class SubNavItemComponent implements OnInit{
  @Input() text:string;
  @Input() link:string;
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){
    this.elemRef.nativeElement.addEventListener('click',(ev)=>{
      if(!this.isAsideFolded()) {
        ev.stopPropagation();
      }
    });
  }
  isAsideFolded():boolean{
    let foldedElem=document.querySelector('.app.app-aside-folded');
    let isAsideFolded=foldedElem?true:false;
    if(!isAsideFolded){return false}
    let classList=foldedElem.className.split(/\s+/);
    if(classList.indexOf('off-screen')>=0){
      let clientWidth=document.body.clientWidth;
      if(clientWidth<768){
        return false
      }
    }
    return true;
  }
}
