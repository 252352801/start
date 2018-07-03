import { Component } from '@angular/core';
import { SwitchComponent } from '../switch/switch.component';
@Component({
  selector: 'toggle',
  templateUrl: '../switch/switch.component.html',
  styleUrls: ['../switch/switch.component.less']
})
export class ToggleComponent extends SwitchComponent {
  constructor() {
    super();
  }
}
