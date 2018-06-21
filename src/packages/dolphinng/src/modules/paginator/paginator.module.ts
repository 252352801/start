import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule}         from '@angular/forms';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  declarations: [
    PaginatorComponent
  ],
  providers: [],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule {
}
