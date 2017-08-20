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
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
    {a:{b:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502945336494&di=e76c1de82f2fae334335f389e66618f3&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1029%2Fzyz%2F03%2F14583115_1350966109847.jpg'}},
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
