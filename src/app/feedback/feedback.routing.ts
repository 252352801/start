import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { PopDemoComponent } from './pop-demo/pop-demo.component';
import { ToasterDemoComponent } from './toaster-demo/toaster-demo.component';

const routes: Routes = <Routes>[
    {
        path: '',
        component: FeedbackComponent
    },
  {
      path: 'pop',
      component: PopDemoComponent
  },
  {
    path: 'toaster',
    component: ToasterDemoComponent
  }


];
export const routing = RouterModule.forChild(routes);
