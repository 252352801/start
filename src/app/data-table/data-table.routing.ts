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
  }
];
export const routing = RouterModule.forChild(routes);
