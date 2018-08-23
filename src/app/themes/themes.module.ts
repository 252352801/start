import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ThemesComponent }   from './themes.component';
import { routing } from './themes.routing';
@NgModule({
    imports: [
      routing,
      SharedModule
    ],
    declarations: [
      ThemesComponent
    ]
})
export class ThemesModule { }
