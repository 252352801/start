import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UIKitsComponent }   from './UIKits.component';
import { IconFontsComponent }   from './iconfonts/iconfonts.component';
import { ButtonsComponent }   from './buttons/buttons.component';
import { GridComponent }   from './grid/grid.component';
import { WidgetsComponent }   from './widgets/widgets.component';
import { TimelineComponent }   from './timeline/timeline.component';
import { routing } from './UIKits.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      UIKitsComponent,
      IconFontsComponent,
      ButtonsComponent,
      GridComponent,
      WidgetsComponent,
      TimelineComponent
    ]
})
export class UIKitsModule { }
