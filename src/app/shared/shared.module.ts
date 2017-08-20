import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { CodeTextareaDirective }         from 'dolphinng';
import {ToggleClassDirective} from 'dolphinng';
import {CodeHighLightComponent} from 'dolphinng';
import {DatePickerDirective} from 'dolphinng';
import {CheckboxComponent} from 'dolphinng';
import {RadioComponent} from 'dolphinng';
import {ToggleComponent} from 'dolphinng';
import {PaginatorComponent} from 'dolphinng';
import {GalleryComponent} from 'dolphinng';
import {DeleteWrapComponent} from 'dolphinng';

import {CodeHighlighterModule} from 'primeng/primeng';
import {UploaderModule} from 'dolphinng';
@NgModule({
  imports:[CommonModule,FormsModule,CodeHighlighterModule,UploaderModule],
  declarations: [
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent,
    DatePickerDirective,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    PaginatorComponent,
    GalleryComponent,
    DeleteWrapComponent
  ],
  exports:      [
    FormsModule,
    CommonModule,
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent,
    DatePickerDirective,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    PaginatorComponent,
    GalleryComponent,
    DeleteWrapComponent,
    CodeHighlighterModule,
    UploaderModule
  ]
})
export class SharedModule { }
