import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {
  DatePickerModule,
  FormsModule as MyFormsModule,
  PaginatorModule,
  GalleryModule,
  CodeHighLightModule,
  AreaPickerModule,
  DatetimePickerModule,
  DateFormatModule,
  CommonModule as MyCommonModule,
  UploaderModule,
  SliderModule,
  DropDownModule,
  ValidateModule,
  TextMaxLengthModule,
  CurrencyFormatModule
} from 'dolphinng';
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    UploaderModule,
    //
    MyCommonModule,
    DatePickerModule,
    DatetimePickerModule,
    DateFormatModule,
    MyFormsModule,
    PaginatorModule,
    GalleryModule,
    CodeHighLightModule,
    AreaPickerModule,
    SliderModule,
    DropDownModule,
    ValidateModule,
    TextMaxLengthModule,
    CurrencyFormatModule
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
    DateFormatModule,
    MyFormsModule,
    PaginatorModule,
    GalleryModule,
    CodeHighLightModule,
    AreaPickerModule,
    SliderModule,
    DropDownModule,
    TextMaxLengthModule,
    CurrencyFormatModule
    //local
  ]
})
export class SharedModule { }
