import {Directive,OnInit,ElementRef,Input,Output,OnDestroy,EventEmitter} from '@angular/core';
//依赖laydate
declare var laydate:any;
@Directive({
  selector: '[datePicker]'
})
export class DatePickerDirective implements OnInit{
    @Input('datePicker') value:string;
    @Output() ngModelChange:EventEmitter<any>=new EventEmitter();


    @Input('opt-event') event:string;//触发的时间
    @Input('opt-format') format:string;//格式化
    @Input('opt-ispicktime') isPickTime:boolean;//是否选择时间
    @Input('opt-isclearbtn') isShowClearButton:boolean;//是否显示清空按钮
    @Input('opt-istodaybtn') isShowTodayButton:boolean;//是否显示今天按钮
    @Input('opt-issurebtn') isShowSureButton:boolean;//是否显示确定按钮
    @Input('opt-festival') isShowFestival:boolean;//是否显示节日
    @Input('opt-min') min:string;//最小日期
    @Input('opt-max') max:string;//最大日期
    @Input('opt-start') start:string;//开始日期
    @Input('opt-end') end:string;//结束日期
    @Input('opt-fixed') isFixed:boolean;//是否固定在可视区域
    @Input('opt-zindex') zIndex:number;//css z-index
    @Output() complete:EventEmitter<any>=new EventEmitter();//选择完成的回调
    constructor(private elemRef:ElementRef){

    }
    ngOnInit(){
      //laydate.v   //获取laydate版本号
      //laydate.skin(lib);  //加载皮肤，参数lib为皮肤名
      /*
       laydate.now支持多类型参数。timestamp可以是前后若干天，也可以是一个时间戳。format为日期格式，为空时则采用默认的“-”分割。
       如laydate.now(-2)将返回前天，laydate.now(3999634079890)将返回2096-09-28
       */
      //laydate.now(timestamp, format);   //该方法提供了丰富的功能，推荐灵活使用。
     // laydate.reset();  //重设日历控件坐标，一般用于页面dom结构改变时。无参
      let options={
        elem: this.elemRef.nativeElement, //需显示日期的元素
        event: this.event||'click', //触发事件
        format:this.format|| ('YYYY-MM-DD'+(this.isPickTime?' hh:mm':'')), //日期格式
        istime: this.isPickTime||false, //是否开启时间选择  默认为false
        isclear: this.isShowClearButton!==undefined?this.isShowClearButton:true, //是否显示清空
        istoday: this.isShowTodayButton!==undefined?this.isShowTodayButton:true, //是否显示今天
        issure: this.isShowSureButton!==undefined?this.isShowSureButton:true, //是否显示确认
        festival:this.isShowFestival!==undefined?this.isShowFestival:true, //是否显示节日
        min: this.min||'', //最小日期
        max: this.max||'', //最大日期
        start: this.start||'',  //开始日期
        end: this.end||'',  //结束日期
        fixed: this.isFixed||false, //是否固定在可视区域
        zIndex: this.zIndex!==undefined?this.zIndex:99999999, //css z-index
        choose: (dates)=>{ //选择好日期的回调
          this.ngModelChange.emit(dates);
          this.complete.emit(dates);
        }
      };
      laydate(options);
    }

    ngOnDestroy(){

    }

}

