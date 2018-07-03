import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent }   from './charts.component';
import { routing } from './charts.routing';
@NgModule({
    imports: [
      routing,
      SharedModule

    ],
    declarations: [
      ChartsComponent
    ]
})
export class ChartsModule { }
