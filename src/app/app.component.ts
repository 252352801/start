import { Component } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers:[]
})
export class AppComponent {
  constructor(
    private router:Router,
    private actRoute:ActivatedRoute,
  ){
    this.subscribeRouterChange();
  }
  /**
   * 订阅路由变化
   */
  private subscribeRouterChange() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.actRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')  // 过滤出未命名的outlet，<router-outlet>
      .subscribe((event) => {
        {
          if(document.documentElement){
            document.documentElement.scrollTop=0;
          }else if(document.body){
            document.body.scrollTop=0;
          }
        }
      });
  }
}
