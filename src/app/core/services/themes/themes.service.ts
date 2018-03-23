import { Injectable } from '@angular/core';
import { addClass, removeClass } from '../../core.utils';
@Injectable()
export class ThemesService {
  private skins: {
    value:string
    name:string
  }[] = [{
    value:'black',
    name:'黑色'
  },{
    value:'dol',
    name:'dol'
  },{
    value:'deep-blue',
    name:'深蓝'
  }];
  skin: string='';
  themes = {
    asideLeft: '',//black(默认),cerulean-outline
    headerLeft: '',//black(默认),cerulean
    headerRight: ''//black(默认),cerulean
  };
  constructor() {
    let localThemesStr = localStorage.getItem('themes');
    let themesService: ThemesService;
    try {
      themesService = JSON.parse(localThemesStr);
      {//默认
        console.log(themesService.skin);
        if (!themesService.skin) {
          //themesService.themes.asideLeft = 'black';
          //themesService.themes.headerLeft = 'cerulean';
          //themesService.themes.headerRight = 'cerulean';
          themesService.themes.asideLeft = '';
          themesService.themes.headerLeft = '';
          themesService.themes.headerRight = '';
        }
      }
      if (themesService && typeof themesService === 'object') {
        themesService.skin && (this.skin = themesService.skin);
        if (themesService.themes) {
          for (let o in themesService.themes) {
            if (themesService.themes[o]) {
              this.themes[o] = themesService.themes[o];
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    window.addEventListener('beforeunload', () => {
      let themes = {
        skin: this.skin || '',
        themes: {
          asideLeft: this.themes.asideLeft,
          headerLeft: this.themes.headerLeft,
          headerRight: this.themes.headerRight
        }
      };
      localStorage.setItem('themes', JSON.stringify(themes));
    });
    this.init();
  }

  init() {
    this.setSkin(this.skin);
  }

  setSkin(skinName: string) {
    this.clearSkin();
    this.skin = skinName;
    if (this.skin) {
      addClass(document.body, this.skin);//添加类
    }
  }

  clearSkin() {
    this.skin = '';
    for (let o of this.skins) {
      removeClass(document.body, o.value);
    }
  }


}
