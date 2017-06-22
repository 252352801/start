import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { RootContainerComponent } from 'dolphinng';
import { AsideLeftComponent } from 'dolphinng';
import { HeaderComponent,HeaderLeftComponent,HeaderRightComponent} from 'dolphinng';
import {NavWrapComponent} from 'dolphinng';
import {NavItemComponent} from 'dolphinng';
import {SubNavItemComponent} from 'dolphinng';
import {SharedModule} from './shared/shared.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
