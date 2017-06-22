import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectivesComponent }   from './directives.component';
import { routing } from './directives.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      DirectivesComponent
    ]
})
export class DirectivesModule { }
