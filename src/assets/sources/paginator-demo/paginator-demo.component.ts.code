import { Component} from '@angular/core';
@Component({
    selector: 'paginator-demo',
    templateUrl: './paginator-demo.component.html',
    styleUrls: ['./paginator-demo.component.less'],
})
export class PaginatorDemoComponent {
  tabIndex:number=1;
  page:any={
    index:0,
    count:1000,
    pageSize:6,
    pageSizeOptions:[10,20,30]
  };

  page1:any={
    index:0,
    count:1000,
    pageSize:6,
    pageSizeOptions:[10,20,30]
  };
  constructor(){
    setTimeout(()=>{
      this.page.count=500;
    },2000)
  }

  changTab(index:number){
    this.tabIndex=index;
  }

  onChangePage(ev:any){
    console.log(ev);
  }
  onChangePageError(ev:any){
    console.log(ev);
  }

}
