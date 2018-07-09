import {Component, Input,Output,ElementRef,OnInit,OnChanges,OnDestroy,SimpleChanges,EventEmitter,ViewChild} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit,OnChanges,OnDestroy{

  @Input() value:any;
  @Output() valueChange:EventEmitter<any>=new EventEmitter();
  @Input() size:any;
  @Input() min:number=0;
  @Input() max:number=100;
  @Input() decimal:number=0;
  @Input() isValueBackground:boolean=true;
  @Output() complete:EventEmitter<any>=new EventEmitter();

  private mouseMoveHandler:any;
  isPressing:boolean=false;//是否按下鼠标左键
  left:any;


  @ViewChild('slider') slider:ElementRef;
  @ViewChild('sliderThumb') sliderThumb:ElementRef;
  constructor(private eleRef:ElementRef) {

  }
  ngOnInit(){
    window.addEventListener('mouseup',(ev)=>{
      this.isPressing=false;
      this.complete.emit(this.value);
      window.removeEventListener('mousemove', this.mouseMoveHandler);//取消监听
    })
  }
  ngOnChanges(changes:SimpleChanges){
    let valChg=changes['value'];
    if(valChg.currentValue!=valChg.previousValue){
      if(valChg.currentValue!==undefined){
        if(!this.isPressing) {
          this.setLeftByValue(valChg.currentValue);
        }
      }
    }
  }
  ngOnDestroy(){
    window.removeEventListener('mousemove', this.mouseMoveHandler);//取消监听
  }

  thumbPress(){
    this.isPressing=true;
    this.mouseMoveHandler=(ev:MouseEvent)=>{
      this.setNewValueByMousePosition(ev);
    };
    window.addEventListener('mousemove',this.mouseMoveHandler);
  }

  setNewValueByMousePosition(ev:MouseEvent){
    let e:MouseEvent=ev;
    let m_x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
      || document.body.scrollLeft));
    let target_x=this.slider.nativeElement.getBoundingClientRect().left+(document.documentElement.scrollLeft
      || document.body.scrollLeft);
    let sliderW=this.slider.nativeElement.offsetWidth;
    let thumbW=this.sliderThumb.nativeElement.offsetWidth;
    let minL=-thumbW/2;
    let maxL=sliderW-thumbW/2;
    let left=m_x-target_x-thumbW/2;
    let percent=0;
    if(left<minL){
      percent=minL/sliderW*100;
    }else if(left>maxL){
      percent=maxL/sliderW*100;
    }else{
      percent=left/sliderW*100;
    }
    this.left=percent+'%';
    let newVal=this.parseDecimal((this.max-this.min)*(percent/100+thumbW/2/sliderW)+this.min);
    this.valueChange.emit(newVal);
  }

  private setLeftByValue(val:number){
    let percent=100*((val-this.min)/(this.max-this.min));
    if(percent<0){
      percent=0;
    }else if(percent>100){
      percent=100;
    }
    percent-=(100*this.sliderThumb.nativeElement.offsetWidth/2/this.slider.nativeElement.offsetWidth);
    this.left=percent+'%';
  }

  private parseDecimal(val:number):number{
    if(this.decimal){
      return parseFloat(val.toFixed(this.decimal));
    }else{
      return Math.round(val);
    }
  }
}
