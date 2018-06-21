import {Directive,OnInit,ElementRef} from '@angular/core';

@Directive({
  selector: '[btnBack]'
})
export class BtnBackDirective implements OnInit{

    constructor(private elemRef:ElementRef){

    }
    ngOnInit(){
      this.elemRef.nativeElement.addEventListener('click',()=>{
        history.back();
      })
    }

    ngOnDestroy(){

    }

}

