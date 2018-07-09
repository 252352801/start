import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootContainerComponent } from './root-container/root-container.component';
import { AsideLeftComponent } from './aside-left/aside-left.component';
import { HeaderComponent, HeaderLeftComponent, HeaderRightComponent } from './header/header.component';
import { DeleteWrapComponent } from './delete-wrap/delete-wrap.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RootContainerComponent,
    AsideLeftComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    DeleteWrapComponent
  ],
  providers: [],
  exports: [
    RootContainerComponent,
    AsideLeftComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    DeleteWrapComponent
  ]
})
export class LayoutModule {
}
