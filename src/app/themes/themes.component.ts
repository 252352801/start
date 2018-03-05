import {Component, OnDestroy} from '@angular/core';
import {SettingService} from '../core/services/setting/setting.service';
import  {ThemesService}  from '../core/services/themes/themes.service';
@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.less']
})
export class ThemesComponent implements OnDestroy {

  constructor(
    public themesSvc: ThemesService,
    private setting: SettingService) {
  }

  ngOnDestroy() {
  }
}
