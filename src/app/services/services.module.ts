import { NgModule } from '@angular/core';
import { ServicesComponent }   from './services.component';
import { PopDemoComponent }   from './pop-demo/pop-demo.component';
import { PopupDemoComponent }   from './popup-demo/popup-demo.component';
import { ToasterDemoComponent }   from './toaster-demo/toaster-demo.component';
import { SharedModule }   from '../shared/shared.module';
import { routing } from './services.routing';

@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      ServicesComponent,
      PopDemoComponent,
      PopupDemoComponent,
      ToasterDemoComponent
    ]
})
export class ServicesModule { }
