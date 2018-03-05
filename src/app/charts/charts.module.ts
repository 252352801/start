import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent }   from './charts.component';
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import { routing } from './charts.routing';
@NgModule({
    imports: [
      routing,
      SharedModule,
      PSharedModule,
      ChartModule

    ],
    declarations: [
      ChartsComponent
    ]
})
export class ChartsModule { }
