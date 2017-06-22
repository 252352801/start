import { Component} from '@angular/core';
@Component({
    selector: 'searchbar-demo',
    templateUrl: './searchbar-demo.component.html',
    styleUrls: ['./searchbar-demo.component.less'],
})
export class SearchbarDemoComponent {
  keyword:'';
  myContext = {$implicit: 'World123', localSk: 'Svet'};
  constructor(){
  }
  selectSearchItem(ev:any){
    console.log(ev);
    this.keyword=ev;
  }
}
