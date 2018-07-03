import { Component} from '@angular/core';
@Component({
    selector: 'gallery-demo',
    templateUrl: './gallery-demo.component.html',
    styleUrls: ['./gallery-demo.component.less'],
})
export class GalleryDemoComponent {
  tabIndex:number=1;

  galleryImages=[
    {a:{b:'./assets/img/b1.jpg'}},
    {a:{b:'./assets/img/b2.jpg'}},
    {a:{b:'./assets/img/b3.jpg'}},
    {a:{b:'./assets/img/b4.jpg'}},
    {a:{b:'./assets/img/b5.jpg'}},
    {a:{b:'./assets/img/b6.jpg'}},
    {a:{b:'./assets/img/b7.jpg'}},
    {a:{b:'./assets/img/b8.jpg'}},
    {a:{b:'./assets/img/b9.jpg'}},
    {a:{b:'./assets/img/b10.jpg'}},
    {a:{b:'./assets/img/c1.jpg'}},
  ];
  constructor(){
  }
  changTab(index:number){
    this.tabIndex=index;
  }
}
