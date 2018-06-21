import {Directive,Component,OnInit,ElementRef,Input,Output,OnDestroy,EventEmitter,OnChanges} from '@angular/core';
import  '../../assets/laydate/laydate.js';
declare const laydate:any;
interface Options{
  elem: string, //需显示日期的元素
  type?:string,//类型  year month date time datetime
  range?:boolean|string,//范围选择  true/分割符
  format?:string, //日期格式
  value?:string,//初始值
  min?: string, //最小日期
  max?:string, //最大日期
  trigger?: string, //触发事件
  show?:boolean,//是否默认显示
  position?:string,//absolute  定位方式  默认absolute   其他fixed,static
  zIndex?: number, //css z-index
  showBttom?:boolean,//是否显示底部按钮栏
  btns?:string[],//右下角显示的按钮顺序
  lang?:string,//语言  en
  theme?:string,//除了内置外可自定义  如'#393点9'  也可以填css类使其加到控件上
  calendar?:boolean,//是否显示公里节日
  mark?:any,//object标注重要日子 如特定日期{'2017-11-11':'光棍节'}  0表示每年/月，如{'0-11-11':'光棍节'}
  ready?:Function, /*(date)=>{//控件打开时触发的回调  date:初始的日期时间对象

   },*/
   change?:Function,// (value,date,endDate)=>{//input改变时的回调
   //console.log(value); //得到日期生成的值，如：2017-08-18
   //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
   //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
   done?: Function//(value, date, endDate)=>{//选择完毕后的回调
   //console.log(value); //得到日期生成的值，如：2017-08-18
   //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
   //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。

}

@Component({
  selector: '[datePicker]',
  template:''
})
export class DatePickerDirective implements OnInit,OnChanges{
    @Input('datePicker') value:string;
    @Output() ngModelChange:EventEmitter<any>=new EventEmitter();


    @Input('opt-event') event:string;//触发的事件
    @Input('opt-format') format:string;//格式化
    @Input('opt-ispicktime') isPickTime:boolean;//是否选择时间
    @Input('opt-festival') isShowFestival:boolean;//是否显示节日
    @Input('opt-min') min:string;//最小日期
    @Input('opt-max') max:string;//最大日期
    @Input('opt-start') start:string;//开始日期
    @Input('opt-end') end:string;//结束日期
    @Input('opt-fixed') isFixed:boolean;//是否固定在可视区域
    @Input('opt-zindex') zIndex:number;//css z-index
    @Input('opt-range') range:boolean|string;//css z-index
    @Output() complete:EventEmitter<any>=new EventEmitter();//选择完成的回调

  private ref:any;
    constructor(private elemRef:ElementRef){

    }

    private getOptions():Options{
      let opt:Options={
        elem: this.elemRef.nativeElement, //需显示日期的元素
      };
      this.isPickTime&&(opt.type='datetime');
      this.isPickTime&&(opt.format='yyyy-MM-dd HH:mm:ss');
      this.min&&(opt.min=this.min);
      this.max&&(opt.max=this.max);
      this.event&&(opt.trigger=this.event);
      this.zIndex&&(opt.zIndex=this.zIndex);
      this.isShowFestival&&(opt.calendar=true);
      this.format&&(opt.format=this.format);
      if(this.range){
        opt.range=this.range;
      }
      opt.value='';//初始值
      opt.show=false;//是否默认显示
      opt.position='absolute';//定位方式  默认absolute   其他fixed,static
      opt.showBttom=true;//是否显示底部按钮栏
      opt.btns=['clear','now','confirm'];//右下角显示的按钮顺序
      opt.lang='cn';//语言  en
      opt.theme='default';//除了内置外可自定义  如'#393点9'  也可以填css类使其加到控件上
      opt.mark=null;//object标注重要日子 如特定日期{'2017-11-11':'光棍节'}  0表示每年/月，如{'0-11-11':'光棍节'}
      opt.ready=(date)=>{//控件打开时触发的回调  date:初始的日期时间对象

      };
      opt.change=(value,date,endDate)=>{//input改变时的回调
        //console.log(value); //得到日期生成的值，如：2017-08-18
        //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
      };
      opt.done=(value, date, endDate)=>{//选择完毕后的回调
        //console.log(value); //得到日期生成的值，如：2017-08-18
        //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        this.ngModelChange.emit(value);
        this.complete.emit(value);
      };
      return opt;
    }
    ngOnInit(){
      this.ref=laydate['render'](this.getOptions());
    }
    ngOnChanges(){
    }
}

