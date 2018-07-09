import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'date'})
export class DatePipe implements PipeTransform {

  private format='yyyy-MM-dd';
  private createDate(dateStr:string):Date{
    let date=new Date(dateStr);
    if(date+''==='Invalid Date'){
      date=new Date(dateStr.replace(/-/g,'/').replace(/\.\d+$/,''));
      if(date+''==='Invalid Date'){
        return null;
      }
    }
    return date;
  }

  transform(value:any,fmt:string):any {
    if(value){
      let date:Date;
      if(value instanceof Date){
        date=value;
      }else if(typeof value==='string'){
        date=this.createDate(value);
      }
      if(!date){
        return value;
      }
      let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if(!fmt){
        fmt=this.format;
      }
      if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      return fmt;
    }else{
      return value;
    }
  }
}

