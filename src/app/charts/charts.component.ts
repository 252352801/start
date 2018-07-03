import {Component, OnDestroy} from '@angular/core';
import {SettingService} from '../core/services/setting/setting.service';
import  {ThemesService}  from '../core/services/themes/themes.service';
@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnDestroy {

  constructor(
    public themesSvc: ThemesService,
    private setting: SettingService
  ) {
   
  }

  ngOnDestroy() {
  }
}
