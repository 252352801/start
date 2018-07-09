import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() theme: string = '';
  constructor() {

  }

}

@Component({
  selector: 'header-left',
  template: `
    <div class="navbar-header" 
[ngClass]="{'bg-black':theme==='black',
           'bg-info':theme==='cerulean'
           }">
        <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./header.component.less']
})
export class HeaderLeftComponent {
  @Input() theme: string = '';
  constructor() {
    
  }
}

@Component({
  selector: 'header-right',
  template: `
    <div class="collapse pos-rlt navbar-collapse box-shadow" [ngClass]="{'show':dropDown,
    'bg-black':theme==='black',
     'bg-white-only':theme==='white'
    }">
        <ng-content></ng-content>
    </div>
  `
})
export class HeaderRightComponent {
  @Input() theme: string = 'black';
  dropDown: boolean = false;
  constructor() {
  }
  toggleDropDown() {
    this.dropDown = !this.dropDown;
  }
}
