import {Directive,OnInit,ElementRef} from '@angular/core';

@Directive({
  selector: '[code-textarea]'
})
export class CodeTextareaDirective implements OnInit{
    constructor(private elemRef:ElementRef){

    }
    ngOnInit(){
      if(this.elemRef.nativeElement.nodeName==='TEXTAREA') {
        let elem = this.elemRef.nativeElement;
        let rows = elem.value.split(/\n/);
        let rowsValue = rows.length;
        elem.setAttribute('disabled',null);
        elem.setAttribute('rows', rowsValue);
        elem.style.width="100%";
        elem.style.backgroundColor="#f1f1f1";
      }
    }

}

