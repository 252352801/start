import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  ElementRef,
  ContentChild,
  ViewChild} from '@angular/core';

@Component({
  selector: 'modal-body',
  template: `
    <div class="modal-body{{styleClass?' '+styleClass:''}}" #modalBody>
        <ng-content *ngIf="isReady||!delayShow"></ng-content>
    </div>
  `
})
export class ModalBodyComponent {
  @Input() styleClass: string;
  @Input() delayShow: boolean=false;

  @ViewChild('modalBody') modalBody:ElementRef;
  isReady:boolean=false;
  constructor() {
  }
}

