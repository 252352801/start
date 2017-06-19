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
@NgModule({
  imports:[CommonModule,FormsModule],
  declarations: [
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent,
    DatePickerDirective,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    PaginatorComponent
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
    PaginatorComponent
  ]
})
export class SharedModule { }
