import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  ElementRef,
  ContentChild,
  ViewChild} from '@angular/core';
@Component({
  selector: 'modal-footer',
  template: `
    <div class="modal-footer{{styleClass?' '+styleClass:''}}" >
        <ng-content></ng-content>
    </div>
  `
})
export class ModalFooterComponent {
  @Input() styleClass: string;

  constructor() {
  }
}

