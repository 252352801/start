import {Component,Injectable, ElementRef, OnInit,OnDestroy,ViewChild, EventEmitter, SimpleChanges, Input, Output} from '@angular/core';
@Component({
  selector: 'datetime-picker',
  templateUrl: './datetimePicker.component.html',
  styleUrls: ['./datetimePicker.component.less']
})
export class DatetimePickerComponent implements OnInit,OnDestroy {
  @Input() value: string;//输入
  @Output() valueChange: EventEmitter<string> = new EventEmitter();//输出
  @Input() format: string='yyyy-MM-dd';//格式化  yyyy-MM-dd hh:mm:ss
  @Input() max: string;//最大日期限制 注：当启用最大最小限制时 max的日期格式必须与本组件format相匹配
  @Input() min: string;//最小日期限制 注：当启用最大最小限制时 min的日期格式必须与本组件format相匹配
  @Input() start: string = '1970/01/01';//最小可选日期（时间）
  @Input() end: string = '2070/12/31';//最大可选日期（时间）
  @Input() trigger: string = 'focus';//触发事件
  @Input() zIndex: string|number = 999;//层级
  @Input() isCalendar: boolean = false;//是否显示节日
  @Input() direction: string;//方向 top bottom
  @Output() complete: EventEmitter<any> = new EventEmitter();//选择完成
  @ViewChild('popover') popover:ElementRef;
  @ViewChild('datetimePicker') datetimePicker:ElementRef;
  private inputElem: HTMLInputElement;

  visible: boolean = false;//是否显示
  ready: boolean = false;//是否已就绪
  date: Date;//日期
  year: number = null;//年
  month: number = null;//月
  day: number = null;//日
  hours: number = null;//时
  minutes: number = null;//分
  seconds: number = null;//秒
  //根据format设置以下值
  isPickSeconds: boolean = false;//是否选择秒
  isPickMinutes: boolean = false;//是否选择分
  isPickHours: boolean = false;//是否选择时
  isPickingTime:boolean=false;//是否在选择时间
  private calendars: {
    year?:number,
    month?:number,
    day:number,
    text: string
  }[];//节日
  yearOptions: number[];//年选项
  monthOptions: number[];//月选项
  hoursOptions:number[];//小时选项
  minutesOrSecondsOptions:number[];//分钟/秒钟选项
  dayOptions: {
    date: Date,//日期对象
    isCurrent: boolean,//是否是当前月的日期
    disabled: boolean,//是否禁用
    text: number|string  //显示的文字
  }[][];//日选项
  minError:boolean=false;//超出最小日期
  maxError:boolean=false;//超出最大日期
  left:number=0;
  top:number;//位置
  handlers:{
    elem:HTMLElement|HTMLInputElement|Document;
    event:string,
    fn:EventListener
  }[]=[];
  constructor(private elemRef: ElementRef) {
    this.hoursOptions=[];
    this.minutesOrSecondsOptions=[];
    for(let i=0;i<24;i++){
      this.hoursOptions.push(i);
    }
    for(let j=0;j<60;j++){
      this.minutesOrSecondsOptions.push(j);
    }
  }

  ngOnInit() {
    document.body.appendChild(this.popover.nativeElement);
    {//设置根元素样式
      this.elemRef.nativeElement.style.display = 'inline-block';
      this.elemRef.nativeElement.style.position = 'relative';
      this.elemRef.nativeElement.style.verticalAlign = 'middle';
    }
    let inputElem = this.elemRef.nativeElement.querySelector('input');
    this.inputElem = inputElem;
    if(this.inputElem){
      this.addEvent(this.inputElem,'blur',(ev)=>{
        if(this.value){
          if(!this.isFormat(this.value,this.format)){//格式不匹配置空
            this.valueChange.emit('');
          }else{ //超出范围置空
            if(this.min){
              let minDate=this.getMinDate();
              if(minDate&&this.isDateTimeGreaterThan(minDate,this.date)){
                this.valueChange.emit('');
              }
            }
            if(this.max){
              let maxDate=this.getMaxDate();
              if(maxDate&&this.isDateTimeGreaterThan(this.date,maxDate)){
                this.valueChange.emit('');
              }
            }
          }
        }
      });
      this.addEvent(this.inputElem,'input',(ev)=>{
        if(this.value&&this.isFormat(this.value,this.format)){
          this.setOrgDate();
        }
      });
      this.addEvent(this.inputElem,this.trigger, (ev)=> {//触发弹出
        this.init();
        this.visible = true;
        setTimeout(()=>{
          this.setPosition();
        });
      });
      this.addEvent(document,'click', (ev)=> {//其他地方点击关闭
        if(this.inputElem!==ev.target){
          if(this.visible){
            this.close();
          }
        }
      });
    }
  }
  ngOnDestroy(){
    for(let handle of this.handlers){
      handle.elem.removeEventListener(handle.event,handle.fn);
    }
    if(this.popover.nativeElement){
      document.body.removeChild(this.popover.nativeElement);
    }
  }

  /**
   * 初始化
   */
  init() {
    this.isPickingTime=false;
    this.minError=false;
    this.maxError=false;
    this.top=null;
    this.ready=false;
    this.testFormat();
    this.createYearOptions();
    this.createMonthOptions();
    this.setOrgDate();
    this.createDayOptions();
  }

  /**
   * 检测format以确定是否选择时、分、秒
   */
  testFormat(){
    if(typeof this.format==='string'){
      this.isPickHours=/[h|H]/.test(this.format);
      this.isPickMinutes=/[m]/.test(this.format);
      this.isPickSeconds=/[s|S]/.test(this.format);
    }
  }

  /**
   * 创建“年”选项
   */
  createYearOptions() {
    this.yearOptions = [];
    let startDate = this.createDateWidthFormat(this.start,this.format);
    let endDate =  this.createDateWidthFormat(this.end,this.format);
    let startYear = startDate.getFullYear();
    let endYear = endDate.getFullYear();
    if (startYear && endYear) {
      for (let i = startYear; i < endYear; i++) {
        this.yearOptions.push(i);
      }
    }
  }

  /**
   * 创建“月”选项
   */
  createMonthOptions() {
    this.monthOptions = [];
    for (let i = 0; i < 12; i++) {
      this.monthOptions.push(i);
    }
  }

  /**
   * 创建“天”选项
   */
  createDayOptions() {
    if(this.year===null||this.month===null){
      return;
    }
    //确定第一天的星期
    //确定最后一天的星期
    //首尾填充
    let dayIndex = 0;
    let startDay =this.createDate();
    startDay.setDate(1);
    startDay.setMonth(this.month);
    startDay.setFullYear(this.year);
    let weekDay = startDay.getDay();
    if(weekDay===0){
      startDay.setDate(startDay.getDate() - 7);
    }else if (weekDay < 7) {
      startDay.setDate(startDay.getDate() - weekDay);
    }
    let y = startDay.getFullYear();
    let m = startDay.getMonth();
    let d = startDay.getDate();
    this.dayOptions = [];
    let minDate=this.getMinDate(),
      maxDate=this.getMaxDate();
    for (let i = 0; i < 6; i++) {
      let group = [];
      for (let j = 0; j < 7; j++) {
        let newDateStr=''+y+'/'+(m+1)+'/'+d;
        let newDate = this.createDate(newDateStr);
       // newDate.setFullYear(y);
        //newDate.setMonth(m);
        newDate.setDate(d + dayIndex);
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        let isCurrent = (newDate.getMonth() == this.month);
        let disabled = false;
        if (minDate&&this.isDateTimeGreaterThan(minDate,newDate)) {
          disabled = true;
        }
        if (maxDate&&this.isDateTimeGreaterThan(newDate,maxDate)) {
          disabled = true;
        }
        group.push({
          date: newDate,
          isCurrent: isCurrent,
          disabled: disabled,
          text: newDate.getDate()
        });
        dayIndex++;
      }
      this.dayOptions.push(group);
    }
  }

  addEvent(elem:HTMLElement|HTMLInputElement|Document,event:string,fn:EventListener){
    elem['addEventListener'](event,fn);
    this.handlers.push({
      elem:elem,
      event:event,
      fn:fn
    });
  }

  /**
   * 通过format查找字符串str里相应的字符
   * @param str
   * @param format
   * @param condiction
   * @param len
   * @returns string
   */
  searchStrByFormat(str:string,format:string,condiction:string,len:number|number[]):string{
    let result='';
    let index:number,resultLen:number;
    if(len instanceof Array){
      len.sort((a,b)=>{
        return b-a;
      });
      for(let l of len){
        let regExpStr=condiction+(l>1?'{'+l+'}':'');
        let resExp=new RegExp(regExpStr);
        index=format.search(resExp);
        if(index>=0){
          resultLen=l;
          break;
        }
      }
    }else if(typeof len==='number'){
      let regExpStr=condiction+(len>1?'{'+len+'}':'');
      let resExp=new RegExp(regExpStr);
      index=format.search(resExp);
      resultLen=len;
    }
    if(index>=0){
      result=str.substring(index,index+resultLen);
      return result;
    }
  }

  createDateWidthFormat(dateStr:string,format:string):Date {
    let date = this.createDate(dateStr);
    if (!date) {
      date = this.createDate();
      let year, month, day, hours, minutes, seconds;
      //日
      day = parseInt(this.searchStrByFormat(dateStr, format, '[dD]', [1, 2])) || 1;
      date.setDate(parseInt(day));
      //月
      month = parseInt(this.searchStrByFormat(dateStr, format, '[M]', [1, 2])) || 1;
      date.setMonth(parseInt(month) - 1);
      //年
      year = parseInt(this.searchStrByFormat(dateStr, format, '[yY]', 4)) || date.getFullYear();
      date.setFullYear(year);
      //时
      hours = parseInt(this.searchStrByFormat(dateStr, format, '[hH]', [1, 2])) || 0;
      date.setHours(parseInt(hours));
      //分
      minutes = parseInt(this.searchStrByFormat(dateStr,format, '[m]', [1, 2])) || 0;
      date.setMinutes(parseInt(minutes));
      //秒
      seconds = parseInt(this.searchStrByFormat(dateStr,format, '[sS]', [1, 2])) || 0;
      date.setSeconds(parseInt(seconds));
    }
    return date;
  }

  /**
   * 日期是否大于
   * @param date1
   * @param date2
   * @returns Boolean
   */
  isDateTimeGreaterThan(date1:Date,date2:Date):Boolean{
    return date1.getTime()-date2.getTime()>=1000;//误差1000毫秒以内
  }

  /**
   * 建立新的时间对象
   * @param dateStr
   * @returns Date
   */
  createDate(dateStr?:string):Date{
    let date:Date;
    if(dateStr){
      date=new Date(dateStr.replace(/-/g,'/'));
    }else{
      date=new Date();
      date.setTime(Math.floor(date.getTime()/1000)*1000);
    }
    if(date.toDateString()!='Invalid Date'){
      return date;
    }
  }

  /**
   * 设置初始日期
   */
  setOrgDate() {
    let dateStr = '';
    if (this.value) {
      dateStr = this.value;
    } else if (this.inputElem) {
      dateStr = this.inputElem.value;
    }
    let date:Date;
    if (dateStr) {
      date=this.createDateWidthFormat(dateStr,this.format);
    } else {
      date = this.createDate();
    }
    this.date=date;
    this.setValues();
  }

  /**
   * 设置日期的年份
   * @param year
   */
  setDateFullYear(year?:number){
    this.date.setFullYear(year||this.year);
  }

  /**
   * 设置日期的月份
   * @param month
   */
  setDateMonth(month?:number){
    this.date.setMonth(month||this.month);
  }

  /**
   * 设置年月日时分秒的值
   * @param date
   */
  setValues(date?:Date){
    let dateTime=date||this.date;
    this.year = dateTime.getFullYear();
    this.month = dateTime.getMonth();
    this.day = dateTime.getDate();
    this.hours = dateTime.getHours();
    this.minutes = dateTime.getMinutes();
    this.seconds = dateTime.getSeconds();
  }

  stopPropagation(ev: Event) {
    ev.stopPropagation();
  }

  /**
   * 根据input相对屏幕位置设置弹出框位置
   */
  setPosition() {
    if(this.popover&&this.inputElem){
      let popoverH=this.datetimePicker.nativeElement.offsetHeight;
      let popoverW=this.datetimePicker.nativeElement.offsetWidth;
      let rect=this.inputElem.getBoundingClientRect();
      let viewH=document.body.clientHeight;
      let viewW=document.body.clientWidth;
      let scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
      let scrollTop=document.documentElement.scrollTop||document.documentElement.scrollTop;
      if(viewW-rect.left<popoverW){//left
        this.left=rect.right-popoverW+scrollLeft;
      }else{
        this.left=rect.left+scrollLeft;
      }
      if(this.direction==='bottom'){//top
        this.top=rect.top-popoverH+scrollTop;
      }else if(this.direction==='top'){
        this.top=rect.bottom+scrollTop;
      }else{
        if(viewH-rect.bottom<popoverH){
          this.top=rect.top-popoverH+scrollTop;
        }else{
          this.top=rect.bottom+scrollTop;
        }
      }
    }
    this.ready=true;
  }

  /**
   * 选择天
   */
  pickDay(day:{
    date: Date,//日期对象
    isCurrent: boolean,//是否是当前月的日期
    disabled: boolean,//是否禁用
    text: number|string  //显示的文字
  }) {
    if(!day.disabled){
      this.date=day.date;
      this.setValues();
      if(this.isPickHours||this.isPickMinutes||this.isPickSeconds){
        this.isPickingTime=true;
      }else{
        this.output();
      }
    }
  }

  /**
   * 上月
   */
  prevMonth() {
    let newMonth = this.month - 1;
    this.date.setMonth(newMonth);
    if(this.date.getMonth()>newMonth){
      this.date.setDate(0);
    }
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
  }

  /**
   * 下一月
   */
  nextMonth() {
    let newMonth = this.month + 1;
    this.date.setMonth(newMonth);
    if(this.date.getMonth()>newMonth){
      this.date.setDate(0);
    }
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
  }

  /**
   * 获取最小日期
   * @returns Date
   */
  getMinDate():Date{
    if(this.min){
      let date=this.createDateWidthFormat(this.min,this.format);
      if(date.toDateString()!=='Invalid Date'){
        return date;
      }
    }
    return null;
  }
  /**
   * 获取最大日期
   * @returns Date
   */
  getMaxDate():Date{
    if(this.max){
      let date=this.createDateWidthFormat(this.max,this.format);;
      if(date.toDateString()!=='Invalid Date'){
        return date;
      }
    }
    return null;
  }

  /**
   * 输入时最大值检测
   * @param ev
   * @param max
   */
  maxInputTest(ev:Event,max:number){

  }

  /**
   * 输入是否符合要求
   * @param str
   * @param format
   * @returns boolean
   */
  isFormat(str:string,format:string):boolean{
    let str1=str.replace(/\d{2}|\d/g,'**');
    let str2=format.replace(/[yYMdDhHmsS]{2}|[yYMdDhHmsS]/g,'**');
    return str1===str2;
  }

  /**
   * 清空
   */
  clear(){
    if(this.inputElem){
      this.inputElem.value='';
      this.valueChange.emit('');
    }
    this.close();
  }

  /**
   * 现在
   */
  now(){
    let date=this.createDate();
    if(!this.isPickSeconds){
      date.setSeconds(0);
    }
    if(!this.isPickMinutes){
      date.setMinutes(0);
    }
    if(!this.isPickHours){
      date.setHours(0);
    }
    this.date=date;
    this.setValues(date);
    this.createDayOptions();
    this.output();
  }

  /**
   * 清除错误
   */
  clearErrors(){
    this.minError=false;
    this.maxError=false;
  }

  /**
   * 输出
   */
  output() {
    let minDate=this.getMinDate(),
      maxDate=this.getMaxDate();
    if(minDate&&this.isDateTimeGreaterThan(minDate,this.date)){
      this.minError=true;
      return false;
    }else if(maxDate&&this.isDateTimeGreaterThan(this.date,maxDate)){
      this.maxError=true;
      return false;
    }
    let result=this.format;
    let month=this.month+1;
    //年
    result=result.replace(/[yY]{4}/,this.year+'');
    //月
    if(/[M]{2}/.test(this.format)){
      result=result.replace(/[M]{2}/,month<10?'0'+month:month+'');
    }else if(/M/.test(this.format)){
      result=result.replace(/M/,month+'');
    }
    //日
    if(/[dD]{2}/.test(this.format)){
      result=result.replace(/[dD]{2}/,this.day<10?'0'+this.day:this.day+'');
    }else if(/[dD]/.test(this.format)){
      result=result.replace(/[dD]/,this.day+'');
    }
    //时
    if(/[hH]{2}/.test(this.format)){
      result=result.replace(/[hH]{2}/,this.hours<10?'0'+this.hours:this.hours+'');
    }else if(/[hH]/.test(this.format)){
      result=result.replace(/[hH]/,this.hours+'');
    }
    //分
    if(/[m]{2}/.test(this.format)){
      result=result.replace(/[m]{2}/,this.minutes<10?'0'+this.minutes:this.minutes+'');
    }else if(/[m]/.test(this.format)){
      result=result.replace(/[m]/,this.minutes+'');
    }
    //分
    if(/[sS]{2}/.test(this.format)){
      result=result.replace(/[sS]{2}/,this.seconds<10?'0'+this.seconds:this.seconds+'');
    }else if(/[sS]/.test(this.format)){
      result=result.replace(/[sS]/,this.seconds+'');
    }
    this.valueChange.emit(result);
    this.close();
    this.complete.emit(result);
  }

  /**
   * 关闭
   */
  close() {
    this.visible=false;
    this.ready=false;
  }
}
