import { Routes, RouterModule } from '@angular/router';
import { DirectivesComponent } from './directives.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: DirectivesComponent
    }


];
export const routing = RouterModule.forChild(routes);
