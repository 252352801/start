import {Injectable} from '@angular/core';
@Injectable()
export class SettingService {
  headerFixed:boolean;
  asideFixed:boolean;
  asideFolded:boolean;
  asideDock:boolean;
  container:boolean;
  offScreen:boolean;
  headerTheme:string;
  headerLeftTheme:string;
  headerRightTheme:string;
  asideLeftTheme:string;
  constructor() {
      this.init();
      let localSettingStr=localStorage.getItem('setting');
      let localSetting:SettingService;
      try{
        localSetting=JSON.parse(localSettingStr);
        for(let o in localSetting){
          this[o]=localSetting[o];
        }
      }catch (err){
        console.log(err);
      }
      window.addEventListener('beforeunload',()=>{
        let setting={
          headerFixed:this.headerFixed,
          asideFixed:this.asideFixed,
          asideFolded:this.asideFolded,
          asideDock:this.asideDock,
          offScreen:this.offScreen,
          headerTheme:this.headerTheme,
          headerLeftTheme:this.headerLeftTheme,
          headerRightTheme:this.headerRightTheme,
          asideLeftTheme:this.asideLeftTheme,
        };
        localStorage.setItem('setting',JSON.stringify(setting));
      });
  }

  init(){
    this.headerFixed=true;
    this.asideFixed=true;
    this.asideFolded=false;
    this.asideDock=false;
    this.container=false;
    this.offScreen=false;
    this.headerTheme='';
    this.headerLeftTheme='black';
    this.headerRightTheme='black';
    this.asideLeftTheme='black';
  }
}
