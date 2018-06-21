import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  ElementRef,
  ContentChild,
  ViewChild} from '@angular/core';
@Component({
  selector: 'modal-header',
  template: `
    <div class="modal-header{{styleClass?' '+styleClass:''}}" [ngClass]="{'modal-header-reduce':showCloseButton}">
        <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./modal.component.less']
})
export class ModalHeaderComponent {
  @Input() showCloseButton:boolean=true;
  @Input() styleClass: string;
}

