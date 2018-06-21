import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootContainerComponent } from '../../components/root-container/root-container.component';
import { AsideLeftComponent } from '../../components/aside-left/aside-left.component';
import { HeaderComponent, HeaderLeftComponent, HeaderRightComponent } from '../../components/header/header.component';
import { DeleteWrapComponent } from '../../components/delete-wrap/delete-wrap.component';
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
