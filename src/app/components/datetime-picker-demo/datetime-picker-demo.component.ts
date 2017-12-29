import { Component} from '@angular/core';
import { PopService} from 'dolphinng';
@Component({
    selector: 'datetime-picker-demo',
    templateUrl: './datetime-picker-demo.component.html',
    styleUrls: ['./datetime-picker-demo.component.less'],
  providers:[PopService]
})
export class  DatetimePickerComponent{
  date:string='';
  date1:string='';
  date2:string='';
  date3:string='';
  constructor(
    private pop:PopService
  ){

  }

}
