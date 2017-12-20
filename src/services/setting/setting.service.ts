export class SettingService {
  headerFixed:boolean;
  asideFixed:boolean;
  asideFolded:boolean;
  asideDock:boolean;
  container:boolean;
  offScreen:boolean;
  private static setting:SettingService;

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
        let setting=SettingService.setting;
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
  }

  static getStaticSetting():SettingService {
    if (!SettingService.setting) {
      SettingService.setting = new SettingService();
    }
    return SettingService.setting;
  }

  getSetting():SettingService {
    return SettingService.getStaticSetting();
  }
}
