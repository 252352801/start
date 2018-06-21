import { Directive,OnInit,OnChanges,Input,Output,SimpleChanges,ElementRef,EventEmitter} from '@angular/core';
import set = Reflect.set;
@Directive({
  selector: '[currencyFormat]'
})
export class CurrencyFormatDirective implements OnInit,OnChanges{
  private separateLength:number=3;//分隔长度
  private accuracy:number=2;//保留精度
  private separator:string=',';//分隔符

  constructor(private elemRef:ElementRef){

  }
  @Input() ngModel:any;
  @Input() currencyFormat:any;
  @Output() ngModelChange:EventEmitter<any>=new EventEmitter();
  ngOnInit(){
    setTimeout(()=> {
      this.elemRef.nativeElement.value=this.transform(this.elemRef.nativeElement.value);
    });
    let inputFn=(ev:Event)=>{
      this.ngModelChange.emit(this.elemRef.nativeElement.value.replace(new RegExp(this.separator,'g'),''));
      setTimeout(()=>{
       this.elemRef.nativeElement.value=this.transform(this.elemRef.nativeElement.value);
       },0);
    };
    let testinput = document.createElement('input');
    if('oninput' in testinput){
      this.elemRef.nativeElement.addEventListener("input",inputFn,false);
    }else{
      this.elemRef.nativeElement.onpropertychange = inputFn;
    }
  }

  ngOnChanges(changes:SimpleChanges){

  }

  transform(value:any):any {

    if(value===undefined||value===null){
      return value;
    }else if(!value){//NaN  0   ''
      return '';
    }
    let sep=this.separator;
    let inputStr=(value+'').replace(new RegExp(sep,'g'),''),
      numRegExp=/^[0-9]+(\.[0-9]+)?$/,
      str=inputStr.replace(/\s/g,''),
      sepLen=this.separateLength;
    let result='';
    if(numRegExp.test(str)){
      if(sepLen){//分隔长度大于0
        let splits=str.split('.');
        let intStr:string=splits[0];
        let ext:string=splits.length>1?splits[1]:'';
        let intLen=intStr.length,
          newIntStr='';
        if(intLen>sepLen){
          for(let i=intLen-sepLen;i>0-sepLen;i=i-sepLen){
            if(i>0){
              newIntStr=sep+intStr.substr(i,sepLen)+newIntStr;
            }else{
              newIntStr=intStr.substr(0,sepLen+i)+newIntStr;
            }
          }
        }else{
          newIntStr=intStr;
        }
        result=newIntStr+(ext?'.'+ext:'');
      }else{//分隔长度等于0
        result=inputStr;
      }
    }else{
      result=inputStr;
    }
    return result;
  }
}

