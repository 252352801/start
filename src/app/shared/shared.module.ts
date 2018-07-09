import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {
  FormsModule as MyFormsModule,
  PaginatorModule,
  GalleryModule,
  AreaPickerModule,
  DatetimePickerModule,
  DateFormatModule,
  CommonModule as MyCommonModule,
  UploaderModule,
  SliderModule,
  DropDownModule,
  ValidateModule,
  TextMaxLengthModule,
  CurrencyFormatModule,
  SelectModule,
} from 'dolphinng';
import { CodeHighLightModule } from './components/code-high-light/code-high-light.module';
@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    UploaderModule,
    //
    MyCommonModule,
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
    CurrencyFormatModule,
    SelectModule,
  ],
  declarations: [
  ],
  exports:[
    FormsModule,
    CommonModule,
    UploaderModule,
    //
    MyCommonModule,
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
    CurrencyFormatModule,
    SelectModule,
    //local
  ]
})
export class SharedModule { }
