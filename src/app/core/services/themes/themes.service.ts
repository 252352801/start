import {Injectable} from '@angular/core';
import  {addClass,removeClass}  from '../../core.utils';
@Injectable()
export class ThemesService {
  private skins:string[]=['dol'];
  skin: string;

  themes={
    asideLeft:'',
    headerLeft:'',
    headerRight:''
  };
  constructor() {
    let localThemesStr = localStorage.getItem('themes');
    let themesService: ThemesService;
    try {
      themesService = JSON.parse(localThemesStr);
      for (let o in themesService) {
        this[o] = themesService[o];
      }
    } catch (err) {
      console.log(err);
    }
    window.addEventListener('beforeunload', ()=> {
      let themes = {
        skin:this.skin||'',
        themes:{
          asideLeft:this.themes.asideLeft,
          headerLeft:this.themes.headerLeft,
          headerRight:this.themes.headerRight
        }
      };
      localStorage.setItem('themes', JSON.stringify(themes));
    });
    this.init();
  }

  init() {
    this.setSkin(this.skin);
  }

  setSkin(skinName:string){
    this.clearSkin();
    this.skin=skinName;
    if(this.skin){
      addClass(document.body,this.skin);//添加类
    }
  }

  clearSkin(){
    this.skin='';
    for(let o of this.skins){
      removeClass(document.body,o);
    }
  }


}
