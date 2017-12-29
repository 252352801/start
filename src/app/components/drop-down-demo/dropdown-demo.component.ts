import { Component} from '@angular/core';
@Component({
    selector: 'drop-down-demo',
    templateUrl: './dropdown-demo.component.html',
    styleUrls: ['./dropdown-demo.component.less'],
})
export class DropDownDemoComponent {
  tabIndex:number=1;

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
  constructor(){
  }
  changTab(index:number){
    this.tabIndex=index;
  }
}
