import {Component, OnDestroy} from '@angular/core';
import {SettingService} from '../core/services/setting/setting.service';
import  {ThemesService}  from '../core/services/themes/themes.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.less']
})
export class ThemesComponent implements OnDestroy {

  constructor(
    public themesSvc: ThemesService,
    private actRoute:ActivatedRoute,
    private setting: SettingService) {
      let skin=this.actRoute.snapshot.params['skin'];
      console.log(skin);
      if(skin){
        this.themesSvc.setSkin(skin);
      }
  }

  ngOnDestroy() {
  }
}
