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
import { PaginatorComponent}   from './paginator/paginator.component';
import { SortComponent}   from './sort/sort.component';
import { RowGroupComponent}   from './row-group/row-group.component';
import { SelectionComponent}   from './selection/selection.component';
import { EditableComponent}   from './editable/editable.component';
import { ExpandComponent}   from './expand/expand.component';
import { ContextMenuComponent}   from './context-menu/context-menu.component';
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';
import { routing } from './data-table.routing';
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
      DataTableComponent,
      BasicComponent,
      FacetsComponent,
      TemplatingComponent,
      ColGroupComponent,
      ExportComponent,
      ColTogglerComponent,
      ScrollComponent,
      FilterComponent,
      PaginatorComponent,
      SortComponent,
      RowGroupComponent,
      SelectionComponent,
      EditableComponent,
      ExpandComponent,
      ContextMenuComponent
    ]
})
export class DataTableModule { }
