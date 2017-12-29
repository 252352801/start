import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ThemesControllerComponent }         from '../components/themes-controller/themes-controller.component';

import {
  FormsModule as MyFormsModule,
} from 'dolphinng';
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    MyFormsModule
  ],
  declarations: [
    ThemesControllerComponent
  ],
  exports:[
    FormsModule,
    CommonModule,
    MyFormsModule,
    ThemesControllerComponent
  ]
})
export class ThemesControllerModule { }
