import {Directive,OnInit,ElementRef,Input} from '@angular/core';

@Directive({
  selector: '[codeTextarea]'
})
export class CodeTextareaDirective implements OnInit{
    @Input() codeTextarea:any;
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

