import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SettingService } from './services/setting/setting.service';
import { ThemesService } from './services/themes/themes.service';
import { ThemesControllerModule } from '../shared/modules/themesController.module';
import {
  LayoutModule,
  NavModule,
  CommonModule as MyCommonModule,
} from 'dolphinng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    NavModule,
    BrowserAnimationsModule,
    MyCommonModule
  ],
  exports:[
    BrowserModule,
    LayoutModule,
    NavModule,
    BrowserAnimationsModule,
    MyCommonModule,


    ThemesControllerModule
  ],
  providers: [
    SettingService,
    ThemesService
  ]
})
export class CoreModule { }
