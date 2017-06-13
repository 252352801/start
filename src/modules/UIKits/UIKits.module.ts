import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UIKitsComponent }   from './UIKits.component';
import { IconFontsComponent }   from './iconfonts/iconfonts.component';
import { ButtonsComponent }   from './buttons/buttons.component';
import { routing } from './UIKits.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      UIKitsComponent,
      IconFontsComponent,
      ButtonsComponent
    ]
})
export class UIKitsModule { }
