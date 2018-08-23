import {
  Component, Input, Output, ElementRef, OnInit,
  AfterViewInit, AfterViewChecked, ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ContentChildren, ViewChild } from '@angular/core';
import { SubNavItemComponent } from '../sub-nav-item/sub-nav-item.component';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.less']
})
export class NavItemComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private rootElem: HTMLElement;
  public haveChild: boolean = false;
  private childrenActive: boolean = false;
  @Input() icon: string;
  @Input() text: string;
  @Input() link: any;

  @Input() disabled: any;//是否禁用

  @Input('badge-class') badgeClass: string;
  @Input('badge-value') badgeValue: any;

  @ViewChild('subWrap') subWrap: ElementRef;
  @ViewChild('root') root: ElementRef;
  @ViewChild('childrenHost', { read: ViewContainerRef }) childrenHost: ViewContainerRef;
  @ContentChildren(SubNavItemComponent) subNavItems: SubNavItemComponent[];
  /**动态组件 */
  private dynamicSubNavItems: SubNavItemComponent[];
  constructor(private elemRef: ElementRef,
    private router: Router,
    private actRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  /**
   * 获取dom相对浏览器的位置
   * @param obj
   * @returns <{left: number, top: number}>
   */
  getPosition(obj: any) {
    let topValue = 0, leftValue = 0;
    while (obj) {
      leftValue += obj.offsetLeft;
      topValue += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return { left: leftValue, top: topValue };
  }

  activeNavItem() {
    this.addClass(this.rootElem, 'active');
  }

  ngOnInit() {
    this.rootElem = this.root.nativeElement;
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          setTimeout(() => {//慢一个节拍
            let url = event.url.split(';')[0];
            //子导航收起
            let subNavWrap = this.subWrap.nativeElement;
            let wouldActive = this.isActive();
            if (wouldActive) {
              this.openSubNav(subNavWrap);
              (!this.link) && this.addClass(this.rootElem, 'active');
            } else {
              this.closeSubNav(subNavWrap);
              (!this.link) && this.removeClass(this.rootElem, 'active');
            }
          })
        }
      });
    this.rootElem.addEventListener('click', (ev) => {
      let isAsideFolded = this.isAsideFolded();
      let linkElem = this.rootElem.querySelector('a');
      if (linkElem.getAttribute('href') !== null) {
        return;
      }
      let subWrap: any = this.subWrap.nativeElement;
      let wouldActive = (subWrap.clientHeight > 0 ? false : true);
      if (!this.haveChild && this.disabled !== undefined && this.disabled + '' != 'false') {
        wouldActive = false;
      }
      if (!isAsideFolded) {
        if (wouldActive) {
          this.addClass(this.rootElem, 'active');
          this.openSubNav(subWrap);
        } else {
          this.removeClass(this.rootElem, 'active');
          this.closeSubNav(subWrap);
        }
      }
    });
    this.rootElem.addEventListener('mouseenter', (ev) => {
      let target = this.rootElem;
      if (!this.isAsideFolded()) {
        return;
      }
      if (!this.hasClass(target, 'nav-item-hover')) {
        this.addClass(target, 'nav-item-hover')
      } else {
        return;
      }
      let pos = this.getPosition(target), wrapPos;
      let navWrap = document.querySelector('.navi-wrap');
      if (navWrap) {
        wrapPos = this.getPosition(navWrap);
      }
      let subNavWrap: any = target.querySelector('.nav.nav-sub');
      let w = target.offsetWidth;
      let h = target.offsetHeight;
      let win_h = document.body.clientHeight;
      if (subNavWrap) {
        let subWrapHeight = subNavWrap.offsetHeight;
        let top = pos.top;
        subNavWrap.style.left = pos.left + w + 'px';
        if (win_h - pos.top < subWrapHeight) {
          if (win_h - pos.top + h < subWrapHeight) {
            top = wrapPos.top || 0;//50是头部高度
          } else {
            top = pos.top - subWrapHeight + h;
          }
        }
        subNavWrap.style.top = top + 'px';
        subNavWrap.style.maxHeight = win_h - wrapPos.top + 'px';
      }
      target = null;
    });
    this.rootElem.addEventListener('mouseleave', (ev) => {
      if (!this.isAsideFolded()) {
        return;
      }
      let classList = this.rootElem.className.split(/\s+/);
      if (classList.indexOf('nav-item-hover') >= 0) {
        this.removeClass(this.rootElem, 'nav-item-hover');
      }
      let subNavWrap: any = this.rootElem.querySelector('.nav.nav-sub');
      if (subNavWrap) {
        subNavWrap.style.maxHeight = 'inherit';
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkChild();
      if (this.hasActiveChildren()) {
        this.childrenActive = true;
        this.addClass(this.rootElem, 'active');
        this.openSubNav(this.rootElem.querySelector('.nav-sub'));
      }
    });
  }

  ngAfterViewChecked() {

  }

  private openSubNav(subNavElem: any) {
    if (subNavElem) {
      if (this.isAsideFolded()) {
        subNavElem.style.height = 'auto';
      } else if (subNavElem.clientHeight <= 0) {
        setTimeout(() => {
          let height = this.getSubNavHeight(subNavElem);
          subNavElem.style.height = height + 'px';
          setTimeout(() => {
            if (this.hasClass(this.rootElem, 'active')) {
              subNavElem.style.height = 'auto';
            } else {
              subNavElem.style.height = '0';
            }
          }, 300);
        });
      }
    }
  }

  private closeSubNav(subNavElem: any) {
    if (subNavElem.clientHeight > 0) {
      let height = this.getSubNavHeight(subNavElem);
      subNavElem.style.height = height + 'px';
      setTimeout(() => {
        subNavElem.style.height = '0';
      });
    }
  }

  private getSubNavHeight(subNavElem: any): number {
    let height = 0;
    if (subNavElem) {
      let children = subNavElem.querySelectorAll('sub-nav-item>li');
      if (children) {
        for (let i = 0, len = children.length; i < len; i++) {
          height += children[i].clientHeight;
        }
      }
    }
    return height;
  }

  hasActiveChildren(): boolean {
    let activeChildren = this.rootElem.querySelector('sub-nav-item li.active');
    return activeChildren !== null;
  }

  isAsideFolded(): boolean {
    let foldedElem = document.querySelector('.app.app-aside-folded');
    let isAsideFolded = foldedElem ? true : false;
    if (!isAsideFolded) {
      return false
    }
    let classList = foldedElem.className.split(/\s+/);
    if (classList.indexOf('off-screen') >= 0) {
      let clientWidth = document.body.clientWidth;
      if (clientWidth < 768) {
        return false
      }
    }
    return true;
  }

  isActive() {
    let active = false;
    if (this.link) {
      active = this.router.isActive(this.link, false);
    } else {
      /*if(this.elemRef.nativeElement.querySelector('.sub-nav-item.active')){
        active=true;
      }*/
      if (this.subNavItems && typeof this.subNavItems === 'object' && typeof this.subNavItems.forEach === 'function') {
        this.subNavItems.forEach((obj: SubNavItemComponent, index: number) => {
          if (obj.isActive()) {
            active = true;
          }
        });
      }
      if (!active && this.dynamicSubNavItems instanceof Array) {
        this.dynamicSubNavItems.forEach((obj: SubNavItemComponent, index: number) => {
          if (obj.isActive()) {
            active = true;
          }
        });
      }
    }
    return active;
  }


  /**
   * 检测是否有子组件
   */
  checkChild() {
    let child = this.elemRef.nativeElement.querySelector('sub-nav-item');
    if (child) {
      this.haveChild = true;
    }
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

  /**
   * 插入二级菜单
   * @param options 
   */
  inserSubNavItem(options: {
    text: string
    icon?: string
    link?: string
  }): SubNavItemComponent {
    let viewContainerRef = this.childrenHost;
    let sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SubNavItemComponent);
    let sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
    let sNavComponentInstance = (<SubNavItemComponent>sNavComponentRef.instance);
    sNavComponentInstance.text = options.text;
    options.icon && (sNavComponentInstance.icon = options.icon);
    options.link && (sNavComponentInstance.link = options.link);
    if (!this.dynamicSubNavItems) {
      this.dynamicSubNavItems = [];
    }
    this.dynamicSubNavItems.push(sNavComponentInstance);
    return sNavComponentInstance;
  }
}
