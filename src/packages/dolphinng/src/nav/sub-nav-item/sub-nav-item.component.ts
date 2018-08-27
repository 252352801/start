import {
  Component, Input, Output, OnInit, ElementRef, EventEmitter, AfterViewInit, ViewContainerRef, ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ContentChildren } from '@angular/core';
import { ThirthNavItemComponent } from '../thirth-nav-item/thirth-nav-item.component';
@Component({
  selector: 'sub-nav-item',
  templateUrl: './sub-nav-item.component.html',
  styleUrls: ['./sub-nav-item.component.less']
})
export class SubNavItemComponent implements OnInit, AfterViewInit {
  @Input() text: string;
  @Input() link: string;
  @Input() icon: string;

  @Input() disabled: any;//是否禁用

  hasChild: boolean = false;
  routeLink: string;
  @ViewChild('childrenHost', { read: ViewContainerRef }) childrenHost: ViewContainerRef;
  @ContentChildren(ThirthNavItemComponent) thirthNavItems: ThirthNavItemComponent[];
  /**动态组件 */
  private dynamicThirthNavItems: ThirthNavItemComponent[];
  constructor(
    private elemRef: ElementRef,
    private router: Router,
    private actRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }
  ngOnInit() {

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          let url = event.url.split(';')[0];
          //子导航收起
          // if(this.hasChild) {
          let li = this.elemRef.nativeElement.querySelector('.sub-nav-item');
          let wouldActive = false;
          let thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
          //let matchStr='link="'+url;
          // wouldActive=(li&&li.innerHTML.match(matchStr));
          wouldActive = this.isActive();
          if (wouldActive) {
            this.addClass(li, 'active');
            thirthNavWrap && this.openWrap(thirthNavWrap);
          } else {
            //if (this.isAsideFolded()) {
            thirthNavWrap && this.closeWrap(thirthNavWrap);
            this.removeClass(li, 'active');
            //}
          }
          //}
        }
      });


    this.elemRef.nativeElement.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (this.hasChild) {
        let li = this.elemRef.nativeElement.querySelector('.sub-nav-item');
        let linkElem = li.querySelector('a');
        if (linkElem.getAttribute('href') !== null) {
          return;
        }
        let wouldActive = false;
        let thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
        wouldActive = (li && !this.hasClass(li, 'active'));
        if (wouldActive) {
          thirthNavWrap && this.openWrap(thirthNavWrap);
          this.addClass(li, 'active');
        } else {
          thirthNavWrap && this.closeWrap(thirthNavWrap);
          this.removeClass(li, 'active');
        }
      }
    });
  }

  isActive() {
    let active = false;
    if (this.link) {
      active = this.router.isActive(this.link, false);
    } else {
      /*if(this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')){
        active=true;
      }*/
      if (this.thirthNavItems && typeof this.thirthNavItems === 'object' && typeof this.thirthNavItems.forEach === 'function') {
        this.thirthNavItems.forEach((obj: ThirthNavItemComponent, index: number) => {
          if (obj.isActive()) {
            active = true;
          }
        });
      }
      if (!active && this.dynamicThirthNavItems instanceof Array) {
        this.dynamicThirthNavItems.forEach((obj: ThirthNavItemComponent, index: number) => {
          if (obj.isActive()) {
            active = true;
          }
        });
      }
    }
    return active;
  }
  private openWrap(elem: any) {
    let org_h = elem.clientHeight, h = 0;
    let items = elem.querySelectorAll('.thirth-nav-item');
    for (let item of items) {
      h += item.clientHeight;
    }
    if (elem.clientHeight < h) {
      elem.style.height = org_h + '';
      setTimeout(() => {
        elem.style.height = h + 'px';
        setTimeout(() => {
          elem.style.height = null;
        }, 300);
      });
    }
  }
  private closeWrap(elem: any) {
    elem.style.height = elem.clientHeight + 'px';
    setTimeout(() => {
      elem.style.height = '0';
      setTimeout(() => {
        elem.style.height = null;
      }, 300);
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.elemRef.nativeElement.querySelector('.thirth-nav-item')) {
        this.hasChild = true;
        if (this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')) {
          this.addClass(this.elemRef.nativeElement.querySelector('.sub-nav-item'), 'active');
        }
      }
    });
  }
  isAsideFolded(): boolean {
    let foldedElem = document.querySelector('.app.app-aside-folded');
    let isAsideFolded = foldedElem ? true : false;
    if (!isAsideFolded) { return false }
    let classList = foldedElem.className.split(/\s+/);
    if (classList.indexOf('off-screen') >= 0) {
      let clientWidth = document.body.clientWidth;
      if (clientWidth < 768) {
        return false
      }
    }
    return true;
  }
  /**
   * 元素是否包含某个类
   * @param elem
   * @param className
   * @returns boolean
   */
  private hasClass(elem: HTMLElement, className: string): boolean {
    let classList = elem.className.split(/\s+/);
    return classList.indexOf(className) >= 0;
  }

  /**
   * 为元素添加一个类
   * @param elem
   * @param className
   */
  private addClass(elem: HTMLElement, className: string) {
    let classList = elem.className.split(/\s+/);
    if (classList.indexOf(className) < 0) {
      classList.push(className);
      elem.className = classList.join(' ');
    }
  }
  /**
   * 删除某个类
   * @param elem
   * @param className
   */
  private removeClass(elem: any, className: string) {
    let classList = elem.className.split(/\s+/);
    let clsIndex = classList.indexOf(className);
    if (clsIndex >= 0) {
      classList.splice(clsIndex, 1);
      elem.className = classList.join(' ');
    }
  }

  inserThirthNavItem(options: {
    text: string
    icon?: string
    link?: string
  }): ThirthNavItemComponent {
    let viewContainerRef = this.childrenHost;
    let sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ThirthNavItemComponent);
    let sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
    let sNavComponentInstance = (<ThirthNavItemComponent>sNavComponentRef.instance);
    sNavComponentInstance.text = options.text;
    options.icon && (sNavComponentInstance.icon = options.icon);
    options.link && (sNavComponentInstance.link = options.link);
    if (!this.dynamicThirthNavItems) {
      this.dynamicThirthNavItems = [];
    }
    this.dynamicThirthNavItems.push(sNavComponentInstance);
    return sNavComponentInstance;
  }
}
