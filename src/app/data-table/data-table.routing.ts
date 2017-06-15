import { Routes, RouterModule } from '@angular/router';
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
const routes: Routes = <Routes>[
  {
    path: '',
    component: DataTableComponent
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'facets',
    component: FacetsComponent
  },
  {
    path: 'templating',
    component: TemplatingComponent
  },
  {
    path: 'colGroup',
    component: ColGroupComponent
  },
  {
    path: 'export',
    component: ExportComponent
  },
  {
    path: 'colToggler',
    component: ColTogglerComponent
  },
  {
    path: 'scroll',
    component: ScrollComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'paginator',
    component: PaginatorComponent
  },
  {
    path: 'sort',
    component: SortComponent
  },
  {
    path: 'rowGroup',
    component: RowGroupComponent
  },
  {
    path: 'selection',
    component: SelectionComponent
  },
  {
    path: 'editable',
    component: EditableComponent
  },
  {
    path: 'expand',
    component: ExpandComponent
  },
  {
    path: 'contextMenu',
    component: ContextMenuComponent
  }
];
export const routing = RouterModule.forChild(routes);
