import { Component } from '@angular/core';
import  {SettingService}  from '../../services/setting/setting.service';
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers:[SettingService]
})
export class IndexComponent {
  setting:SettingService;
  constructor(private settingService:SettingService){
    this.setting=this.settingService.getSetting();
  }
  toggleAsideFolded(){
    this.setting.asideFolded=!this.setting.asideFolded;
  }
  toggleOffScreen(){
    this.setting.offScreen=!this.setting.offScreen;
  }
}
