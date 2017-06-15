import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DataTableComponent }   from './data-table.component';
import { BasicComponent }   from './basic/basic.component';
import { FacetsComponent }   from './facets/facets.component';
import { TemplatingComponent}   from './templating/templating.component';
import { ColGroupComponent}   from './col-group/col-group.component';
import { ExportComponent}   from './export/export.component';
import { ColTogglerComponent}   from './col-toggler/col-toggler.component';
import { ScrollComponent}   from './scroll/scroll.component';
import { FilterComponent}   from './filter/filter.component';
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelect,Slider,Dropdown} from 'primeng/primeng';
import { routing } from './data-table.routing';
@NgModule({
    imports: [
      routing,
      SharedModule,
      PSharedModule,
      PDataTableModule
    ],
    declarations: [
      MultiSelect,
      Slider,
      Dropdown,
      DataTableComponent,
      BasicComponent,
      FacetsComponent,
      TemplatingComponent,
      ColGroupComponent,
      ExportComponent,
      ColTogglerComponent,
      ScrollComponent,
      FilterComponent
    ]
})
export class DataTableModule { }
