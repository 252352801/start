import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {SettingService}  from '../core/services/setting/setting.service';
import  {ThemesService}  from '../core/services/themes/themes.service';
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers:[]
})
export class IndexComponent {
  isFullScreen:boolean=false;
  messageCount:number=0;
  user={
    username:'用户名',
    avatar:''
  };
  constructor(
    public setting:SettingService,
    public themesSvc:ThemesService,
    private router:Router
  ){
    console.log(this.themesSvc.skin);
  }
  toggleAsideFolded(){
    this.setting.asideFolded=!this.setting.asideFolded;
  }
  toggleOffScreen(){
    this.setting.offScreen=!this.setting.offScreen;
  }

  openContent(){
    this.setting.offScreen=false;
  }

  fullScreen(){
    let docElm = document.documentElement;
    if (docElm.requestFullscreen) {//W3C
      docElm.requestFullscreen();
    }else if (docElm['mozRequestFullScreen']) {//FireFox
      docElm['mozRequestFullScreen']();
    } else if (docElm['webkitRequestFullScreen']) {//Chrome等
      docElm['webkitRequestFullScreen']();
    }else if (docElm['msRequestFullscreen']) {//IE11
      docElm['msRequestFullscreen']();
    }
    this.isFullScreen=true;
  }
  cancelFullScreen(){
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    }
    else if (document['webkitCancelFullScreen']) {
      document['webkitCancelFullScreen']();
    }
    else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
    this.isFullScreen=false;
  }


}
