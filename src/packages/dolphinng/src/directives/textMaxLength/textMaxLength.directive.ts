import {Directive,OnInit,ElementRef,Input} from '@angular/core';

@Directive({
  selector: '[textMaxLength]'
})
export class TextMaxLengthDirective implements OnInit{

    @Input() textMaxLength:any='';
    constructor(private elemRef:ElementRef){

    }
    ngOnInit(){
      this.elemRef.nativeElement.style.maxWidth=this.textMaxLength;
      this.elemRef.nativeElement.style.whiteSpace='nowrap';
      this.elemRef.nativeElement.style.overflow='hidden';
      this.elemRef.nativeElement.style.textOverflow='ellipsis';
    }
}

