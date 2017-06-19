import { Component,Input,Output,ElementRef,OnInit} from '@angular/core';
import {Router,NavigationEnd, ActivatedRoute} from '@angular/router';
//declare var $:any;  //定义jquery
@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.less']
})
export class NavItemComponent implements OnInit{
  private rootElem:HTMLElement;
  haveChild:boolean=false;
  private childrenActive:boolean=false;
  @Input() icon:string;
  @Input() text:string;
  @Input() link:any;
  @Input('badge-class') badgeClass:string;
  @Input('badge-value') badgeValue:any;
  constructor(private elemRef:ElementRef,private router:Router){

  }

  /**
   * 获取dom相对浏览器的位置
   * @param obj
   * @returns {{left: number, top: number}}
     */
  getPosition(obj:any) {
    let topValue = 0, leftValue = 0;
    while (obj) {
      leftValue += obj.offsetLeft;
      topValue += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return {left: leftValue, top: topValue};
  }

  activeNavItem(){
    console.log('get emit');
    this.addClass(this.rootElem,'active');
  }
  ngOnInit() {
    this.checkChild();
    let wrap = document.querySelector('nav-wrap');
    this.rootElem = this.elemRef.nativeElement.querySelector('li');
    if(this.hasActiveChildren()){
      this.childrenActive = true;
      this.addClass(this.rootElem,'active');
    }
    this.rootElem.addEventListener('click', (ev)=> {
      let hasClass=this.hasClass(this.rootElem,'active');
      let navItems=document.querySelectorAll('nav-item>li');
      if(navItems.length){
        for(let i=0,len=navItems.length;i<len;i++){
          this.removeClass(navItems[i],'active');
        }
      }
      let wouldActive=true;
      let url=this.router.url,
        href,
        linkElem=this.rootElem.querySelector('a');
      if(linkElem){
        href=linkElem.getAttribute('href');
      }
      if(hasClass){
        if(!this.isAsideFolded()){
          wouldActive=(href!==url)?(this.haveChild?(href?true:false):false):(this.haveChild?false:true);
        }
      }
      if(wouldActive){
        this.addClass(this.rootElem,'active');
      }
    });
    this.rootElem.addEventListener('mouseover', (ev)=> {
      let target = this.rootElem;
      if (!this.isAsideFolded()) {
        return;
      }
      if (!this.hasClass(target,'nav-item-hover')) {
        this.addClass(target,'nav-item-hover')
      } else {
        return;
      }
      let pos = this.getPosition(target),wrapPos;
      let navWrap=document.querySelector('.navi-wrap');
      if(navWrap) {
        wrapPos = this.getPosition(navWrap);
      }
      let subNavWrap:any = target.querySelector('.nav.nav-sub');
      let w = target.offsetWidth;
      let h = target.offsetHeight;
      let win_h = document.body.clientHeight;
      if (subNavWrap) {
        let subWrapHeight = subNavWrap.offsetHeight;
        let top = pos.top;
        subNavWrap.style.left = pos.left + w + 'px';
        if (win_h - pos.top < subWrapHeight) {
          if(win_h - pos.top+h<subWrapHeight){
            top = wrapPos.top||0;//50是头部高度
          }else{
            top = pos.top - subWrapHeight + h;
          }
        }
        subNavWrap.style.top = top + 'px';
        subNavWrap.style.maxHeight=win_h-wrapPos.top+'px';
        subNavWrap.style.overflowY='auto';
      }
      target = null;
    });
    this.rootElem.addEventListener('mouseleave', (ev)=> {
      if (!this.isAsideFolded()) {
        return;
      }
      let classList = this.rootElem.className.split(/\s+/);
      if (classList.indexOf('nav-item-hover') >= 0) {
        this.removeClass(this.rootElem, 'nav-item-hover');
      }
      let subNavWrap:any = this.rootElem.querySelector('.nav.nav-sub');
      if(subNavWrap) {
        subNavWrap.style.maxHeight = 'inherit';
      }
    });
  }

  hasActiveChildren():boolean{
    let activeChildren = this.rootElem.querySelector('sub-nav-item[link="'+location.pathname+'"]');
    return activeChildren!==null;
  }

  isAsideFolded():boolean{
    let foldedElem=document.querySelector('.app.app-aside-folded');
    let isAsideFolded=foldedElem?true:false;
    if(!isAsideFolded){return false}
    let classList=foldedElem.className.split(/\s+/);
    if(classList.indexOf('off-screen')>=0){
      let clientWidth=document.body.clientWidth;
      if(clientWidth<768){
        return false
      }
    }
    return true;
  }
  checkChild(){
    let child=this.elemRef.nativeElement.querySelector('sub-nav-item');
    //console.info('child',child);
    if(child){
      this.haveChild=true;
    }
  }

  /**
   * 元素是否包含某个类
   * @param elem
   * @param className
   * @returns {boolean}
     */
  private hasClass(elem:HTMLElement,className:string):boolean{
    let classList=elem.className.split(/\s+/);
    return classList.indexOf(className)>=0;
  }

  /**
   * 为元素添加一个类
   * @param elem
   * @param className
     */
  private addClass(elem:HTMLElement,className:string){
    let classList=elem.className.split(/\s+/);
    if(classList.indexOf(className)<0){
      classList.push(className);
      elem.className=classList.join(' ');
    }
  }
  /**
   * 删除某个类
   * @param elem
   * @param className
     */
  private removeClass(elem:any,className:string){
    let classList=elem.className.split(/\s+/);
    let clsIndex=classList.indexOf(className);
    if(clsIndex>=0){
      classList.splice(clsIndex,1);
      elem.className=classList.join(' ');
    }
  }
}
