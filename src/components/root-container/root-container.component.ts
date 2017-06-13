import { Component,Input,Output} from '@angular/core';
@Component({
  selector: 'root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.less']
})
export class RootContainerComponent {
  @Input() headerFixed:boolean;
  @Input() asideFixed:boolean;
  @Input() asideFolded:boolean;
  @Input() asideDock:boolean;
  @Input() container:boolean;
  @Input() offScreen:boolean;
  constructor(){

  }
}
