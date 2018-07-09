import { Component} from '@angular/core';
import { PopService} from 'dolphinng';
@Component({
    selector: 'delete-wrap-demo',
    templateUrl: './delete-wrap-demo.component.html',
    styleUrls: ['./delete-wrap-demo.component.less'],
  providers:[PopService]
})
export class DeleteWrapDemoComponent {
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
  constructor(
    private pop:PopService
  ){

  }

  deleteConfirm(index:number){
    this.pop.confirm({
      text:'确定要删除第'+(index+1)+'张图片吗？'
    }).onConfirm(()=>{
      this.galleryImages.splice(index,1);
    });
  }
}
