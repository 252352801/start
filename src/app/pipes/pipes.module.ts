import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PipesComponent } from './pipes.component';
import { DatePipeDemoComponent } from './date/date-pipe-demo.component';
import { CurrencyPipeDemoComponent } from './currency/currency-pipe-demo.component';
import { routing } from './pipes.routing';
import { CurrencyFormatModule } from 'dolphinng';
@NgModule({
  imports: [
    routing,
    SharedModule,
    CurrencyFormatModule
  ],
  declarations: [
    PipesComponent,
    DatePipeDemoComponent,
    CurrencyPipeDemoComponent,
  ]
})
export class PipesModule { }
