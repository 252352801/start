import { NgModule } from '@angular/core';
import { FeedbackComponent }   from './feedback.component';
import { PopDemoComponent }   from './pop-demo/pop-demo.component';
import { ToasterDemoComponent }   from './toaster-demo/toaster-demo.component';
import { SharedModule }   from '../shared/shared.module';
import { routing } from './feedback.routing';

@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      FeedbackComponent,
      PopDemoComponent,
      ToasterDemoComponent
    ]
})
export class FeedbackModule { }
