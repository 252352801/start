import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'nullReplace'})
export class NullReplacePipe implements PipeTransform {
  private fmt:string='--';
  transform(value:any,fmt:string):any {
    if(value===undefined||value===null||value===''){
      let result=fmt||this.fmt;
      return result;
    }else{
      return value;
    }
  }
}

