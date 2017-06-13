import { Component } from '@angular/core';
import  {PopService}  from '../../services/pop/pop.service';
import  {SettingService}  from '../../services/setting/setting.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:[SettingService,PopService]
})
export class AppComponent {
  count:number=0;
  setting:SettingService;
  constructor(private settingService:SettingService,private pop:PopService){
     this.setting=this.settingService.getSetting();
      console.log(this.setting);
  }
  toggleAsideFolded(){
    this.setting.asideFolded=!this.setting.asideFolded;
  }
  toggleOffScreen(){
    this.setting.offScreen=!this.setting.offScreen;
  }
  confirm(){
    let context=this;
    this.pop.confirm({
      title:'警告',
      text:'您的存款过低！',
      textAlign:'center'
    }).onConfirm(function(){
      console.log('确定');
      context.count++;
      console.log(this);
    }).onCancel(function(){
      console.log('取消');
      console.log(this);
      console.log(this.info);
    }).onClose(function(){
      console.log('关闭');
      console.log(this);
    });
  }
}
