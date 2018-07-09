import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavWrapComponent} from './nav-wrap/nav-wrap.component';
import {NavItemComponent} from './nav-item/nav-item.component';
import {SubNavItemComponent} from './sub-nav-item/sub-nav-item.component';
import {ThirthNavItemComponent} from './thirth-nav-item/thirth-nav-item.component';
@NgModule({
  imports:[
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavWrapComponent,
    NavItemComponent,
    SubNavItemComponent,
    ThirthNavItemComponent
  ],
  providers: [],
  exports: [
    NavWrapComponent,
    NavItemComponent,
    SubNavItemComponent,
    ThirthNavItemComponent
  ]
})
export class NavModule {
}
