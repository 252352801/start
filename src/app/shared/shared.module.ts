import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {DatePickerModule} from 'dolphinng';
import {FormsModule as MyFormsModule} from 'dolphinng';
import {PaginatorModule} from 'dolphinng';
import {GalleryModule} from 'dolphinng';
import {CodeHighLightModule} from 'dolphinng';
import {AreaPickerModule} from 'dolphinng';

import {DatetimePickerModule} from 'dolphinng';

import {CommonModule as MyCommonModule} from 'dolphinng';
import {UploaderModule} from 'dolphinng';
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    UploaderModule,
    //
    MyCommonModule,
    DatePickerModule,
    DatetimePickerModule,
    MyFormsModule,
    PaginatorModule,
    GalleryModule,
    CodeHighLightModule,
    AreaPickerModule

  ],
  declarations: [
  ],
  exports:[
    FormsModule,
    CommonModule,
    UploaderModule,
    //
    MyCommonModule,
    DatePickerModule,
    DatetimePickerModule,
    MyFormsModule,
    PaginatorModule,
    GalleryModule,
    CodeHighLightModule,
    AreaPickerModule
  ]
})
export class SharedModule { }
