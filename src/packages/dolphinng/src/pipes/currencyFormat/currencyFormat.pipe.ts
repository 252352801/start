import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  private separateLength: number = 3;//分隔长度
  private accuracy: number = 2;//保留精度
  private format: string = '';//格式
  private separator: string = ',';//分隔符
  transform(value: any, param?: any): any {
    if (value === undefined || value === null) {
      return value;
    } else if (!value && value !== 0) {//NaN  0   ''
      return '';
    }

    let sep = this.separator;
    let flag ='';
    let inputStr =value+'';
    flag = (inputStr.indexOf('-')>=0?'-':inputStr.indexOf('+')>=0?'+':'');
    inputStr=inputStr.replace(/[^\d\.]/g,/*new RegExp(sep, 'g')*/ '');
    let  numRegExp = /^[\-\+]?[0-9]+(\.[0-9]+)?$/,
      str = inputStr.replace(/\s/g, ''),
      accuracy = this.accuracy,
      format = this.format,
      sepLen = this.separateLength;
    //参数匹配
    let nums: number[] = [];
    let strs: string[] = [];
    if (typeof param === 'string') {
      strs.push(param);
    } else if (typeof param === 'number') {
      nums.push(param);
    } else if (param instanceof Array) {
      for (let o of param) {
        if (typeof o === 'string') {
          strs.push(o);
        } else if (typeof o === 'number') {
          nums.push(o);
        }
      }
    }
    //数字参数识别
    if (nums.length > 0) {
      accuracy = nums[0];
    }
    if (nums.length > 1) {
      sepLen = nums[1];
    }
    //字符串参数识别
    if (strs.length > 0) {
      format = strs[0];
    }
    if (strs.length > 1) {
      sep = strs[1];
    }
    let result = '';
    if (numRegExp.test(str)) {
      if (sepLen) {//分隔长度大于0
        str = parseFloat(str).toFixed(accuracy) + '';//四舍五入
        let splits = str.split('.');
        let intStr: string = splits[0];
        let ext: string = splits.length > 1 ? splits[1] : '';
        if (ext.length < accuracy) {
          let fillLen = accuracy - ext.length;
          for (let i = 0; i < fillLen; i++) {
            ext += '0';
          }
        }
        let intLen = intStr.length,
          newIntStr = '';
        if (intLen > sepLen) {
          for (let i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
            if (i > 0) {
              newIntStr = sep + intStr.substr(i, sepLen) + newIntStr;
            } else {
              newIntStr = intStr.substr(0, sepLen + i) + newIntStr;
            }
          }
        } else {
          newIntStr = intStr;
        }
        result = newIntStr + (ext ? '.' + ext : '');
      } else {//分隔长度等于0
        result = inputStr;
      }
      //格式化
      if (format) {
        let index = format.indexOf('xx');
        if (index >= 0) {
          result = format.replace(/xx/, result);
        } else {
          result = result + format;
        }       
      }
    } else {
      result = inputStr;
    }
    if(flag){
      result=flag+result;
    }
    return result;
  }
}

