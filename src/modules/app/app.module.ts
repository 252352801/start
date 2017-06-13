import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { RootContainerComponent } from '../../components/root-container/root-container.component';
import { AsideLeftComponent } from '../../components/aside-left/aside-left.component';
import { HeaderComponent,HeaderLeftComponent,HeaderRightComponent} from '../../components/header/header.component';
import {NavWrapComponent} from '../../components/nav-wrap/nav-wrap.component';
import {NavItemComponent} from '../../components/nav-item/nav-item.component';
import {SubNavItemComponent} from '../../components/sub-nav-item/sub-nav-item.component';
import {SharedModule} from '../shared/shared.module';

import { AppComponent } from './app.component';
import { SigninComponent } from '../signin/signin.component';
import { IndexComponent } from '../index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent,
    RootContainerComponent,
    AsideLeftComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    NavWrapComponent,
    NavItemComponent,
    SubNavItemComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
