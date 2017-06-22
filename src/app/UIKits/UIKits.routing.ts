import { Routes, RouterModule } from '@angular/router';
import { UIKitsComponent } from './UIKits.component';
import { IconFontsComponent } from './iconfonts/iconfonts.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent }   from './grid/grid.component';
import { WidgetsComponent }   from './widgets/widgets.component';
import { TimelineComponent }   from './timeline/timeline.component';
const routes:Routes = <Routes>[
  {
    path: '',
    component: UIKitsComponent
  },
  {
    path: 'iconfonts',
    component: IconFontsComponent
  },
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'widgets',
    component: WidgetsComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  }


];
export const routing = RouterModule.forChild(routes);
