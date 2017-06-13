import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent }   from './pages.component';
import { routing } from './pages.routing';
@NgModule({
    imports: [routing,SharedModule],
    declarations: [
      PagesComponent
    ]
})
export class PagesModule { }
