import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ThemesComponent }   from './themes.component';
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';
import { routing } from './themes.routing';
@NgModule({
    imports: [
      routing,
      SharedModule,
      PSharedModule,
      PDataTableModule,
      MultiSelectModule,
      SliderModule,
      DropdownModule,
      ContextMenuModule
    ],
    declarations: [
      ThemesComponent
    ]
})
export class ThemesModule { }
