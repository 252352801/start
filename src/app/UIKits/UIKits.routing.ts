import { Routes, RouterModule } from '@angular/router';
import { UIKitsComponent } from './UIKits.component';
import { IconFontsComponent } from './iconfonts/iconfonts.component';
import { ButtonsComponent } from './buttons/buttons.component';

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
  }


];
export const routing = RouterModule.forChild(routes);
