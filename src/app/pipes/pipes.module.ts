import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {PipesComponent} from './pipes.component';
import {DatePipeDemoComponent} from './date/date-pipe-demo.component';
import { routing } from './pipes.routing';
@NgModule({
    imports: [
      routing,
      SharedModule
    ],
    declarations: [
      PipesComponent,
      DatePipeDemoComponent
    ]
})
export class PipesModule { }
