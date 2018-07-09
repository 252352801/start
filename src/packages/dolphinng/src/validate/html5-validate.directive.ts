import {Directive, Input, OnInit,ElementRef} from '@angular/core';

@Directive({
  selector: '[HTML5Validate]'
})
export class HTML5ValidateDirective implements OnInit{

  @Input() HTML5Validate:any;
  @Input() visible:boolean=false;
  constructor(
    private elemRef:ElementRef
  ){

  }


  ngOnInit(){

    if(this.elemRef.nativeElement.nodeName==='FORM'){
      this.elemRef.nativeElement.removeAttribute('novalidate');
    }else{
      this.initValidateRules();
    }
  }


  createCustomValidity():string{
    let msg='';
    if(this.HTML5Validate instanceof Array){
      if(typeof this.HTML5Validate[1]==='string'){
        if(!!this.HTML5Validate[0]) {
          msg=this.HTML5Validate[1];
        }
      }else{
        for(let o of this.HTML5Validate){
          if(typeof o[1]==='string'){
            if(!!o[0]) {
              msg=o[1];
              break;
            }
          }
        }
      }
    }
    return msg;
  }

  private initValidateRules(){
    this.elemRef.nativeElement.addEventListener('invalid',()=>{
      this.elemRef.nativeElement.setCustomValidity(this.createCustomValidity());
    });
    this.elemRef.nativeElement.addEventListener('change',()=>{
      this.elemRef.nativeElement.setCustomValidity(this.createCustomValidity());
    });
    this.elemRef.nativeElement.addEventListener('keydown',()=>{
      this.elemRef.nativeElement.setCustomValidity('');
    });
  }


}
