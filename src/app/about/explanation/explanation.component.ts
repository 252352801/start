import { Component,OnInit,ElementRef} from '@angular/core';
import { Prism } from 'prismjs';
@Component({
    selector: 'explanation',
    templateUrl: './explanation.component.html',
    styleUrls: ['./explanation.component.less'],
})
export class ExplanationComponent implements OnInit{

  constructor(private elemRef:ElementRef){
  }
  ngOnInit(){
    console.log(Prism);
  }
}
