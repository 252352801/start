import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { CodeTextareaDirective }         from '../../directives/codeTextarea/codeTextarea.directive';
import {ToggleClassDirective} from '../../directives/toggleClass/toggleClass.directive';
import {CodeHighLightComponent} from '../../components/code-high-light/code-high-light.component';
@NgModule({
  imports:[CommonModule],
  declarations: [
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent
  ],
  exports:      [
    FormsModule,
    CommonModule,
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent
  ]
})
export class SharedModule { }
