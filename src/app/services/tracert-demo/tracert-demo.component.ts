import { Component } from '@angular/core';
import { TracertService } from 'dolphinng';
@Component({
  selector: 'tracert-demo',
  templateUrl: './tracert-demo.component.html',
  styleUrls: ['./tracert-demo.component.less'],
  providers: [TracertService]
})
export class TracertDemoComponent {

  constructor(public tracertSvc: TracertService) {
  }

}
