import { Component, NgModule, Input, Output, ElementRef, EventEmitter, ViewChild, ContentChild, ViewContainerRef, ComponentFactoryResolver, ContentChildren, Directive, Pipe, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class QBtnGroupComponent {
    constructor() {
    }
    /**
     * @return {?}
     */
    goTop() {
        {
            if (document.documentElement) {
                document.documentElement.scrollTop = 0;
            }
            if (document.body) {
                document.body.scrollTop = 0;
            }
        }
    }
    /**
     * @return {?}
     */
    back() {
        history.back();
    }
}
QBtnGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'q-btn-group',
                template: `<div class="q-btn-group">
  <div class="q-btn" (click)="goTop()">
    <i class="q-btn-icon fa fa-chevron-up"></i>
    <span class="q-btn-text">回到顶部</span>
  </div>
  <div class="q-btn" (click)="back()">
    <i class="q-btn-icon fa fa-chevron-left"></i>
    <span class="q-btn-text">返回</span>
  </div>
</div>
`,
                styles: [`.q-btn-group{position:fixed;width:50px;height:101px;right:0;bottom:50%;font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.q-btn{width:100%;height:50px;margin-bottom:1px;text-align:center;color:#fff;position:relative;overflow:hidden}.q-btn:last-child{border-bottom:none}.q-btn-icon{display:block;width:100%;height:100%;background-color:rgba(0,0,0,.4);line-height:50px;font-size:24px;position:absolute;left:0;top:0;-webkit-transition:top .3s;transition:top .3s;cursor:pointer}.q-btn-text{display:block;width:100%;height:100%;position:absolute;left:0;top:100%;padding:5px 10px;line-height:20px;cursor:pointer;-webkit-transition:top .3s;transition:top .3s;background-color:rgba(0,0,0,.5)}.q-btn:last-child .q-btn-text{line-height:36px}.q-btn-text:active{background-color:rgba(0,0,0,.6)}.q-btn:hover .q-btn-text{top:0}.q-btn:hover .q-btn-icon{top:-100%}`]
            },] },
];
/** @nocollapse */
QBtnGroupComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class QBtnGroupModule {
}
QBtnGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    QBtnGroupComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    FormsModule,
                    QBtnGroupComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginatorComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.count = 0;
        this.pageSize = 10;
        this.pageSizeChange = new EventEmitter();
        this.index = 0;
        this.indexChange = new EventEmitter();
        this.items = [];
        this.maximum = 5;
        this.changePageSizeAble = false;
        this.inputAble = false;
        this.ellipsis = true;
        this.pageSizeOptions = [10, 30, 50, 100];
        this.size = '';
        this.showTotal = false;
        this.onChangePage = new EventEmitter();
        this.onChangePageError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.create();
        this.initPageSizeOptions();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ countChg = changes['count'];
        let /** @type {?} */ pageSizeChg = changes['pageSize'];
        if ((countChg && countChg.currentValue !== countChg.previousValue) || (pageSizeChg && pageSizeChg.currentValue !== pageSizeChg.previousValue)) {
            this.create();
        }
    }
    /**
     * 建立页码元素和页数
     * @return {?}
     */
    create() {
        this.pageCount = Math.ceil(this.count / this.pageSize);
        let /** @type {?} */ sIndex, /** @type {?} */ eIndex;
        if (this.pageCount <= 0) {
            //总条目小于等于0
            sIndex = 0;
            eIndex = 1;
        }
        else if (this.index > this.pageCount - 1) {
            //当前页超出最大页
            this.index = this.pageCount - 1;
            this.indexChange.emit(this.index);
            eIndex = this.index + 1;
            sIndex = eIndex - this.maximum > 0 ? eIndex - this.maximum : 0;
        }
        else {
            //当前页小于等于最大页
            sIndex = this.index;
            if (this.pageCount - 1 - this.index < this.maximum) {
                sIndex = this.pageCount - this.maximum;
            }
            if (sIndex < 0) {
                sIndex = 0;
            }
            eIndex = (sIndex + this.maximum <= this.pageCount) ? sIndex + this.maximum : this.pageCount;
        }
        this.createItems(sIndex, eIndex);
    }
    /**
     * 初始化每页大小选项
     * @return {?}
     */
    initPageSizeOptions() {
        if (this.pageSizeOptions.indexOf(this.pageSize) < 0) {
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.pageSizeOptions.length; i < len; i++) {
                if (this.pageSize <= this.pageSizeOptions[i]) {
                    if (i === 0) {
                        this.pageSizeOptions.unshift(this.pageSize);
                    }
                    else {
                        this.pageSizeOptions.splice(i, 0, this.pageSize);
                    }
                    break;
                }
            }
        }
    }
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    createItems(start, end) {
        if (start < 0) {
            start = 0;
        }
        this.items = [];
        for (let /** @type {?} */ i = start; i < end; i++) {
            this.items.push(i);
        }
    }
    /**
     * 改变页大小
     * @param {?} ev
     * @return {?}
     */
    changePageSize(ev) {
        let /** @type {?} */ e = ev || window.event;
        let /** @type {?} */ target = e.target || e.srcElement;
        let /** @type {?} */ newSize = parseInt(target.value);
        this.pageSize = newSize;
        this.pageSizeChange.emit(newSize);
        this.create();
        this.onChangePage.emit(this.index);
    }
    /**
     * 改变页
     * @param {?} index
     * @return {?}
     */
    changePage(index) {
        if (index >= 0 && index < this.pageCount) {
            this.index = index;
            this.indexChange.emit(this.index);
            this.onChangePage.emit(this.index);
            if (this.items.indexOf(this.index) < 0) {
                //如果跳转的页码不在items(页码按钮集)内
                let /** @type {?} */ sIndex, /** @type {?} */ eIndex;
                if (this.index < this.items[0]) {
                    //items左边
                    let /** @type {?} */ a = this.index - this.maximum + 1;
                    sIndex = (a > 0 ? a : 0);
                }
                else if (this.index > this.items[this.items.length - 1]) {
                    //items右边
                    sIndex = this.index;
                    if (sIndex > this.pageCount - this.maximum) {
                        sIndex = this.pageCount - this.maximum;
                    }
                    if (sIndex < 0) {
                        sIndex = 0;
                    }
                }
                let /** @type {?} */ b = this.pageCount - sIndex;
                eIndex = b > this.maximum ? sIndex + this.maximum : sIndex + b;
                this.createItems(sIndex, eIndex);
            }
        }
        else {
            let /** @type {?} */ arg = (this.inputIndex !== undefined ? this.inputIndex : this.index);
            this.onChangePageError.emit(arg);
        }
    }
    /**
     * 上一页
     * @return {?}
     */
    prev() {
        if (this.index > 0) {
            this.index--;
            this.changePage(this.index);
        }
    }
    /**
     * 下一页
     * @return {?}
     */
    next() {
        if (this.index < this.pageCount - 1) {
            this.index++;
            this.changePage(this.index);
        }
    }
    /**
     * 第一页
     * @return {?}
     */
    first() {
        if (this.index !== 0) {
            this.index = 0;
            this.changePage(this.index);
        }
    }
    /**
     * 最后一页
     * @return {?}
     */
    last() {
        if (this.index !== this.pageCount - 1) {
            this.index = this.pageCount - 1;
            this.changePage(this.index);
        }
    }
}
PaginatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'paginator',
                template: `<div class="pagination-wrap{{styleClass?' '+styleClass:''}}">
    <div class="pagination-text" *ngIf="showTotal" [ngClass]="{'pagination-text-sm':size==='sm'}">
        共<span>{{pageCount}}</span>页，<span>{{count}}</span>条记录
    </div>
    <div class="pagination-text" *ngIf="changePageSizeAble" [ngClass]="{'pagination-text-sm':size==='sm'}">
        每页
        <select (change)="changePageSize($event)" [value]="pageSize">
      <option [value]="opt" *ngFor="let opt of pageSizeOptions">{{opt}}</option>
    </select> 条
    </div>
    <ul class="pagination" [ngClass]="{'pagination-sm':size==='sm'}">
        <li [ngClass]="{'disabled':index===0}" title="{{index===0?'已经是第一页':'首页'}}"><a (click)="first()"><i class="fa-step-backward fa"></i></a></li>
        <li [ngClass]="{'disabled':index<=0}" title="{{index<=0?'已经是第一页':'上一页'}}"><a (click)="prev()"><i class="fa-angle-left fa"></i></a></li>
        <li (click)="changePage(items[0]-1)" *ngIf="items[0]>0&&ellipsis"><a>...</a></li>
        <li [ngClass]="{'active':index===item}" *ngFor="let item of items" (click)="changePage(item)"><a>{{item+1}}</a></li>
        <li (click)="changePage(items[items.length-1]+1)" *ngIf="items[items.length-1]<pageCount-1&&ellipsis  "><a>...</a></li>
        <li [ngClass]="{'disabled':index>=pageCount-1}" title="{{index>=pageCount-1?'已经是第最后一页':'下一页'}}"><a (click)="next()"><i class="fa-angle-right fa"></i></a></li>
        <li [ngClass]="{'disabled':index>=pageCount-1}" title="{{index>=pageCount-1?'已经是第最后一页':'最后一页'}}"><a (click)="last()"><i class="fa-step-forward fa"></i></a></li>
    </ul>
    <div class="pagination-input" *ngIf="inputAble">
        <div class="input-group" [ngClass]="{'input-group-sm':size==='sm'}">
            <input class="form-control" placeholder="页码" [(ngModel)]="inputIndex" name="inputIndex" />
            <a class="input-group-addon" (click)="changePage(inputIndex-1)">GO</a>
        </div>
    </div>
</div>`,
                styles: [`ul.pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:left;margin:0}.pagination-text{float:left;line-height:34px;padding-right:10px}.pagination-text.pagination-text-sm{font-size:12px;line-height:29px}.pagination-wrap:after{content:'';display:block;clear:both}.pagination-input{float:left}.pagination-input a{color:#428bca}.pagination-input .input-group{width:105px}.pagination-input .input-group.input-group-sm{width:90px}.pagination-input .input-group .input-group-addon{background-color:#fff}.pagination-input .input-group .input-group-addon:hover{background-color:#edf1f2}.pagination-text select{padding:4px 6px;border:1px solid #ddd}.pagination-text.pagination-text-sm select{padding:4px}.pagination-text span{color:#ff6700}.pagination>li:first-child>a,.pagination>li:first-child>span{border-top-left-radius:0;border-bottom-left-radius:0}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon{border-radius:0}.input-group-sm>.form-control{height:29px;border-radius:0}.input-group-sm .input-group-addon{height:29px;padding:4px 10px}.pagination-input .form-control{min-width:0}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{background-color:#09c}`]
            },] },
];
/** @nocollapse */
PaginatorComponent.ctorParameters = () => [
    { type: ElementRef, },
];
PaginatorComponent.propDecorators = {
    "count": [{ type: Input },],
    "pageSize": [{ type: Input },],
    "pageSizeChange": [{ type: Output },],
    "index": [{ type: Input },],
    "indexChange": [{ type: Output },],
    "maximum": [{ type: Input },],
    "changePageSizeAble": [{ type: Input },],
    "inputAble": [{ type: Input },],
    "ellipsis": [{ type: Input },],
    "pageSizeOptions": [{ type: Input },],
    "size": [{ type: Input },],
    "showTotal": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "onChangePage": [{ type: Output },],
    "onChangePageError": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginatorModule {
}
PaginatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    PaginatorComponent
                ],
                providers: [],
                exports: [
                    PaginatorComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GalleryComponent {
    /**
     * @param {?} eleRef
     */
    constructor(eleRef) {
        this.eleRef = eleRef;
        this.data = [];
        this.dataProps = [];
        this.size = '';
        this.title = '';
        this.isAnimation = true;
        this.isHeader = false;
        this.isToolsBar = false;
        this.isBtnDownload = false;
        this.change = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.isFullScreen = false;
        this.images = [];
        this.render = false;
        this.visible = false;
        this.ready = false;
        this.width = null;
        this.height = null;
        this.left = 0;
        this.top = 0;
        this.tempLeft = 0;
        this.tempTop = 0;
        this.thumbScrollWidth = 0;
        this.transitionTime = 300;
        this.activeIndex = 0;
        this.transition = '';
        this.isThumbOverflow = false;
        this.isEventSource = false;
        this.isShowBtns = false;
        this.isSupportCssObjectFit = false;
        this.isPressing = false;
        this.tween = {
            //tween部分函数
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1)
                    return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        };
        this.bodyPadR = 0;
        this.mousePosition = {
            //鼠标在
            x: 0,
            y: 0
        };
        this.mouseClickedPoint = {
            //鼠标按下去时的位置
            x: 0,
            y: 0
        };
        this.isShowScaleInfo = false;
        this.hideScaleInfoTimer = 0;
        //窗口大小改变
        this.resizeHandler = () => {
            clearTimeout(this.resizeCheckTimer);
            this.resizeCheckTimer = setTimeout(() => {
                this.checkIsThumbOverflow();
            }, 300);
        };
        //窗口点击
        this.windowClickHandler = (ev) => {
            if (!this.size && !this.isShowBtns) {
                this.close();
            }
        };
        //按下键盘
        this.keydownHandler = (ev) => {
            if (this.images.length > 1) {
                const /** @type {?} */ kc = ev.keyCode;
                if (kc === 37 || kc === 38) {
                    this.prev();
                    this.slideThumbAfterChange(0);
                }
                else if (kc === 39 || kc === 40) {
                    this.next();
                    this.slideThumbAfterChange(1);
                }
            }
        };
        //鼠标滚动
        this.mouseWheelHandler = (ev) => {
            let /** @type {?} */ e = ev || window.event;
            if (this.visible) {
                //
                let /** @type {?} */ mouseX = e['clientX'] || e['pageX'];
                let /** @type {?} */ mouseY = e['clientY'] || e['pageY'];
                let /** @type {?} */ gbody = this.galleryBody;
                if (gbody && gbody.nativeElement) {
                    let /** @type {?} */ rect = gbody.nativeElement.getBoundingClientRect();
                    if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
                        if (e['wheelDelta'] < 0 || e['detail'] < 0) {
                            //向下滚动 --缩小
                            this.reduce(0.1);
                        }
                        else if (e['wheelDelta'] > 0 || e['detail'] > 0) {
                            //向上滚动 --放大
                            this.enlarge(0.1);
                        }
                    }
                }
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        let /** @type {?} */ elem = document.createElement('IMG');
        if (elem.style['objectFit'] !== undefined) {
            this.isSupportCssObjectFit = true;
        }
        elem = null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeEvents();
    }
    /**
     * 鼠标在图片上按下时
     * @param {?} ev
     * @return {?}
     */
    onMouseDownImg(ev) {
        ev.preventDefault();
        let /** @type {?} */ p = this.getMousePosition(ev);
        this.mousePosition.x = p.left;
        this.mousePosition.y = p.top;
        this.mouseClickedPoint.x = p.left;
        this.mouseClickedPoint.y = p.top;
        this.isPressing = true;
    }
    /**
     * 鼠标弹起
     * @param {?} ev
     * @return {?}
     */
    onMouseUpImg(ev) {
        ev.stopPropagation();
        let /** @type {?} */ p = this.getMousePosition(ev);
        if (p.left == this.mouseClickedPoint.x && p.top == this.mouseClickedPoint.y) {
            this.toggleShowTools();
        }
        this.isPressing = false;
    }
    /**
     * 鼠标在图片上移动
     * @param {?} ev
     * @return {?}
     */
    onMouseMoveImg(ev) {
        ev.preventDefault();
        if (this.isPressing) {
            //如果同时在按着鼠标(拖拽)
            let /** @type {?} */ p = this.getMousePosition(ev);
            let /** @type {?} */ img = this.images[this.activeIndex];
            let /** @type {?} */ x = 2 * (p.left - this.mousePosition.x) + img.left;
            let /** @type {?} */ y = 2 * (p.top - this.mousePosition.y) + img.top;
            if (img.rotate % 360 == 90) {
                x = 2 * (p.top - this.mousePosition.y) + img.left;
                y = -2 * (p.left - this.mousePosition.x) + img.top;
            }
            else if (img.rotate % 360 == 180) {
                x = -2 * (p.left - this.mousePosition.x) + img.left;
                y = -2 * (p.top - this.mousePosition.y) + img.top;
            }
            else if (img.rotate % 360 == 270) {
                x = -2 * (p.top - this.mousePosition.y) + img.left;
                y = 2 * (p.left - this.mousePosition.x) + img.top;
            }
            img.left = x;
            img.top = y;
            this.mousePosition.x = p.left;
            this.mousePosition.y = p.top;
        }
    }
    /**
     * 禁止事件冒泡
     * @param {?} ev
     * @return {?}
     */
    stopPropagation(ev) {
        ev.stopPropagation();
    }
    /**
     * 清除事件
     * @return {?}
     */
    removeEvents() {
        //取消监听
        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('click', this.windowClickHandler);
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('mousewheel', this.mouseWheelHandler);
        window.removeEventListener('DOMMouseScroll', this.mouseWheelHandler);
    }
    /**
     * 检查是否溢出
     * @return {?}
     */
    checkIsThumbOverflow() {
        let /** @type {?} */ elem = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
        let /** @type {?} */ check = () => {
            if (this.images.length > 1) {
                if (elem && elem['offsetWidth'] > 0) {
                    this.isThumbOverflow = elem && (elem.scrollWidth > elem.clientWidth);
                    if (this.isThumbOverflow) {
                        let /** @type {?} */ galleryThumbScroll = this.eleRef.nativeElement.querySelector('.gallery-thumb-scroll');
                        let /** @type {?} */ thumbSliders = galleryThumbScroll.querySelectorAll('.gallery-thumb-slider');
                        if (thumbSliders.length > 0) {
                            this.thumbScrollWidth = thumbSliders[0]['offsetWidth'] * thumbSliders.length;
                            if (this.thumbScrollWidth < elem.scrollWidth) {
                                this.isThumbOverflow = false;
                            }
                        }
                    }
                }
                else {
                    setTimeout(check, 10);
                }
            }
        };
        check();
    }
    /**
     * 初始化图片数据
     * @param {?} data
     * @param {?} props
     * @return {?}
     */
    initImages(data, props) {
        this.images = [];
        if (data.length > 0) {
            let /** @type {?} */ images = [];
            for (let /** @type {?} */ o of data) {
                let /** @type {?} */ url = '';
                if (props.length > 0) {
                    url = this.getValueByProps(o, props);
                }
                else if (typeof o == 'string') {
                    url = o;
                }
                images.push({
                    url: url,
                    scale: 1,
                    rotate: 0,
                    left: 0,
                    top: 0
                });
            }
            this.images = images;
        }
    }
    /**
     * 改变显示图片后滑动（如果需要）缩略图
     * @param {?} direction
     * @return {?}
     */
    slideThumbAfterChange(direction) {
        clearTimeout(this.thumbSlideTimer);
        this.thumbSlideTimer = setTimeout(() => {
            let /** @type {?} */ sliderWrap = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
            if (sliderWrap) {
                let /** @type {?} */ perW = sliderWrap.offsetWidth;
                let /** @type {?} */ scrollL = sliderWrap.scrollLeft;
                let /** @type {?} */ sliderW = sliderWrap.clientWidth;
                if (direction === 0) {
                    let /** @type {?} */ refValue = (this.activeIndex) * perW;
                    if (scrollL > refValue) {
                        this.slide(sliderWrap, refValue - scrollL);
                    }
                }
                else if (direction === 1) {
                    let /** @type {?} */ validScrollLeft = perW * (this.activeIndex + 1) - sliderW;
                    if (validScrollLeft > scrollL) {
                        this.slide(sliderWrap, validScrollLeft - scrollL);
                    }
                }
            }
        });
    }
    /**
     * 缩略图滚动
     * @param {?} elem
     * @param {?} direction
     * @return {?}
     */
    slideThumb(elem, direction) {
        var /** @type {?} */ val = 0;
        var /** @type {?} */ thumbItem = elem.querySelector('.gallery-thumb-slider');
        var /** @type {?} */ thumbItemWidth = thumbItem['offsetWidth'];
        if (direction == 0) {
            val = -elem.clientWidth;
        }
        else {
            val = Math.floor(elem.clientWidth / thumbItemWidth) * thumbItemWidth;
        }
        var /** @type {?} */ canScrollVal = elem.scrollWidth - elem.scrollLeft;
        if (val > canScrollVal) {
            val = Math.floor((canScrollVal) / thumbItemWidth) * thumbItemWidth;
        }
        this.slide(elem, val);
    }
    /**
     * 滚动
     * @param {?} elem 滚动的元素
     * @param {?} val  滚动值
     * @return {?}
     */
    slide(elem, val) {
        var /** @type {?} */ scrollLen = val;
        {
            var /** @type {?} */ fps = 60; //帧数
            var /** @type {?} */ run_time = 300; //执行时间
            var /** @type {?} */ t_o = 1000 / fps; //每改变一次的时间间隔
            var /** @type {?} */ t = 0; //开始时间
            var /** @type {?} */ b = elem.scrollLeft; //初始值
            var /** @type {?} */ c = scrollLen; //变化量
            var /** @type {?} */ d = run_time / t_o; //次数
            var /** @type {?} */ animate = this.tween.easeInOut; //选择算法
        }
        var /** @type {?} */ timer = setInterval(function () {
            var /** @type {?} */ newVal = Math.ceil(animate(t, b, c, d));
            elem.scrollLeft = newVal;
            if (t < d) {
                t++;
            }
            else {
                clearInterval(timer);
            }
        }, t_o);
    }
    /**
     * 通过属性名获取值
     * @param {?} obj
     * @param {?} pros
     * @return {?} any
     */
    getValueByProps(obj, pros) {
        let /** @type {?} */ result = obj;
        for (let /** @type {?} */ prop of pros) {
            if (typeof result === 'object') {
                result = result[prop];
            }
        }
        return result;
    }
    /**
     * 打开
     * @param {...?} args
     * @return {?}
     */
    open(...args) {
        this.hideBodyScrollBar();
        this.render = true;
        this.isShowBtns = true;
        this.isFullScreen = false;
        this.isPressing = false;
        let /** @type {?} */ dataIndex = 0; //索引
        let /** @type {?} */ ev; //事件源
        let /** @type {?} */ paramStrArr = []; //字符串数组参数容器
        let /** @type {?} */ imgSrc = '';
        if (args && args.length > 0) {
            //参数处理
            for (let /** @type {?} */ i in args) {
                if (args[i] instanceof MouseEvent) {
                    //匹配事件源
                    ev = args[i];
                }
                if (typeof args[i] === 'number') {
                    //匹配index
                    dataIndex = args[i];
                }
                if (args[i] instanceof Array) {
                    //匹配
                    paramStrArr.push(args[i]);
                }
                if (typeof args[i] === 'string') {
                    //匹配单个图片地址或title
                    if (!imgSrc) {
                        //第一个字符串作为单个图片的地址
                        imgSrc = args[i];
                    }
                    else {
                        //n+1(n=0,1,2..)第2个以及之后的字符串作为title
                        this.title = args[i]; //title
                    }
                }
            }
        }
        let /** @type {?} */ dataObj = this.data;
        let /** @type {?} */ dataProps = this.dataProps;
        if (imgSrc !== '') {
            dataObj = [imgSrc];
            dataProps = [];
            dataIndex = 0;
        }
        else {
            if (paramStrArr.length > 0) {
                dataObj = paramStrArr[0];
            }
            if (paramStrArr.length > 1) {
                dataProps = paramStrArr[1];
            }
        }
        this.initImages(dataObj, dataProps);
        let /** @type {?} */ maxIndex = dataObj.length - 1;
        this.activate(dataIndex > maxIndex ? maxIndex : dataIndex);
        if (ev) {
            //根据事件源获取鼠标点击位置，从而从该位置弹出
            this.isEventSource = true;
            let /** @type {?} */ pos = this.getMousePosition(ev), /** @type {?} */
            scrollElem = document.documentElement || document.body, /** @type {?} */
            scrollLeft = scrollElem.scrollLeft, /** @type {?} */
            scrollTop = scrollElem.scrollTop;
            this.tempLeft = (pos.left - scrollLeft) + 'px';
            this.tempTop = (pos.top - scrollTop) + 'px';
            this.left = this.tempLeft;
            this.top = this.tempTop;
        }
        else {
            this.isEventSource = false;
            this.tempLeft = '0';
            this.tempTop = '0';
        }
        let /** @type {?} */ isAnimation = ((this.isAnimation + '') != 'false');
        {
            //就绪
            let /** @type {?} */ delay = isAnimation ? this.transitionTime : 0;
            setTimeout(() => {
                this.ready = true; //就绪
                this.checkIsThumbOverflow(); //检查是否溢出
            }, delay);
        }
        {
            //动画
            if ((this.isAnimation + '') != 'false') {
                setTimeout(() => {
                    if (this.isEventSource) {
                        this.transition = 'all ' + this.transitionTime + 'ms' + ' ease-in-out';
                    }
                    else {
                        this.transition = 'opacity ' + this.transitionTime + 'ms' + ' ease-in-out';
                    }
                    this.show();
                }, 100);
            }
            else {
                this.show();
            }
        }
        this.addWindowListeners();
    }
    /**
     * @return {?}
     */
    show() {
        setTimeout(() => {
            //显示
            this.visible = true;
            this.setPositionAccordingSize();
        });
    }
    /**
     * 监听窗口事件
     * @return {?}
     */
    addWindowListeners() {
        //监听窗口大小变化
        window.addEventListener('resize', this.resizeHandler);
        //点击窗口空白处
        setTimeout(() => {
            window.addEventListener('click', this.windowClickHandler);
        });
        //键盘控制
        setTimeout(() => {
            window.addEventListener('keydown', this.keydownHandler);
        });
        //
        setTimeout(() => {
            window.addEventListener('mousewheel', this.mouseWheelHandler);
            window.addEventListener('DOMMouseScroll', this.mouseWheelHandler);
        });
    }
    /**
     * 根据尺寸设置位置
     * @return {?}
     */
    setPositionAccordingSize() {
        if (this.size == 'lg') {
            this.left = '10%';
            this.top = '10%';
        }
        else if (this.size == 'md') {
            this.left = '20%';
            this.top = '20%';
        }
        else if (this.size == 'sm') {
            this.left = '30%';
            this.top = '30%';
        }
        else if (this.size == 'xs') {
            this.left = '37.5%';
            this.top = '37.5%';
        }
        else {
            this.left = '0';
            this.top = '0';
        }
        let /** @type {?} */ bodyW = document.body.clientWidth;
        let /** @type {?} */ bodyH = document.body.clientHeight;
        let /** @type {?} */ w = parseFloat(this.width), /** @type {?} */
        h = parseFloat(this.height);
        if (w > bodyW) {
            w = bodyW;
        }
        if (h > bodyH) {
            h = bodyH;
        }
        this.styleWidth = w + 'px';
        this.styleHeight = h + 'px';
        if (w) {
            this.left = 'calc(50% - ' + w / 2 + 'px)';
        }
        if (h) {
            this.top = 'calc(50% - ' + h / 2 + 'px)';
        }
    }
    /**
     * 关闭
     * @return {?}
     */
    close() {
        this.reShowBodyScrollBar();
        this.visible = false;
        if (this.isEventSource) {
            this.left = this.tempLeft;
            this.top = this.tempTop;
            this.styleWidth = 0;
            this.styleHeight = 0;
        }
        this.ready = false;
        setTimeout(() => {
            this.render = false;
            this.transition = '';
        }, this.transitionTime);
        this.removeEvents();
        this.onClose.emit();
    }
    /**
     * 全屏切换
     * @return {?}
     */
    toggleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
    }
    /**
     * 点击空白处
     * @return {?}
     */
    whiteSpaceClickAction() {
        if (!this.size) {
            this.close();
        }
    }
    /**
     * 最外层容器点击处理
     * @param {?} ev
     * @return {?}
     */
    wrapClickAction(ev) {
        if (this.size) {
            ev.stopPropagation();
        }
    }
    /**
     * 上一张
     * @return {?}
     */
    prev() {
        if (this.activeIndex > 0) {
            this.activate(this.activeIndex - 1);
        }
    }
    /**
     * 下一张
     * @return {?}
     */
    next() {
        if (this.activeIndex < this.images.length - 1) {
            this.activate(this.activeIndex + 1);
        }
    }
    /**
     * 激活指定图片到当前窗口
     * @param {?} index
     * @return {?}
     */
    activate(index) {
        this.activeIndex = index;
        this.change.emit(this.activeIndex);
        this.onChange.emit(this.activeIndex);
    }
    /**
     * 获取鼠标位置
     * @param {?} e
     * @return {?} <{left: number; top: number}>
     */
    getMousePosition(e) {
        var /** @type {?} */ m_x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
                || document.body.scrollLeft));
        var /** @type {?} */ m_y = e.pageY || (e.clientY +
            (document.documentElement.scrollTop
                || document.body.scrollTop));
        return { left: m_x, top: m_y };
    }
    /**
     * 显示/隐藏工具
     * @return {?}
     */
    toggleShowTools() {
        this.isShowBtns = !this.isShowBtns;
    }
    /**
     * 放大
     * @param {?} val
     * @return {?}
     */
    enlarge(val) {
        let /** @type {?} */ img = this.images[this.activeIndex];
        let /** @type {?} */ scale = img.scale;
        scale += val;
        img.scale = scale;
        this.showScaleInfo();
    }
    /**
     * 缩小
     * @param {?} val
     * @return {?}
     */
    reduce(val) {
        let /** @type {?} */ img = this.images[this.activeIndex];
        let /** @type {?} */ scale = img.scale;
        if (scale > 0.1) {
            scale -= val;
        }
        img.scale = scale;
        this.showScaleInfo();
    }
    /**
     * 显示缩放比例信息
     * @return {?}
     */
    showScaleInfo() {
        this.isShowScaleInfo = true;
        clearTimeout(this.hideScaleInfoTimer);
        this.hideScaleInfoTimer = setTimeout(() => {
            this.isShowScaleInfo = false;
        }, 1000);
    }
    /**
     * 旋转
     * @return {?}
     */
    rotate() {
        let /** @type {?} */ img = this.images[this.activeIndex];
        img.scale = 1;
        img.left = 0;
        img.top = 0;
        let /** @type {?} */ rotate = img.rotate;
        rotate += 90;
        img.rotate = rotate;
    }
    /**
     * 下载
     * @return {?}
     */
    download() {
        let /** @type {?} */ url = this.images[this.activeIndex].url;
        const /** @type {?} */ iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.setAttribute('src', url);
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }
    /**
     * 隐藏document.body的滚动条（如果有的话）
     * @return {?}
     */
    hideBodyScrollBar() {
        let /** @type {?} */ orgW = document.body.offsetWidth; //有滚动条时的宽度
        document.body.style.overflowY = 'hidden';
        let /** @type {?} */ curW = document.body.offsetWidth; //无滚动条时的宽度
        let /** @type {?} */ padR = document.body.style.paddingRight.replace('px', '');
        if (padR) {
            this.bodyPadR = parseFloat(padR);
        }
        if (curW > orgW) {
            document.body.style.paddingRight = this.bodyPadR + (curW - orgW) + 'px'; //给body设置paddingRight避免页面抖动
        }
    }
    /**
     * 重新显示document.body的滚动条（如果有的话）
     * @return {?}
     */
    reShowBodyScrollBar() {
        document.body.style.overflowY = null;
        document.body.style.paddingRight = (this.bodyPadR ? this.bodyPadR + 'px' : null);
    }
}
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery',
                template: `<div class="gallery" *ngIf="render" (click)="wrapClickAction($event)" [ngClass]="{'open':visible,
    'gallery-has-footer':(isToolsBar+'')!='false',
    'gallery-has-header':(isHeader+'')!='false',
     'gallery-fade-in':(isAnimation+'')!='false'&&!isEventSource,
     'gallery-inc-in':(isAnimation+'')!='false'&&isEventSource,
     'lg':size=='lg',
     'md':size=='md',
     'sm':size=='sm',
     'xs':size=='xs'
     }" [style.left]="isFullScreen?0:left" [style.top]="isFullScreen?0:top" [style.width]="isFullScreen?'100%':(styleWidth?styleWidth:null)" [style.height]="isFullScreen?'100%':(styleHeight?styleHeight:null)" [style.border]="isFullScreen?'none':null"
    [style.transition]="transition?transition:null">
    <div *ngIf="(isHeader+'')!='false'" class="gallery-header">
        {{title}}
        <a class="gallery-btn-full" *ngIf="size" [ngClass]="{'resize':isFullScreen}" (click)="toggleFullScreen()">
        </a>
        <a class="gallery-btn-close" (click)="close()">×</a>
    </div>
    <div class="gallery-body" #galleryBody>
        <div class="gallery-sliders" (click)="whiteSpaceClickAction()">
            <a class="gallery-img-container" *ngFor="let img of images;let i=index" [style.transform]="'rotate('+img.rotate+'deg)'" [style.left.%]="activeIndex==i?0:(i-activeIndex)*200" (mousemove)="onMouseMoveImg($event)">
                <img [src]="img.url" [hidden]="!ready&&activeIndex!=i" (click)="stopPropagation($event)" [style.transform]="'scale('+img.scale+')'" [style.left.px]="img.left" [style.top.px]="img.top" (mousedown)="onMouseDownImg($event)" (mouseup)="onMouseUpImg($event)"
                />
            </a>
        </div>
        <a class="gallery-close" (click)="close()" *ngIf="isShowBtns&&!((isHeader+'')!='false')">×</a>
        <a class="gallery-prev" (click)="prev();slideThumbAfterChange(0)" *ngIf="isShowBtns&&images.length>1">‹</a>
        <a class="gallery-next" (click)="next();slideThumbAfterChange(1)" *ngIf="isShowBtns&&images.length>1">›</a>
        <div class="gallery-thumb" *ngIf="isShowBtns&&images.length>1" [ngClass]="{'gallery-thumb-overflow':isThumbOverflow}">
            <div class="gallery-thumb-back" (click)="slideThumb(galleryThumbSliders,0)"></div>
            <div class="gallery-thumb-sliders" #galleryThumbSliders>
                <div class="gallery-thumb-scroll" [style.width]="isThumbOverflow?thumbScrollWidth+'px':'auto'">

                    <a class="gallery-thumb-slider" *ngFor="let img of images;let i=index" [ngClass]="{'active':i==activeIndex}" (click)="activate(i)">
                        <img [src]="img.url" [ngClass]="{'cover':isSupportCssObjectFit}" />
                    </a>
                </div>
            </div>
            <div class="gallery-thumb-forward" (click)="slideThumb(galleryThumbSliders,1)"></div>
        </div>
        <div class="gallery-scale-info" *ngIf="isShowScaleInfo&&images[activeIndex].scale!=1">
            {{images[activeIndex].scale|percent}}
        </div>
    </div>
    <div class="gallery-footer" *ngIf="(isToolsBar+'')!='false'">
        <div class="gallery-toolsbar">
            <a class="gallery-tool-item gallery-enlarge" (click)="enlarge(0.1)" title="放大">
            </a>
            <a class="gallery-tool-item gallery-reduce" (click)="reduce(0.1)" title="缩小">
            </a>
            <a class="gallery-tool-item gallery-rotate" (click)="rotate()" title="旋转"></a>
            <a class="gallery-tool-item gallery-download" *ngIf="(isBtnDownload+'')!='false'" (click)="download()" title="下载"></a>
        </div>
    </div>
</div>`,
                styles: [`.gallery{position:fixed;width:100%;height:100%;opacity:1;overflow:hidden;background-color:rgba(0,0,0,.75);z-index:99999;-webkit-transform:translate3d(0,0,0);bottom:36px}.gallery.gallery-fade-in{opacity:0}.gallery.gallery-fade-in.open{opacity:1}.gallery.gallery-inc-in{width:0;height:0;opacity:0}.gallery.gallery-inc-in.open{width:100%;height:100%;opacity:1}.gallery,.gallery *{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.gallery-sliders{position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,.75);text-align:center}.gallery-sliders img{max-width:100%;max-height:100%;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;-webkit-transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);cursor:pointer}.gallery-btn-full span{display:block}.gallery .gallery-next,.gallery .gallery-prev{-webkit-box-sizing:content-box;box-sizing:content-box}.gallery-next,.gallery-prev{position:absolute;top:50%;left:15px;width:40px;height:40px;margin-top:-23px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:60px;font-weight:100;line-height:30px;color:#fff;text-decoration:none;text-shadow:0 0 2px #000;text-align:center;background:rgba(0,0,0,.5);-webkit-box-sizing:content-box;box-sizing:content-box;border:3px solid #fff;border-radius:23px;opacity:.5;cursor:pointer}.gallery-next{left:auto;right:15px}.gallery-next:hover,.gallery-prev:hover{color:#fff;opacity:1}.gallery-thumb{position:absolute;bottom:2px;width:100%;height:40px}.gallery-thumb img{max-width:100%;max-height:100%;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto}.gallery-thumb img.cover{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.gallery-thumb-sliders{width:50%;height:40px;margin:0 auto;text-align:center;overflow:hidden;white-space:nowrap}.gallery-thumb-scroll{width:100%;height:100%}.gallery-thumb-slider{position:relative;display:inline-block;width:40px;height:40px;border:2px solid transparent;cursor:pointer}.gallery-thumb-slider:hover{border-color:#ddd}.gallery-thumb-slider.active,.gallery-thumb-slider.active:hover{border-color:#ff8d00}.gallery-thumb-back,.gallery-thumb-forward{width:20px;height:40px;background-color:#080808;position:absolute;top:0;cursor:pointer;opacity:.5;display:none}.gallery-thumb-back:hover,.gallery-thumb-forward:hover{opacity:1}.gallery-thumb-back{left:25%;margin-left:-24px}.gallery-thumb-forward{left:75%;margin-left:4px}.gallery-thumb-back:after{content:'';display:block;width:0;height:0;border:6px solid transparent;border-right-color:#999;position:absolute;left:0;top:14px}.gallery-thumb-forward:after{content:'';display:block;width:0;height:0;border:6px solid transparent;border-left-color:#999;position:absolute;left:8px;top:14px}.gallery-thumb-overflow .gallery-thumb-back,.gallery-thumb-overflow .gallery-thumb-forward{display:block}.gallery-thumb-overflow .gallery-thumb-slider{display:block;float:left}.gallery .gallery-header{display:block;position:absolute;width:100%;height:36px;line-height:36px;padding-left:15px;padding-right:36px;background-color:#fafafa}.gallery .gallery-header .gallery-btn-close,.gallery .gallery-header .gallery-btn-full{display:block;position:absolute;left:100%;top:0;text-align:center;cursor:pointer;opacity:.5;width:36px;height:36px;font-size:24px;line-height:34px;color:#000;font-weight:400}.gallery .gallery-header .gallery-btn-close:hover,.gallery .gallery-header .gallery-btn-full:hover{opacity:1;background-color:#f0f0f0}.gallery .gallery-header .gallery-btn-close:active,.gallery .gallery-header .gallery-btn-full:active{background-color:#eee}.gallery .gallery-header .gallery-btn-full:after{content:'';display:block;position:absolute;left:32%;top:32%;width:36%;height:36%;border:1px solid #333}.gallery .gallery-header .gallery-btn-full:after.resize{background-color:#fafafa}.gallery .gallery-header .gallery-btn-full:after:hover{background-color:#eee}.gallery .gallery-header .gallery-btn-full.resize:before{content:'';display:block;position:absolute;left:38%;top:24%;width:38%;height:38%;border:1px solid #000}.gallery .gallery-header .gallery-btn-full.resize:after{background-color:#fafafa}.gallery .gallery-header .gallery-btn-close{margin-left:-36px}.gallery .gallery-header .gallery-btn-full{margin-left:-72px}.gallery .gallery-body{position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;text-align:center}.gallery.gallery-has-header .gallery-body{top:36px}.gallery.gallery-has-footer .gallery-body{bottom:36px}.gallery .gallery-img-container{display:block;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transition:left .5s,-webkit-transform .3s;transition:left .5s,transform .3s,-webkit-transform .3s;cursor:default}.gallery.lg,.gallery.md,.gallery.sm,.gallery.xs{background-color:transparent;border:1px solid #ddd;width:0;height:0}.gallery.gallery-fade-in.lg,.gallery.open.lg{width:80%;height:80%}.gallery.gallery-fade-in.md,.gallery.open.md{width:60%;height:60%}.gallery.gallery-fade-in.sm,.gallery.open.sm{width:40%;height:40%}.gallery.gallery-fade-in.xs,.gallery.open.xs{width:25%;height:25%}.gallery .gallery-close{display:block;width:50px;height:50px;text-align:center;line-height:50px;color:#fff;font-size:48px;position:absolute;right:0;top:0;cursor:pointer;opacity:.5}.gallery .gallery-close:hover{opacity:1}.gallery .gallery-footer{width:100%;height:36px;background-color:#fafafa;position:absolute;left:0;bottom:0;text-align:center;cursor:pointer}.gallery .gallery-enlarge{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAVlQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqFmfAQAAAHJ0Uk5TAB48Ukw0Dh2K2Pq9aAYLjvf9x3xTRFyV4d9Xzv6uKgFVkATm9lgHoKs4h4IFKwKvNRusEIAU8cCLMNnGgdXDPa3jVHXd7taU+1qqpZzwtQPrqTtpZ1b0OpEiERfi5BOPykOY8iBCmZOdEi/B/O/bqOwfaXudmAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAFgSURBVDjLrZFpXwFRFMYvGcWQZB1mDBJS0TJaRFFKq6Siok2b9jrf/0UzmdVM6kXPi3ufc5//vWfmdxD6V+n0fQbM+FPaP2ACTmbcYtWIB21D9mGHU+9ye7xA+NSP+0kqwHs6aIJQuCsfiYzKymgM4rTifX9kTHkjAePy0kbyTSeCkx2TTJFTUj4dmeHdLDC8S8/NS8CCPaACEAOLIpBZQmpAB1nJOjQAlFsW3Ao4tYB8QXCroGfXtSIrAta5bYM7Lm0KgAFc7Lq1zSoFOW7b4Y539wQAA7dWi3JRcEazRwPYrxyILO6l1UAVDkXgCI7VAFVLi4CVyES7gTp5IhuWD2L8jE7POqbRPL+Qj/MSEor5N67gWl6jcBwoqSWqNwFaihuIzpI3zG3n/6oUWbhrwb2SQBgOkMs/tMsVqIUeEa0m0BPzXHh5fXu3fH+eFqEUXYJ2sjfR+vhEvYlf8j/qC60wQzlGBaYSAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA3LTAyVDExOjA5OjU1KzA4OjAwbUTN8gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNy0wMlQxMTowOTo1NSswODowMBwZdU4AAABVdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX3MwNHM2OXpkMGg5LyVFNiU5NCVCRSVFNSVBNCVBNy5zdmdu5UiCAAAAAElFTkSuQmCC) 0 0/54%}.gallery .gallery-reduce{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAUdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzQoxCwAAAGx0Uk5TAB48Ukw0Dh2K2Pq9aAYLjvf9x3xTRFyV4d9Xzv6uKgFVkATm9lgHoKs4h4ICrzUbrBTxwIuAMNnGgdXDPa3jVHXd1pT7WqqlnPC1A+upO2lnVvQ6kRfi5BOPykOY8iBCmZOdEi/B/O/bqOwfNHRegwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAFESURBVDjLrVDrPwJBFB1po7YkvWu3UVYleSxWipbkmYQor/XKm/v/f9Zi3yM+OB/u75x7zty5Mwj9K/ps/XbK8ZM7MOgEGS7a7SHYQ95h34g/YAuGwhGIxqzD4wyb+OZ41AnJlMkf48Z1Mp2BLDbMj3MTxhM5mNRLL2O+ND/FTGtqhpu1LMXPzWtiwZewBJAAiyovLJE+DYoa9ZM+rrSssBUIkAJlUWGrYOvWtYqGdbld3VACdgh26+aWhm25vbOrBCgIka6oVRTmcIUJ/l59X+V0BFsDDThQ+SEcWQNsk1e5J1pIm/1j5kSnYpAx+a326Zlen0POsEbrAi4NB1JZYHnd/DaAZFwcF5kr4frrfQ2WEW8kuDU9jaIBSuW7Tq0OzeQ9wtYEehAexafnl1f353qkhBG4Cp1874T09o56J37x/4gPKY8205Li1UMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDctMDJUMTE6MDk6NTUrMDg6MDBtRM3yAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA3LTAyVDExOjA5OjU1KzA4OjAwHBl1TgAAAFV0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fczA0czY5emQwaDkvJUU3JUJDJUE5JUU1JUIwJThGLnN2Z/+kyYIAAAAASUVORK5CYII=) 0 0/54%}.gallery .gallery-download{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAHtQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvXgcsAAAACh0Uk5TAJnMAV8gG+cp/BWAKv5rd+ktKOZt6i7uMy/rNO81MOw2MehhVoi7xNEWWXAAAAABYktHRACIBR1IAAAACXBIWXMAAABIAAAASABGyWs+AAAAn0lEQVQ4y+3Q2xKCIBAG4BU1qDSzEx21zMO+/xMWkEPYykVXXfTfsDP/B8wsgJsgAH8Y+4OvQRjFNIijUJ8T5IICgk9nZpojTz5BwtNFP2e4zIdgtU439rcMt7kL3F6L3TsQ3O2VkHsLDsdhr8WpB1SvxPliQEH2L/EERUn3WlwZu432amOyqqTdD/UG4vh9I/w9wL2GH0zTetNAh950D8JXErq3nJU1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA3LTAyVDEwOjEzOjM0KzA4OjAwBmZZTQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNy0wMlQxMDoxMzozNCswODowMHc74fEAAABLdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX244Y3Bsd3lyamhmL2Rvd25sb2FkLnN2Z7KI2c8AAAAASUVORK5CYII=) 0 0/40%}.gallery .gallery-rotate{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAW5QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATQNnfwAAAHl0Uk5TAA5Zm8rq+vbjklYKJp31+dC0mKvM+/GZIEoWCYz9Vw9MrfeHCPx8JdMssCEMgjH4Xl306So67ecjNPPNEl+Ury0pwd0Fo7u3Nc/rtZwCkcnLmpBYUQ0LLv6NtrEbimBlgcc7OMgEGfDkImIYuC+zBxBSlqayzo7cxW1q9fMAAAABYktHRACIBR1IAAAACXBIWXMAAABIAAAASABGyWs+AAABb0lEQVQ4y4WQ6VsBURSHD8akLJNlKtlSo0EyNbQp7atUolCpCEVatHf/+zCJzOL3Ye49532fc88zAH+RyRWYEu9RYb19auBHo9Uhol+vNRhNJBoYHOK65uFfbLGSNqPdwRXqESc+OkbV265xrkW7kd7zb54XmSYAfGiyUfqVzFTnk9NsINgUaKVyhr+Uf3ZunhMsbkaAAyyEFpcaghWFQTBhtFwXNKQeRLJC1gWta1VMWHPVBJnOyCfU+kYjeE2QIztf2Nza5rKzCwpCBpLB9qQ5RPa7CISimxCVogdUlycOTXAkuSQWg2PCIc4dZBwSKCEunCAznAr96ma8oSRA1JYS48H0We1L4+diwgWRqR+X6EqYX6Ns46RyzI0Qz7OFIne7VUUEjPxdqdy8p1TMPW8+W6JbVSWHHh7bsecJFcrtjecsa3PKq1xRffGmiWyxY2TllUV47M0Qff9wodBnRmBrn91QCBDs13fcnGx1fwCbyj1+4IrcPQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0wMlQxMDoxMzozNCswODowMAZmWU0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMDJUMTA6MTM6MzQrMDg6MDB3O+HxAAAASnRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9uOGNwbHd5cmpoZi9yZWZyZXNoLnN2Z5DgT6AAAAAASUVORK5CYII=) 0 0/40%}.gallery .gallery-tool-item{display:inline-block;vertical-align:middle;width:36px;height:36px;text-align:center;line-height:36px;opacity:.75;position:relative;background-repeat:no-repeat;background-position:50% 50%;color:#333}.gallery .gallery-tool-item:hover{opacity:1}.gallery-scale-info{display:inline-block;text-align:center;position:relative;margin:10px auto;border-radius:15px;color:#fff;padding:4px 10px;background-color:rgba(0,0,0,.5);font-size:12px}`]
            },] },
];
/** @nocollapse */
GalleryComponent.ctorParameters = () => [
    { type: ElementRef, },
];
GalleryComponent.propDecorators = {
    "data": [{ type: Input },],
    "dataProps": [{ type: Input },],
    "size": [{ type: Input },],
    "title": [{ type: Input },],
    "isAnimation": [{ type: Input },],
    "isHeader": [{ type: Input },],
    "isToolsBar": [{ type: Input },],
    "isBtnDownload": [{ type: Input },],
    "change": [{ type: Output },],
    "onChange": [{ type: Output },],
    "onClose": [{ type: Output },],
    "galleryBody": [{ type: ViewChild, args: ['galleryBody',] },],
    "width": [{ type: Input },],
    "height": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GalleryModule {
}
GalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GalleryComponent
                ],
                providers: [],
                exports: [
                    GalleryComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SpinnerComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.isDark = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'spinner',
                template: `<div class="spinner"
     [ngClass]="{'spinner-xs':size==='xs','spinner-sm':size==='sm','spinner-lg':size==='lg',
     'spinner-dark':isDark,
     'spinner-three':type==='three','spinner-sixty':type==='sixty'}">
</div>
`,
                styles: [`.spinner{display:inline-block;width:32px;height:32px;background-image:url(img/nine-lg.gif);background-size:100%;vertical-align:middle}.spinner.spinner-sixty{background-image:url(img/sixty-lg.gif)}.spinner.spinner-dark{background-image:url(img/nine-dark-lg.gif)}.spinner.spinner-sixty.spinner-dark{background-image:url(img/sixty-dark-lg.gif)}.spinner.spinner-xs{width:16px;height:16px}.spinner.spinner-sm{width:24px;height:24px}.spinner.spinner-lg{width:48px;height:48px}`]
            },] },
];
/** @nocollapse */
SpinnerComponent.ctorParameters = () => [
    { type: ElementRef, },
];
SpinnerComponent.propDecorators = {
    "type": [{ type: Input },],
    "size": [{ type: Input },],
    "isDark": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LoaderModule {
}
LoaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SpinnerComponent
                ],
                providers: [],
                exports: [
                    SpinnerComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.value = false;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    changeAction(ev) {
        this.valueChange.emit(this.value);
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'checkbox',
                template: `<div class="{{styleClass!=='none'?styleClass:''}} {{display==='block'?'checkbox':'checkbox-inline'}}">
  <label class="i-checks"
         [ngClass]="{'i-checks-sm':size==='sm','i-checks-lg':size==='lg'}">
    <input type="checkbox"  [(ngModel)]="value" [name]="name" [disabled]="disabled" (change)="changeAction($event)" />
    <i [ngClass]="{'inner-checked':innerStyle==='checked'}"
       [style.border-color]="value?customBackground&&innerStyle!=='checked'?customBackground:null:null"
       [style.background-color]="value?customBackground&&innerStyle==='checked'?customBackground:null:null"
       >
      <span class="i-checks-inner" [style.background-color]="value?customBackground&&innerStyle!=='checked'?customBackground:null:null">

      </span>
    </i>
    <ng-content></ng-content>
  </label>
</div>


`,
                styles: [`.checkbox,.checkbox-inline{padding-right:15px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox]{position:relative;margin-top:0;margin-left:0;top:2px}.i-checks input+i:before{content:none}.i-checks input[disabled]:checked+i .i-checks-inner{background-color:#dee5e7}.i-checks input:checked+i .i-checks-inner{left:4px;top:4px;width:10px;height:10px;background-color:#23b7e5}.i-checks>i .i-checks-inner{content:"";position:absolute;left:50%;top:50%;width:0;height:0;background-color:transparent;-webkit-transition:.2s;transition:.2s}.i-checks input+i.inner-checked{-webkit-transition:.3s;transition:.3s}.i-checks input:checked+i.inner-checked{border-color:transparent;background-color:#186ba0}.i-checks input:checked+i.inner-checked .i-checks-inner{left:2px;top:3px;width:14px;height:8px;background-color:transparent;border-left:3px solid #fff;border-bottom:3px solid #fff;-webkit-transition:none;transition:none;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.i-checks.i-checks-sm input:checked+i.inner-checked .i-checks-inner{left:2px;top:2px;width:10px;height:6px;border-left:2px solid #fff;border-bottom:2px solid #fff}.i-checks.i-checks-lg input:checked+i.inner-checked .i-checks-inner{left:4px;top:6px;width:20px;height:10px;background-color:transparent;border-left:4px solid #fff;border-bottom:4px solid #fff}.i-checks-lg input:checked+i .i-checks-inner{left:8px;top:8px;width:12px;height:12px}.i-checks-sm input:checked+i .i-checks-inner{left:3px;top:3px;width:8px;height:8px}.i-checks>i{margin-left:-16px}`]
            },] },
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [
    { type: ElementRef, },
];
CheckboxComponent.propDecorators = {
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "size": [{ type: Input },],
    "display": [{ type: Input },],
    "disabled": [{ type: Input },],
    "innerStyle": [{ type: Input },],
    "customBackground": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "name": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxModule {
}
CheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    CheckboxComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    FormsModule,
                    CheckboxComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RadioComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.keyChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    toggleCheck(ev) {
        if (!this.disabled) {
            let /** @type {?} */ target = ev.target || ev.srcElement;
            if (target.nodeName !== 'INPUT') {
                this.keyChange.emit(this.value);
            }
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    changeValue(ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            this.keyChange.emit(this.value);
        }
    }
}
RadioComponent.decorators = [
    { type: Component, args: [{
                selector: 'radio',
                template: `<div class=" {{display==='block'?'radio':'radio-inline'}}">
  <label  class="{{styleClass!=='none'?styleClass:''}}"
    (click)="toggleCheck($event)" [ngClass]="{'i-checks':this.styleClass!=='none','i-checks-sm':size==='sm','i-checks-lg':size==='lg'}">
    <input type="radio"  [disabled]="disabled" [checked]="key===value" (click)="changeValue($event)" [value]="value"/>
    <i [style.border-color]="key===value&&customBackground?customBackground:null">
      <span class="radio-inner" [style.background-color]="(key===value&&customBackground)?customBackground:null"></span>
    </i>
    <ng-content></ng-content>
  </label>
</div>
`,
                styles: [`.radio,.radio-inline{padding-right:15px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.radio input[type=radio],.radio-inline input[type=radio]{position:relative;margin-top:0;margin-left:0;top:2px}.i-checks i:before{content:none}.i-checks input+i .radio-inner{position:absolute;left:50%;top:50%;width:0;height:0;background-color:transparent;-webkit-transition:.3s;transition:.3s}.i-checks input[disabled]:checked+i{border-color:#cfdadd!important}.i-checks input[disabled]:checked+i .radio-inner{background-color:#cfdadd!important}.i-checks input:checked+i .radio-inner{left:4px;top:4px;width:10px;height:10px;background-color:#23b7e5;border-radius:50%}.i-checks-sm input:checked+i .radio-inner{left:3px;top:3px;width:8px;height:8px}.i-checks-lg input:checked+i .radio-inner{left:8px;top:8px;width:12px;height:12px}label.i-checks{margin-bottom:0}`]
            },] },
];
/** @nocollapse */
RadioComponent.ctorParameters = () => [
    { type: ElementRef, },
];
RadioComponent.propDecorators = {
    "key": [{ type: Input },],
    "keyChange": [{ type: Output },],
    "value": [{ type: Input },],
    "size": [{ type: Input },],
    "display": [{ type: Input },],
    "disabled": [{ type: Input },],
    "customBackground": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "name": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RadioModule {
}
RadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    RadioComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    FormsModule,
                    RadioComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SwitchComponent {
    constructor() {
        this.valueChange = new EventEmitter();
        this.auto = true;
        this.action = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    toggleCheck(ev) {
        if (!this.disabled) {
            if (!this.auto) {
                this.action.emit(this.value);
            }
            else {
                let /** @type {?} */ target = ev.target || ev.srcElement;
                if (target.nodeName !== 'INPUT') {
                    this.value = !this.value;
                    this.valueChange.emit(this.value);
                }
            }
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    toggle(ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            let /** @type {?} */ target = ev.target || ev.srcElement;
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    }
}
SwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'switch',
                template: `<label  class="i-switch{{styleClass?' '+styleClass:''}}"
    (click)="toggleCheck($event)"
    [ngClass]="{'bg-info':type==='info'||!type,
    'bg-primary':type==='primary',
    'bg-success':type==='success',
    'bg-danger':type==='danger',
    'bg-warning':type==='warning',
    'i-switch-sm':size==='sm',
    'i-switch-lg':size==='lg'}">
    <i [ngClass]="{'checked':value}"></i>
    <span>
          <ng-content></ng-content>
    </span>
</label>
`,
                styles: [`.i-switch{vertical-align:middle}.i-switch input{cursor:pointer}.i-switch i:after{left:0}.i-switch i.checked:after{margin-left:16px}.i-switch i.checked:before{background-color:transparent}.i-switch.i-switch-lg i.checked:after{margin-left:22px}`]
            },] },
];
/** @nocollapse */
SwitchComponent.ctorParameters = () => [];
SwitchComponent.propDecorators = {
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "size": [{ type: Input },],
    "display": [{ type: Input },],
    "disabled": [{ type: Input },],
    "type": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "auto": [{ type: Input },],
    "action": [{ type: Output },],
    "name": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleComponent extends SwitchComponent {
    constructor() {
        super();
    }
}
ToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'toggle',
                template: `<label  class="i-switch{{styleClass?' '+styleClass:''}}"
    (click)="toggleCheck($event)"
    [ngClass]="{'bg-info':type==='info'||!type,
    'bg-primary':type==='primary',
    'bg-success':type==='success',
    'bg-danger':type==='danger',
    'bg-warning':type==='warning',
    'i-switch-sm':size==='sm',
    'i-switch-lg':size==='lg'}">
    <i [ngClass]="{'checked':value}"></i>
    <span>
          <ng-content></ng-content>
    </span>
</label>
`,
                styles: [`.i-switch{vertical-align:middle}.i-switch input{cursor:pointer}.i-switch i:after{left:0}.i-switch i.checked:after{margin-left:16px}.i-switch i.checked:before{background-color:transparent}.i-switch.i-switch-lg i.checked:after{margin-left:22px}`]
            },] },
];
/** @nocollapse */
ToggleComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleModule {
}
ToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    ToggleComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    FormsModule,
                    ToggleComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SwitchModule {
}
SwitchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    SwitchComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    FormsModule,
                    SwitchComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalBodyComponent {
    constructor() {
        this.delayShow = false;
        this.isReady = false;
    }
}
ModalBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-body',
                template: `
    <div class="modal-body{{styleClass?' '+styleClass:''}}" #modalBody>
        <ng-content *ngIf="isReady||!delayShow"></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
ModalBodyComponent.ctorParameters = () => [];
ModalBodyComponent.propDecorators = {
    "styleClass": [{ type: Input },],
    "delayShow": [{ type: Input },],
    "modalBody": [{ type: ViewChild, args: ['modalBody',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalHeaderComponent {
    constructor() {
        this.showCloseButton = true;
    }
}
ModalHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-header',
                template: `
    <div class="modal-header{{styleClass?' '+styleClass:''}}" [ngClass]="{'modal-header-reduce':showCloseButton}">
        <ng-content></ng-content>
    </div>
  `,
                styles: [`.modal{display:block;position:fixed}.modal:before{content:'';display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);position:absolute;left:0;top:0}/deep/ .modal .modal:before{background-color:transparent}.modal-content{border-radius:2px}.modal-content.disabled:before{content:'';display:block;position:absolute;z-index:2;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.1);cursor:wait}.modal .modal-header{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.modal-header-reduce.modal-header{padding-right:48px;position:relative}.modal-btn-close{display:block;width:48px;height:48px;position:absolute;left:100%;top:0;margin-left:-48px;text-align:center;font-size:36px;opacity:.35;z-index:1;line-height:48px}.modal-btn-close:hover{opacity:.5}.modal-btn-close:active{opacity:.8}.modal ::-webkit-scrollbar{width:10px}.modal ::-webkit-scrollbar-track-piece{background:#f0f0f0}.modal ::-webkit-scrollbar-thumb{width:12px;background:rgba(125,125,125,.25)}.modal ::-webkit-scrollbar-thumb:hover{background:rgba(125,125,125,.5)}.modal-dialog{max-width:100%}`]
            },] },
];
/** @nocollapse */
ModalHeaderComponent.propDecorators = {
    "showCloseButton": [{ type: Input },],
    "styleClass": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalFooterComponent {
    constructor() {
    }
}
ModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-footer',
                template: `
    <div class="modal-footer{{styleClass?' '+styleClass:''}}" >
        <ng-content></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
ModalFooterComponent.ctorParameters = () => [];
ModalFooterComponent.propDecorators = {
    "styleClass": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.visibleChange = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.overflow = false;
        this.animated = true;
        this.size = "md";
        this.disabled = false;
        this.isRender = false;
        this.isShow = false;
        this.isReady = false;
        this.outClickClose = false;
        this.showCloseButton = true;
        this.isTransition = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.testAndResetBody();
    }
    /**
     * 背景点击处理
     * @param {?} ev
     * @return {?}
     */
    bgClickAction(ev) {
        let /** @type {?} */ wouldClose = this.outClickClose;
        if (wouldClose) {
            let /** @type {?} */ target = ev.target || ev.srcElement;
            if (target === this.modal.nativeElement) {
                this.close();
            }
        }
    }
    /**
     * @return {?}
     */
    open() {
        this.visible = true;
        this.visibleChange.emit(true);
        this.showModal();
    }
    /**
     * @return {?}
     */
    close() {
        this.visible = false;
        let /** @type {?} */ promise = this.hideModal();
        this.visibleChange.emit(false);
        return promise;
    }
    /**
     * @return {?}
     */
    showModal() {
        this.isRender = true;
        let /** @type {?} */ orgW = document.body.offsetWidth; //有滚动条时的宽度
        this.addClass(document.body, 'modal-open');
        let /** @type {?} */ curW = document.body.offsetWidth; //无滚动条时的宽度
        if (curW > orgW) {
            document.body.style.paddingRight = (curW - orgW) + 'px'; //给body设置paddingRight避免页面抖动
        }
        this.initBodyStyle();
        setTimeout(() => {
            this.isTransition = true;
            this.isShow = true;
            this.onOpen.emit(this.visible);
            setTimeout(() => {
                this.isReady = true;
                this.modalBody.isReady = true;
            }, 300);
        });
    }
    /**
     * @param {?=} callback
     * @return {?}
     */
    hideModal(callback) {
        this.testAndResetBody();
        this.isShow = false;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isRender = false;
                if (typeof callback === 'function') {
                    callback();
                }
                this.isTransition = false;
                resolve(this.visible);
                this.isReady = false;
                this.modalBody.isReady = false;
                this.onClose.emit(this.visible);
            }, 500);
        });
    }
    /**
     * @return {?}
     */
    testAndResetBody() {
        let /** @type {?} */ modals = document.querySelectorAll('.modal');
        if (modals && modals.length <= 1) {
            this.removeClass(document.body, 'modal-open');
            document.body.style.paddingRight = null;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ visibleChg = changes['visible'];
        if (visibleChg) {
            let /** @type {?} */ isVisible = visibleChg.currentValue;
            let /** @type {?} */ prevValue = visibleChg.previousValue;
            if (isVisible !== prevValue) {
                if (isVisible === true) {
                    this.showModal();
                }
                else if (isVisible === false && prevValue !== undefined) {
                    this.hideModal();
                }
            }
        }
    }
    /**
     * 初始化modal-body的高度/限高
     * @return {?}
     */
    initBodyStyle() {
        let /** @type {?} */ isOverflow = !!this.overflow;
        let /** @type {?} */ isFullHeight = (this.fullHeight !== undefined && this.fullHeight !== false);
        if (isFullHeight || !isOverflow) {
            setTimeout(() => {
                let /** @type {?} */ modalBody = this.modalBody.modalBody.nativeElement; //模态框中间部分
                var /** @type {?} */ maxHeight = document.documentElement.clientHeight - 183; //上外边距30+下外边距30+头部51+底部70=181 2像素的调整
                if (isFullHeight) {
                    modalBody.style.height = maxHeight + 'px';
                    modalBody.style.overflowY = 'auto';
                }
                else if (!isOverflow) {
                    modalBody.style.maxHeight = maxHeight + 'px';
                    modalBody.style.overflowY = 'auto';
                }
            });
        }
    }
    /**
     * 为元素添加一个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    addClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    }
    /**
     * 删除某个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    removeClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        let /** @type {?} */ clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal',
                template: `<div class="modal{{styleClass?' '+styleClass:''}}" *ngIf="isRender" [ngClass]="{'in':isShow,'fade':animated}" (click)="bgClickAction($event)" #modal [style.transition]="isTransition?'opacity .2s linear':'none'">
    <div class="modal-dialog{{this.size?' modal-'+this.size:''}}" #modalDialog [style.transition]="isTransition?'transform .3s ease-out':'none'" [style.width.px]="width">
        <div class="modal-content" [class.disabled]="disabled">
            <a class="modal-btn-close" *ngIf="showCloseButton" (click)="close()">
                <span>&times;</span>
            </a>
            <ng-content></ng-content>
            <ng-content select="modal-header"></ng-content>
            <ng-content select="modal-body"></ng-content>
            <ng-content select="modal-footer"></ng-content>
        </div>
    </div>
</div>`,
                styles: [`.modal{display:block;position:fixed}.modal:before{content:'';display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);position:absolute;left:0;top:0}/deep/ .modal .modal:before{background-color:transparent}.modal-content{border-radius:2px}.modal-content.disabled:before{content:'';display:block;position:absolute;z-index:2;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.1);cursor:wait}.modal .modal-header{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.modal-header-reduce.modal-header{padding-right:48px;position:relative}.modal-btn-close{display:block;width:48px;height:48px;position:absolute;left:100%;top:0;margin-left:-48px;text-align:center;font-size:36px;opacity:.35;z-index:1;line-height:48px}.modal-btn-close:hover{opacity:.5}.modal-btn-close:active{opacity:.8}.modal ::-webkit-scrollbar{width:10px}.modal ::-webkit-scrollbar-track-piece{background:#f0f0f0}.modal ::-webkit-scrollbar-thumb{width:12px;background:rgba(125,125,125,.25)}.modal ::-webkit-scrollbar-thumb:hover{background:rgba(125,125,125,.5)}.modal-dialog{max-width:100%}`]
            },] },
];
/** @nocollapse */
ModalComponent.ctorParameters = () => [
    { type: ElementRef, },
];
ModalComponent.propDecorators = {
    "visible": [{ type: Input },],
    "visibleChange": [{ type: Output },],
    "onOpen": [{ type: Output },],
    "onClose": [{ type: Output },],
    "overflow": [{ type: Input },],
    "animated": [{ type: Input },],
    "size": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "fullHeight": [{ type: Input },],
    "disabled": [{ type: Input },],
    "width": [{ type: Input },],
    "outClickClose": [{ type: Input },],
    "showCloseButton": [{ type: Input },],
    "modal": [{ type: ViewChild, args: ['modal',] },],
    "modalDialog": [{ type: ViewChild, args: ['modalDialog',] },],
    "modalHeader": [{ type: ContentChild, args: [ModalHeaderComponent,] },],
    "modalBody": [{ type: ContentChild, args: [ModalBodyComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalModule {
}
ModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ModalComponent,
                    ModalHeaderComponent,
                    ModalBodyComponent,
                    ModalFooterComponent
                ],
                providers: [],
                exports: [
                    ModalComponent,
                    ModalHeaderComponent,
                    ModalBodyComponent,
                    ModalFooterComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RootContainerComponent {
    constructor() {
    }
}
RootContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'root-container',
                template: `<div class="app"
     [ngClass]="{'app-header-fixed':headerFixed,
     'app-aside-fixed':asideFixed,
     'app-aside-folded':asideFolded,
     'app-aside-dock':asideDock,
     'container':container,
     'app-aside-slide':offScreen,
     'off-screen':offScreen}" >
  <!--<div class="app  app-header-fixed app-aside-fixed app-aside-folded">-->
    <ng-content></ng-content>
</div>


`,
                styles: [``]
            },] },
];
/** @nocollapse */
RootContainerComponent.ctorParameters = () => [];
RootContainerComponent.propDecorators = {
    "headerFixed": [{ type: Input },],
    "asideFixed": [{ type: Input },],
    "asideFolded": [{ type: Input },],
    "asideDock": [{ type: Input },],
    "container": [{ type: Input },],
    "offScreen": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AsideLeftComponent {
    constructor() {
        this.theme = '';
    }
}
AsideLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'aside-left',
                template: `<div class="app-aside hidden-xs" [ngClass]="{'bg-black':theme==='black',
 'cerulean-outline':theme==='cerulean-outline',
 'bg-white':theme==='white'
 }">
    <div class="aside-wrap" [style.border-right]="!theme?'1px solid #ddd':null">
        <ng-content></ng-content>
    </div>
</div>`,
                styles: [`.app-aside /deep/ .glyphicon{top:0}.cerulean-outline{color:#23b7e5}.cerulean-outline /deep/ .aside-wrap{background-color:#fff;-webkit-box-shadow:3px 0 5px #ddd;box-shadow:3px 0 5px #ddd}.cerulean-outline /deep/ .navi-wrap a{color:#23b7e5}.cerulean-outline /deep/ .text-muted{color:#23b7e5}.cerulean-outline /deep/ .thirth-nav-item.active,.cerulean-outline /deep/ .thirth-nav-item.active:hover,.cerulean-outline /deep/ li.active>a,.cerulean-outline /deep/ li.active>a:hover{background-color:#dee5eb;color:inherit}.cerulean-outline /deep/ li.exist-children.active>a,.cerulean-outline /deep/ li.has-child.active>a{background-color:transparent;color:inherit}.cerulean-outline /deep/ .thirth-nav-item:hover,.cerulean-outline /deep/ li>a:hover{background-color:#f0f0f0}.cerulean-outline /deep/ li.exist-children.active>a:hover,.cerulean-outline /deep/ li.has-child.active>a:hover{background-color:#f0f0f0}/deep/ .app-aside-folded .cerulean-outline .nav-sub{background-color:#fff;border:1px solid #ddd;border-left:none}/deep/ .app-aside-folded .cerulean-outline li.active>a>i{background-color:#23b7e5;color:#fff}/deep/ .app-aside-folded.off-screen .cerulean-outline li.active>a>i{background-color:transparent;color:inherit}`]
            },] },
];
/** @nocollapse */
AsideLeftComponent.ctorParameters = () => [];
AsideLeftComponent.propDecorators = {
    "theme": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderComponent {
    constructor() {
        this.theme = '';
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'header',
                template: `<div class="app-header navbar"
[ngClass]="{'bg-black':theme==='black',
           'bg-info':theme==='cerulean'
           }">
  <ng-content></ng-content>
</div>


`,
                styles: [`.bg-info,.navbar-header.bg-info{background-color:#09c}.navbar-header.bg-info{border-right:1px solid #0091c2}`]
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
HeaderComponent.propDecorators = {
    "theme": [{ type: Input },],
};
class HeaderLeftComponent {
    constructor() {
        this.theme = '';
    }
}
HeaderLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'header-left',
                template: `
    <div class="navbar-header" 
[ngClass]="{'bg-black':theme==='black',
           'bg-info':theme==='cerulean'
           }">
        <ng-content></ng-content>
    </div>
  `,
                styles: [`.bg-info,.navbar-header.bg-info{background-color:#09c}.navbar-header.bg-info{border-right:1px solid #0091c2}`]
            },] },
];
/** @nocollapse */
HeaderLeftComponent.ctorParameters = () => [];
HeaderLeftComponent.propDecorators = {
    "theme": [{ type: Input },],
};
class HeaderRightComponent {
    constructor() {
        this.theme = 'black';
        this.dropDown = false;
    }
    /**
     * @return {?}
     */
    toggleDropDown() {
        this.dropDown = !this.dropDown;
    }
}
HeaderRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'header-right',
                template: `
    <div class="collapse pos-rlt navbar-collapse box-shadow" [ngClass]="{'show':dropDown,
    'bg-black':theme==='black',
     'bg-white-only':theme==='white'
    }">
        <ng-content></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
HeaderRightComponent.ctorParameters = () => [];
HeaderRightComponent.propDecorators = {
    "theme": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeleteWrapComponent {
    constructor() {
        this.size = 'md';
        this.remove = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    btnRemoveAction(event) {
        this.remove.emit(event);
    }
}
DeleteWrapComponent.decorators = [
    { type: Component, args: [{
                selector: 'delete-wrap',
                template: `<div class="delete-wrap {{'delete-wrap-'+size}}">
  <ng-content></ng-content>
  <span class="delete-wrap-btn" (click)="btnRemoveAction($event)">
      <i class="glyphicon glyphicon-remove"></i>
  </span>
</div>
`,
                styles: [`.delete-wrap{display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.delete-wrap-btn{display:none;width:36px;height:36px;border-radius:50%;position:absolute;left:100%;top:-18px;margin-left:-18px;cursor:pointer;z-index:1;text-align:center;line-height:1.5;font-size:36px;color:#fff;background-color:#f05050}.delete-wrap-btn:active{background-color:#f02b2d}.delete-wrap:hover .delete-wrap-btn{display:block}.delete-wrap.delete-wrap-lg .delete-wrap-btn{width:48px;height:48px;top:-24px;margin-left:-24px;font-size:36px}.delete-wrap.delete-wrap-md .delete-wrap-btn{width:36px;height:36px;top:-18px;margin-left:-18px;line-height:1.66;font-size:24px}.delete-wrap.delete-wrap-sm .delete-wrap-btn{width:24px;height:24px;top:-12px;margin-left:-12px;font-size:18px}.delete-wrap.delete-wrap-xs .delete-wrap-btn{width:18px;height:18px;top:-9px;margin-left:-9px;font-size:12px;text-indent:-.5px}`]
            },] },
];
/** @nocollapse */
DeleteWrapComponent.ctorParameters = () => [];
DeleteWrapComponent.propDecorators = {
    "size": [{ type: Input },],
    "remove": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LayoutModule {
}
LayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    RootContainerComponent,
                    AsideLeftComponent,
                    HeaderComponent,
                    HeaderLeftComponent,
                    HeaderRightComponent,
                    DeleteWrapComponent
                ],
                providers: [],
                exports: [
                    RootContainerComponent,
                    AsideLeftComponent,
                    HeaderComponent,
                    HeaderLeftComponent,
                    HeaderRightComponent,
                    DeleteWrapComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavWrapComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.test = 'hellow';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        let /** @type {?} */ elem = this.elemRef.nativeElement.querySelector('.navi');
    }
}
NavWrapComponent.decorators = [
    { type: Component, args: [{
                selector: 'nav-wrap',
                template: `<div class="navi-wrap">
  <nav class="navi">
    <ul class="nav">
      <ng-content></ng-content>
    </ul>
  </nav>
</div>


`,
                styles: [``]
            },] },
];
/** @nocollapse */
NavWrapComponent.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ThirthNavItemComponent {
    /**
     * @param {?} elemRef
     * @param {?} router
     */
    constructor(elemRef, router) {
        this.elemRef = elemRef;
        this.router = router;
        this.elemRef.nativeElement.addEventListener('click', (ev) => {
            ev.stopPropagation();
        });
    }
    /**
     * @return {?}
     */
    isActive() {
        let /** @type {?} */ active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        return active;
    }
}
ThirthNavItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'thirth-nav-item',
                template: `<div class="thirth-nav-item" [ngClass]="{'disabled':disabled!==undefined&&disabled!==false}" routerLinkActive="{{link?'active':''}}">
    <span routerLink="{{link}}" style="display:block" *ngIf="!!link&&!(disabled!==undefined&&disabled!==false)">{{text}}</span>
    <span style="display:block" *ngIf="!link||(disabled!==undefined&&disabled!==false)">{{text}}</span>
</div>`,
                styles: [`.disabled,.disabled *{color:#999!important}`]
            },] },
];
/** @nocollapse */
ThirthNavItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Router, },
];
ThirthNavItemComponent.propDecorators = {
    "text": [{ type: Input },],
    "link": [{ type: Input },],
    "icon": [{ type: Input },],
    "disabled": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SubNavItemComponent {
    /**
     * @param {?} elemRef
     * @param {?} router
     * @param {?} actRoute
     * @param {?} componentFactoryResolver
     */
    constructor(elemRef, router, actRoute, componentFactoryResolver) {
        this.elemRef = elemRef;
        this.router = router;
        this.actRoute = actRoute;
        this.componentFactoryResolver = componentFactoryResolver;
        this.hasChild = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.router.events
            .subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // 当导航成功结束时执行
                let /** @type {?} */ url = event.url.split(';')[0];
                //子导航收起
                // if(this.hasChild) {
                let /** @type {?} */ li = this.elemRef.nativeElement.querySelector('.sub-nav-item');
                let /** @type {?} */ wouldActive = false;
                let /** @type {?} */ thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                //let matchStr='link="'+url;
                // wouldActive=(li&&li.innerHTML.match(matchStr));
                wouldActive = this.isActive();
                if (wouldActive) {
                    this.addClass(li, 'active');
                    thirthNavWrap && this.openWrap(thirthNavWrap);
                }
                else {
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
                let /** @type {?} */ li = this.elemRef.nativeElement.querySelector('.sub-nav-item');
                let /** @type {?} */ linkElem = li.querySelector('a');
                if (linkElem.getAttribute('href') !== null) {
                    return;
                }
                let /** @type {?} */ wouldActive = false;
                let /** @type {?} */ thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                wouldActive = (li && !this.hasClass(li, 'active'));
                if (wouldActive) {
                    thirthNavWrap && this.openWrap(thirthNavWrap);
                    this.addClass(li, 'active');
                }
                else {
                    thirthNavWrap && this.closeWrap(thirthNavWrap);
                    this.removeClass(li, 'active');
                }
            }
        });
    }
    /**
     * @return {?}
     */
    isActive() {
        let /** @type {?} */ active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            /*if(this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')){
                    active=true;
                  }*/
            if (this.thirthNavItems && typeof this.thirthNavItems === 'object' && typeof this.thirthNavItems.forEach === 'function') {
                this.thirthNavItems.forEach((obj, index) => {
                    if (obj.isActive()) {
                        active = true;
                    }
                });
            }
            if (!active && this.dynamicThirthNavItems instanceof Array) {
                this.dynamicThirthNavItems.forEach((obj, index) => {
                    if (obj.isActive()) {
                        active = true;
                    }
                });
            }
        }
        return active;
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    openWrap(elem) {
        let /** @type {?} */ org_h = elem.clientHeight, /** @type {?} */ h = 0;
        let /** @type {?} */ items = elem.querySelectorAll('.thirth-nav-item');
        for (let /** @type {?} */ item of items) {
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
    /**
     * @param {?} elem
     * @return {?}
     */
    closeWrap(elem) {
        elem.style.height = elem.clientHeight + 'px';
        setTimeout(() => {
            elem.style.height = '0';
            setTimeout(() => {
                elem.style.height = null;
            }, 300);
        });
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    isAsideFolded() {
        let /** @type {?} */ foldedElem = document.querySelector('.app.app-aside-folded');
        let /** @type {?} */ isAsideFolded = foldedElem ? true : false;
        if (!isAsideFolded) {
            return false;
        }
        let /** @type {?} */ classList = foldedElem.className.split(/\s+/);
        if (classList.indexOf('off-screen') >= 0) {
            let /** @type {?} */ clientWidth = document.body.clientWidth;
            if (clientWidth < 768) {
                return false;
            }
        }
        return true;
    }
    /**
     * 元素是否包含某个类
     * @param {?} elem
     * @param {?} className
     * @return {?} boolean
     */
    hasClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    }
    /**
     * 为元素添加一个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    addClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    }
    /**
     * 删除某个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    removeClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        let /** @type {?} */ clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    inserThirthNavItem(options) {
        let /** @type {?} */ viewContainerRef = this.childrenHost;
        let /** @type {?} */ sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ThirthNavItemComponent);
        let /** @type {?} */ sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
        let /** @type {?} */ sNavComponentInstance = (/** @type {?} */ (sNavComponentRef.instance));
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
SubNavItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'sub-nav-item',
                template: `<li routerLinkActive="{{link?'active':''}}" class="sub-nav-item" [ngClass]="{'has-child':hasChild,'disabled':disabled!==undefined&&disabled!==false}">
    <a routerLink="{{link}}" *ngIf="!!link&&!(disabled!==undefined&&disabled!==false)">
        <i class="sub-nav-icon fa fa-caret-right" *ngIf="hasChild"></i>
        <i class="sub-nav-icon fa fa-caret-down" *ngIf="hasChild"></i> {{text}}
    </a>
    <a *ngIf="!link||(disabled!==undefined&&disabled!==false)">
        <i class="sub-nav-icon fa fa-caret-right" *ngIf="hasChild"></i>
        <i class="sub-nav-icon fa fa-caret-down" *ngIf="hasChild" style="margin-left: -18px"></i> {{text}}
    </a>
    <div class="thirth-nav-wrap">
        <ng-content></ng-content>
        <ng-container #childrenHost></ng-container>
    </div>
</li>`,
                styles: [`.disabled,.disabled *{color:#999!important}`]
            },] },
];
/** @nocollapse */
SubNavItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Router, },
    { type: ActivatedRoute, },
    { type: ComponentFactoryResolver, },
];
SubNavItemComponent.propDecorators = {
    "text": [{ type: Input },],
    "link": [{ type: Input },],
    "icon": [{ type: Input },],
    "disabled": [{ type: Input },],
    "childrenHost": [{ type: ViewChild, args: ['childrenHost', { read: ViewContainerRef },] },],
    "thirthNavItems": [{ type: ContentChildren, args: [ThirthNavItemComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavItemComponent {
    /**
     * @param {?} elemRef
     * @param {?} router
     * @param {?} actRoute
     * @param {?} componentFactoryResolver
     */
    constructor(elemRef, router, actRoute, componentFactoryResolver) {
        this.elemRef = elemRef;
        this.router = router;
        this.actRoute = actRoute;
        this.componentFactoryResolver = componentFactoryResolver;
        this.haveChild = false;
        this.childrenActive = false;
    }
    /**
     * 获取dom相对浏览器的位置
     * @param {?} obj
     * @return {?} <{left: number, top: number}>
     */
    getPosition(obj) {
        let /** @type {?} */ topValue = 0, /** @type {?} */ leftValue = 0;
        while (obj) {
            leftValue += obj.offsetLeft;
            topValue += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { left: leftValue, top: topValue };
    }
    /**
     * @return {?}
     */
    activeNavItem() {
        this.addClass(this.rootElem, 'active');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.rootElem = this.root.nativeElement;
        this.router.events
            .subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // 当导航成功结束时执行
                setTimeout(() => {
                    //慢一个节拍
                    let /** @type {?} */ url = event.url.split(';')[0];
                    //子导航收起
                    let /** @type {?} */ subNavWrap = this.subWrap.nativeElement;
                    let /** @type {?} */ wouldActive = this.isActive();
                    if (wouldActive) {
                        this.openSubNav(subNavWrap);
                        (!this.link) && this.addClass(this.rootElem, 'active');
                    }
                    else {
                        this.closeSubNav(subNavWrap);
                        (!this.link) && this.removeClass(this.rootElem, 'active');
                    }
                });
            }
        });
        this.rootElem.addEventListener('click', (ev) => {
            let /** @type {?} */ isAsideFolded = this.isAsideFolded();
            let /** @type {?} */ linkElem = this.rootElem.querySelector('a');
            if (linkElem.getAttribute('href') !== null) {
                return;
            }
            let /** @type {?} */ subWrap = this.subWrap.nativeElement;
            let /** @type {?} */ wouldActive = (subWrap.clientHeight > 0 ? false : true);
            if (!this.haveChild && this.disabled !== undefined && this.disabled + '' != 'false') {
                wouldActive = false;
            }
            if (!isAsideFolded) {
                if (wouldActive) {
                    this.addClass(this.rootElem, 'active');
                    this.openSubNav(subWrap);
                }
                else {
                    this.removeClass(this.rootElem, 'active');
                    this.closeSubNav(subWrap);
                }
            }
        });
        this.rootElem.addEventListener('mouseenter', (ev) => {
            let /** @type {?} */ target = this.rootElem;
            if (!this.isAsideFolded()) {
                return;
            }
            if (!this.hasClass(target, 'nav-item-hover')) {
                this.addClass(target, 'nav-item-hover');
            }
            else {
                return;
            }
            let /** @type {?} */ pos = this.getPosition(target), /** @type {?} */ wrapPos;
            let /** @type {?} */ navWrap = document.querySelector('.navi-wrap');
            if (navWrap) {
                wrapPos = this.getPosition(navWrap);
            }
            let /** @type {?} */ subNavWrap = target.querySelector('.nav.nav-sub');
            let /** @type {?} */ w = target.offsetWidth;
            let /** @type {?} */ h = target.offsetHeight;
            let /** @type {?} */ win_h = document.body.clientHeight;
            if (subNavWrap) {
                let /** @type {?} */ subWrapHeight = subNavWrap.offsetHeight;
                let /** @type {?} */ top = pos.top;
                subNavWrap.style.left = pos.left + w + 'px';
                if (win_h - pos.top < subWrapHeight) {
                    if (win_h - pos.top + h < subWrapHeight) {
                        top = wrapPos.top || 0; //50是头部高度
                    }
                    else {
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
            let /** @type {?} */ classList = this.rootElem.className.split(/\s+/);
            if (classList.indexOf('nav-item-hover') >= 0) {
                this.removeClass(this.rootElem, 'nav-item-hover');
            }
            let /** @type {?} */ subNavWrap = this.rootElem.querySelector('.nav.nav-sub');
            if (subNavWrap) {
                subNavWrap.style.maxHeight = 'inherit';
            }
        });
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
    }
    /**
     * @param {?} subNavElem
     * @return {?}
     */
    openSubNav(subNavElem) {
        if (subNavElem) {
            if (this.isAsideFolded()) {
                subNavElem.style.height = 'auto';
            }
            else if (subNavElem.clientHeight <= 0) {
                setTimeout(() => {
                    let /** @type {?} */ height = this.getSubNavHeight(subNavElem);
                    subNavElem.style.height = height + 'px';
                    setTimeout(() => {
                        if (this.hasClass(this.rootElem, 'active')) {
                            subNavElem.style.height = 'auto';
                        }
                        else {
                            subNavElem.style.height = '0';
                        }
                    }, 300);
                });
            }
        }
    }
    /**
     * @param {?} subNavElem
     * @return {?}
     */
    closeSubNav(subNavElem) {
        if (subNavElem.clientHeight > 0) {
            let /** @type {?} */ height = this.getSubNavHeight(subNavElem);
            subNavElem.style.height = height + 'px';
            setTimeout(() => {
                subNavElem.style.height = '0';
            });
        }
    }
    /**
     * @param {?} subNavElem
     * @return {?}
     */
    getSubNavHeight(subNavElem) {
        let /** @type {?} */ height = 0;
        if (subNavElem) {
            let /** @type {?} */ children = subNavElem.querySelectorAll('sub-nav-item>li');
            if (children) {
                for (let /** @type {?} */ i = 0, /** @type {?} */ len = children.length; i < len; i++) {
                    height += children[i].clientHeight;
                }
            }
        }
        return height;
    }
    /**
     * @return {?}
     */
    hasActiveChildren() {
        let /** @type {?} */ activeChildren = this.rootElem.querySelector('sub-nav-item li.active');
        return activeChildren !== null;
    }
    /**
     * @return {?}
     */
    isAsideFolded() {
        let /** @type {?} */ foldedElem = document.querySelector('.app.app-aside-folded');
        let /** @type {?} */ isAsideFolded = foldedElem ? true : false;
        if (!isAsideFolded) {
            return false;
        }
        let /** @type {?} */ classList = foldedElem.className.split(/\s+/);
        if (classList.indexOf('off-screen') >= 0) {
            let /** @type {?} */ clientWidth = document.body.clientWidth;
            if (clientWidth < 768) {
                return false;
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    isActive() {
        let /** @type {?} */ active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            /*if(this.elemRef.nativeElement.querySelector('.sub-nav-item.active')){
                    active=true;
                  }*/
            if (this.subNavItems && typeof this.subNavItems === 'object' && typeof this.subNavItems.forEach === 'function') {
                this.subNavItems.forEach((obj, index) => {
                    if (obj.isActive()) {
                        active = true;
                    }
                });
            }
            if (!active && this.dynamicSubNavItems instanceof Array) {
                this.dynamicSubNavItems.forEach((obj, index) => {
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
     * @return {?}
     */
    checkChild() {
        let /** @type {?} */ child = this.elemRef.nativeElement.querySelector('sub-nav-item');
        if (child) {
            this.haveChild = true;
        }
    }
    /**
     * 元素是否包含某个类
     * @param {?} elem
     * @param {?} className
     * @return {?} boolean
     */
    hasClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    }
    /**
     * 为元素添加一个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    addClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    }
    /**
     * 删除某个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    removeClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        let /** @type {?} */ clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    }
    /**
     * 插入二级菜单
     * @param {?} options
     * @return {?}
     */
    inserSubNavItem(options) {
        let /** @type {?} */ viewContainerRef = this.childrenHost;
        let /** @type {?} */ sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SubNavItemComponent);
        let /** @type {?} */ sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
        let /** @type {?} */ sNavComponentInstance = (/** @type {?} */ (sNavComponentRef.instance));
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
NavItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nav-item',
                template: `<li routerLinkActive="{{link?'active':''}}" [ngClass]="{'exist-children':haveChild,'disabled':disabled!==undefined&&disabled!==false}" #root>
    <a routerLink="{{link}}" *ngIf="!!link&&!(disabled!==undefined&&disabled!==false)">
        <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <a *ngIf="!link||(disabled!==undefined&&disabled!==false)">
        <ng-container *ngTemplateOutlet="content"></ng-container>
    </a>
    <ul class="nav nav-sub dk" #subWrap>
        <li class="nav-item-title">{{text}}</li>
        <ng-content></ng-content>
        <ng-container #childrenHost></ng-container>
    </ul>
</li>

<ng-template #content>
    <span class="pull-right text-muted" *ngIf="haveChild">
    <i class="fa fa-fw fa-angle-right text"></i>
    <i class="fa fa-fw fa-angle-down text-active"></i>
</span>
    <b class="pull-right {{badgeClass}}" *ngIf="badgeValue">{{badgeValue}}</b>
    <i class="{{icon}}"></i>
    <span>{{text}}</span>
</ng-template>`,
                styles: [`.disabled,.disabled *{color:#999!important}`]
            },] },
];
/** @nocollapse */
NavItemComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Router, },
    { type: ActivatedRoute, },
    { type: ComponentFactoryResolver, },
];
NavItemComponent.propDecorators = {
    "icon": [{ type: Input },],
    "text": [{ type: Input },],
    "link": [{ type: Input },],
    "disabled": [{ type: Input },],
    "badgeClass": [{ type: Input, args: ['badge-class',] },],
    "badgeValue": [{ type: Input, args: ['badge-value',] },],
    "subWrap": [{ type: ViewChild, args: ['subWrap',] },],
    "root": [{ type: ViewChild, args: ['root',] },],
    "childrenHost": [{ type: ViewChild, args: ['childrenHost', { read: ViewContainerRef },] },],
    "subNavItems": [{ type: ContentChildren, args: [SubNavItemComponent,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavModule {
}
NavModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                declarations: [
                    NavWrapComponent,
                    NavItemComponent,
                    SubNavItemComponent,
                    ThirthNavItemComponent
                ],
                providers: [],
                exports: [
                    NavWrapComponent,
                    NavItemComponent,
                    SubNavItemComponent,
                    ThirthNavItemComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatetimePickerComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.valueChange = new EventEmitter();
        this.format = 'yyyy-MM-dd';
        this.start = '1970/01/01';
        this.end = '2070/12/31';
        this.trigger = 'focus';
        this.zIndex = 999;
        this.isCalendar = false;
        this.complete = new EventEmitter();
        this.visible = false;
        this.ready = false;
        this.year = null;
        this.month = null;
        this.day = null;
        this.hours = null;
        this.minutes = null;
        this.seconds = null;
        //根据format设置以下值
        this.isPickSeconds = false;
        this.isPickMinutes = false;
        this.isPickHours = false;
        this.isPickingTime = false;
        this.minError = false;
        this.maxError = false;
        this.left = 0;
        this.handlers = [];
        this.hoursOptions = [];
        this.minutesOrSecondsOptions = [];
        for (let /** @type {?} */ i = 0; i < 24; i++) {
            this.hoursOptions.push(i);
        }
        for (let /** @type {?} */ j = 0; j < 60; j++) {
            this.minutesOrSecondsOptions.push(j);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        document.body.appendChild(this.popover.nativeElement);
        {
            //设置根元素样式
            this.elemRef.nativeElement.style.display = 'inline-block';
            this.elemRef.nativeElement.style.position = 'relative';
            this.elemRef.nativeElement.style.verticalAlign = 'middle';
        }
        let /** @type {?} */ inputElem = this.elemRef.nativeElement.querySelector('input');
        this.inputElem = inputElem;
        if (this.inputElem) {
            this.addEvent(this.inputElem, 'blur', (ev) => {
                if (this.value) {
                    if (!this.isFormat(this.value, this.format)) {
                        //格式不匹配置空
                        this.valueChange.emit('');
                    }
                    else {
                        //超出范围置空
                        if (this.min) {
                            let /** @type {?} */ minDate = this.getMinDate();
                            if (minDate && this.isDateTimeGreaterThan(minDate, this.date)) {
                                this.valueChange.emit('');
                            }
                        }
                        if (this.max) {
                            let /** @type {?} */ maxDate = this.getMaxDate();
                            if (maxDate && this.isDateTimeGreaterThan(this.date, maxDate)) {
                                this.valueChange.emit('');
                            }
                        }
                    }
                }
            });
            this.addEvent(this.inputElem, 'input', (ev) => {
                if (this.value && this.isFormat(this.value, this.format)) {
                    this.setOrgDate();
                }
            });
            this.addEvent(this.inputElem, this.trigger, (ev) => {
                //触发弹出
                this.init();
                this.visible = true;
                setTimeout(() => {
                    this.setPosition();
                });
            });
            this.addEvent(document, 'click', (ev) => {
                //其他地方点击关闭
                if (this.inputElem !== ev.target) {
                    if (this.visible) {
                        this.close();
                    }
                }
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (let /** @type {?} */ handle of this.handlers) {
            handle.elem.removeEventListener(handle.event, handle.fn);
        }
        if (this.popover.nativeElement) {
            document.body.removeChild(this.popover.nativeElement);
        }
    }
    /**
     * 初始化
     * @return {?}
     */
    init() {
        this.isPickingTime = false;
        this.minError = false;
        this.maxError = false;
        this.top = null;
        this.ready = false;
        this.testFormat();
        this.createYearOptions();
        this.createMonthOptions();
        this.setOrgDate();
        this.createDayOptions();
    }
    /**
     * 检测format以确定是否选择时、分、秒
     * @return {?}
     */
    testFormat() {
        if (typeof this.format === 'string') {
            this.isPickHours = /[h|H]/.test(this.format);
            this.isPickMinutes = /[m]/.test(this.format);
            this.isPickSeconds = /[s|S]/.test(this.format);
        }
    }
    /**
     * 创建“年”选项
     * @return {?}
     */
    createYearOptions() {
        this.yearOptions = [];
        let /** @type {?} */ startDate = this.createDateWidthFormat(this.start, this.format);
        let /** @type {?} */ endDate = this.createDateWidthFormat(this.end, this.format);
        let /** @type {?} */ startYear = startDate.getFullYear();
        let /** @type {?} */ endYear = endDate.getFullYear();
        if (startYear && endYear) {
            for (let /** @type {?} */ i = startYear; i < endYear; i++) {
                this.yearOptions.push(i);
            }
        }
    }
    /**
     * 创建“月”选项
     * @return {?}
     */
    createMonthOptions() {
        this.monthOptions = [];
        for (let /** @type {?} */ i = 0; i < 12; i++) {
            this.monthOptions.push(i);
        }
    }
    /**
     * 创建“天”选项
     * @return {?}
     */
    createDayOptions() {
        if (this.year === null || this.month === null) {
            return;
        }
        //确定第一天的星期
        //确定最后一天的星期
        //首尾填充
        let /** @type {?} */ dayIndex = 0;
        let /** @type {?} */ startDay = this.createDate();
        startDay.setDate(1);
        startDay.setMonth(this.month);
        startDay.setFullYear(this.year);
        let /** @type {?} */ weekDay = startDay.getDay();
        if (weekDay === 0) {
            startDay.setDate(startDay.getDate() - 7);
        }
        else if (weekDay < 7) {
            startDay.setDate(startDay.getDate() - weekDay);
        }
        let /** @type {?} */ y = startDay.getFullYear();
        let /** @type {?} */ m = startDay.getMonth();
        let /** @type {?} */ d = startDay.getDate();
        this.dayOptions = [];
        let /** @type {?} */ minDate = this.getMinDate(), /** @type {?} */
        maxDate = this.getMaxDate();
        for (let /** @type {?} */ i = 0; i < 6; i++) {
            let /** @type {?} */ group = [];
            for (let /** @type {?} */ j = 0; j < 7; j++) {
                let /** @type {?} */ newDateStr = '' + y + '/' + (m + 1) + '/' + d;
                let /** @type {?} */ newDate = this.createDate(newDateStr);
                // newDate.setFullYear(y);
                //newDate.setMonth(m);
                newDate.setDate(d + dayIndex);
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                let /** @type {?} */ isCurrent = (newDate.getMonth() == this.month);
                let /** @type {?} */ disabled = false;
                if (minDate && this.isDateTimeGreaterThan(minDate, newDate)) {
                    disabled = true;
                }
                if (maxDate && this.isDateTimeGreaterThan(newDate, maxDate)) {
                    disabled = true;
                }
                group.push({
                    date: newDate,
                    isCurrent: isCurrent,
                    disabled: disabled,
                    text: newDate.getDate()
                });
                dayIndex++;
            }
            this.dayOptions.push(group);
        }
    }
    /**
     * @param {?} elem
     * @param {?} event
     * @param {?} fn
     * @return {?}
     */
    addEvent(elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    }
    /**
     * 通过format查找字符串str里相应的字符
     * @param {?} str
     * @param {?} format
     * @param {?} condiction
     * @param {?} len
     * @return {?} string
     */
    searchStrByFormat(str, format, condiction, len) {
        let /** @type {?} */ result = '';
        let /** @type {?} */ index, /** @type {?} */ resultLen;
        if (len instanceof Array) {
            len.sort((a, b) => {
                return b - a;
            });
            for (let /** @type {?} */ l of len) {
                let /** @type {?} */ regExpStr = condiction + (l > 1 ? '{' + l + '}' : '');
                let /** @type {?} */ resExp = new RegExp(regExpStr);
                index = format.search(resExp);
                if (index >= 0) {
                    resultLen = l;
                    break;
                }
            }
        }
        else if (typeof len === 'number') {
            let /** @type {?} */ regExpStr = condiction + (len > 1 ? '{' + len + '}' : '');
            let /** @type {?} */ resExp = new RegExp(regExpStr);
            index = format.search(resExp);
            resultLen = len;
        }
        if (index >= 0) {
            result = str.substring(index, index + resultLen);
            return result;
        }
    }
    /**
     * @param {?} dateStr
     * @param {?} format
     * @return {?}
     */
    createDateWidthFormat(dateStr, format) {
        let /** @type {?} */ date = this.createDate(dateStr);
        if (!date) {
            date = this.createDate();
            let /** @type {?} */ year, /** @type {?} */ month, /** @type {?} */ day, /** @type {?} */ hours, /** @type {?} */ minutes, /** @type {?} */ seconds;
            //日
            day = parseInt(this.searchStrByFormat(dateStr, format, '[dD]', [1, 2])) || 1;
            date.setDate(parseInt(day));
            //月
            month = parseInt(this.searchStrByFormat(dateStr, format, '[M]', [1, 2])) || 1;
            date.setMonth(parseInt(month) - 1);
            //年
            year = parseInt(this.searchStrByFormat(dateStr, format, '[yY]', 4)) || date.getFullYear();
            date.setFullYear(year);
            //时
            hours = parseInt(this.searchStrByFormat(dateStr, format, '[hH]', [1, 2])) || 0;
            date.setHours(parseInt(hours));
            //分
            minutes = parseInt(this.searchStrByFormat(dateStr, format, '[m]', [1, 2])) || 0;
            date.setMinutes(parseInt(minutes));
            //秒
            seconds = parseInt(this.searchStrByFormat(dateStr, format, '[sS]', [1, 2])) || 0;
            date.setSeconds(parseInt(seconds));
        }
        return date;
    }
    /**
     * 日期是否大于
     * @param {?} date1
     * @param {?} date2
     * @return {?} Boolean
     */
    isDateTimeGreaterThan(date1, date2) {
        return date1.getTime() - date2.getTime() >= 1000; //误差1000毫秒以内
    }
    /**
     * 建立新的时间对象
     * @param {?=} dateStr
     * @return {?} Date
     */
    createDate(dateStr) {
        let /** @type {?} */ date;
        if (dateStr) {
            date = new Date(dateStr.replace(/-/g, '/'));
        }
        else {
            date = new Date();
            date.setTime(Math.floor(date.getTime() / 1000) * 1000);
        }
        if (date.toDateString() != 'Invalid Date') {
            return date;
        }
    }
    /**
     * 设置初始日期
     * @return {?}
     */
    setOrgDate() {
        let /** @type {?} */ dateStr = '';
        if (this.value) {
            dateStr = this.value;
        }
        else if (this.inputElem) {
            dateStr = this.inputElem.value;
        }
        let /** @type {?} */ date;
        if (dateStr) {
            date = this.createDateWidthFormat(dateStr, this.format);
        }
        else {
            date = this.createDate();
        }
        this.date = date;
        this.setValues();
    }
    /**
     * 设置日期的年份
     * @param {?=} year
     * @return {?}
     */
    setDateFullYear(year) {
        this.date.setFullYear(year || this.year);
    }
    /**
     * 设置日期的月份
     * @param {?=} month
     * @return {?}
     */
    setDateMonth(month) {
        this.date.setMonth(month || this.month);
    }
    /**
     * 设置年月日时分秒的值
     * @param {?=} date
     * @return {?}
     */
    setValues(date) {
        let /** @type {?} */ dateTime = date || this.date;
        this.year = dateTime.getFullYear();
        this.month = dateTime.getMonth();
        this.day = dateTime.getDate();
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
        this.seconds = dateTime.getSeconds();
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    stopPropagation(ev) {
        ev.stopPropagation();
    }
    /**
     * 根据input相对屏幕位置设置弹出框位置
     * @return {?}
     */
    setPosition() {
        if (this.popover && this.inputElem) {
            let /** @type {?} */ popoverH = this.datetimePicker.nativeElement.offsetHeight;
            let /** @type {?} */ popoverW = this.datetimePicker.nativeElement.offsetWidth;
            let /** @type {?} */ rect = this.inputElem.getBoundingClientRect();
            let /** @type {?} */ viewH = document.body.clientHeight;
            let /** @type {?} */ viewW = document.body.clientWidth;
            let /** @type {?} */ scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            let /** @type {?} */ scrollTop = document.documentElement.scrollTop || document.documentElement.scrollTop;
            if (viewW - rect.left < popoverW) {
                //left
                this.left = rect.right - popoverW + scrollLeft;
            }
            else {
                this.left = rect.left + scrollLeft;
            }
            if (this.direction === 'bottom') {
                //top
                this.top = rect.top - popoverH + scrollTop;
            }
            else if (this.direction === 'top') {
                this.top = rect.bottom + scrollTop;
            }
            else {
                if (viewH - rect.bottom < popoverH) {
                    this.top = rect.top - popoverH + scrollTop;
                }
                else {
                    this.top = rect.bottom + scrollTop;
                }
            }
        }
        this.ready = true;
    }
    /**
     * 选择天
     * @param {?} day
     * @return {?}
     */
    pickDay(day) {
        if (!day.disabled) {
            this.date = day.date;
            this.setValues();
            if (this.isPickHours || this.isPickMinutes || this.isPickSeconds) {
                this.isPickingTime = true;
            }
            else {
                this.output();
            }
        }
    }
    /**
     * 上月
     * @return {?}
     */
    prevMonth() {
        let /** @type {?} */ newMonth = this.month - 1;
        this.date.setMonth(newMonth);
        if (this.date.getMonth() > newMonth) {
            this.date.setDate(0);
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    }
    /**
     * 下一月
     * @return {?}
     */
    nextMonth() {
        let /** @type {?} */ newMonth = this.month + 1;
        this.date.setMonth(newMonth);
        if (this.date.getMonth() > newMonth) {
            this.date.setDate(0);
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    }
    /**
     * 获取最小日期
     * @return {?} Date
     */
    getMinDate() {
        if (this.min) {
            let /** @type {?} */ date = this.createDateWidthFormat(this.min, this.format);
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    }
    /**
     * 获取最大日期
     * @return {?} Date
     */
    getMaxDate() {
        if (this.max) {
            let /** @type {?} */ date = this.createDateWidthFormat(this.max, this.format);
            
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    }
    /**
     * 输入时最大值检测
     * @param {?} ev
     * @param {?} max
     * @return {?}
     */
    maxInputTest(ev, max) {
    }
    /**
     * 输入是否符合要求
     * @param {?} str
     * @param {?} format
     * @return {?} boolean
     */
    isFormat(str, format) {
        let /** @type {?} */ str1 = str.replace(/\d{2}|\d/g, '**');
        let /** @type {?} */ str2 = format.replace(/[yYMdDhHmsS]{2}|[yYMdDhHmsS]/g, '**');
        return str1 === str2;
    }
    /**
     * 清空
     * @return {?}
     */
    clear() {
        if (this.inputElem) {
            this.inputElem.value = '';
            this.valueChange.emit('');
        }
        this.close();
    }
    /**
     * 现在
     * @return {?}
     */
    now() {
        let /** @type {?} */ date = this.createDate();
        if (!this.isPickSeconds) {
            date.setSeconds(0);
        }
        if (!this.isPickMinutes) {
            date.setMinutes(0);
        }
        if (!this.isPickHours) {
            date.setHours(0);
        }
        this.date = date;
        this.setValues(date);
        this.createDayOptions();
        this.output();
    }
    /**
     * 清除错误
     * @return {?}
     */
    clearErrors() {
        this.minError = false;
        this.maxError = false;
    }
    /**
     * 输出
     * @return {?}
     */
    output() {
        let /** @type {?} */ minDate = this.getMinDate(), /** @type {?} */
        maxDate = this.getMaxDate();
        if (minDate && this.isDateTimeGreaterThan(minDate, this.date)) {
            this.minError = true;
            return false;
        }
        else if (maxDate && this.isDateTimeGreaterThan(this.date, maxDate)) {
            this.maxError = true;
            return false;
        }
        let /** @type {?} */ result = this.format;
        let /** @type {?} */ month = this.month + 1;
        //年
        result = result.replace(/[yY]{4}/, this.year + '');
        //月
        if (/[M]{2}/.test(this.format)) {
            result = result.replace(/[M]{2}/, month < 10 ? '0' + month : month + '');
        }
        else if (/M/.test(this.format)) {
            result = result.replace(/M/, month + '');
        }
        //日
        if (/[dD]{2}/.test(this.format)) {
            result = result.replace(/[dD]{2}/, this.day < 10 ? '0' + this.day : this.day + '');
        }
        else if (/[dD]/.test(this.format)) {
            result = result.replace(/[dD]/, this.day + '');
        }
        //时
        if (/[hH]{2}/.test(this.format)) {
            result = result.replace(/[hH]{2}/, this.hours < 10 ? '0' + this.hours : this.hours + '');
        }
        else if (/[hH]/.test(this.format)) {
            result = result.replace(/[hH]/, this.hours + '');
        }
        //分
        if (/[m]{2}/.test(this.format)) {
            result = result.replace(/[m]{2}/, this.minutes < 10 ? '0' + this.minutes : this.minutes + '');
        }
        else if (/[m]/.test(this.format)) {
            result = result.replace(/[m]/, this.minutes + '');
        }
        //分
        if (/[sS]{2}/.test(this.format)) {
            result = result.replace(/[sS]{2}/, this.seconds < 10 ? '0' + this.seconds : this.seconds + '');
        }
        else if (/[sS]/.test(this.format)) {
            result = result.replace(/[sS]/, this.seconds + '');
        }
        this.valueChange.emit(result);
        this.close();
        this.complete.emit(result);
    }
    /**
     * 关闭
     * @return {?}
     */
    close() {
        this.visible = false;
        this.ready = false;
    }
}
DatetimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datetime-picker',
                template: `<ng-content select="input"></ng-content>
<div #popover [ngClass]="{'datetime-picker-hide':!ready}">
    <div class="datetime-picker" *ngIf="visible" (click)="stopPropagation($event)" [style.left.px]="left" [style.top.px]="top" [style.zIndex]="zIndex||null" [style.opacity]="ready?'1':0" [style.transition]="ready?'opacity .3s ease-out':'none'" #datetimePicker>
        <div class="datetime-picker-header">
            <div class="datetime-picker-ymd">
                <span class="datetime-picker-prev" (click)="prevMonth();createDayOptions()">‹</span>
                <select [(ngModel)]="year" (change)="setDateFullYear();setValues();createDayOptions()">
          <option *ngFor="let y of yearOptions" [value]="y">{{y}}</option>
        </select> 年
                <select [(ngModel)]="month" (change)="setDateMonth();setValues();createDayOptions()">
          <option *ngFor="let m of monthOptions" [value]="m">{{m+1}}</option>
        </select> 月
                <span class="datetime-picker-next" (click)="nextMonth();createDayOptions()">›</span>
            </div>

        </div>
        <div class="datetime-picker-body">
            <table>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let group of dayOptions">
                        <td *ngFor="let d of group" [ngClass]="{'disabled':!d.isCurrent,'invalid':d.disabled,'active':d.isCurrent&&d.text==day}" (click)="pickDay(d)">{{d.text}}</td>
                    </tr>
                </tbody>
            </table>
            <!--<div class="datetime-picker-time-input" *ngIf="isPickingTime">
        <input *ngIf="isPickHours" maxlength="2" placeholder="时" [(ngModel)]="hours" (input)="maxInputTest($event,23)"/>
        <span *ngIf="isPickMinutes">:</span>
        <input *ngIf="isPickMinutes" maxlength="2" placeholder="分" [(ngModel)]="minutes" (input)="maxInputTest($event,59)"/>
        <span *ngIf="isPickSeconds">:</span>
        <input *ngIf="isPickSeconds" maxlength="2" placeholder="秒" [(ngModel)]="seconds" (input)="maxInputTest($event,59)"/>
        <span *ngIf="isPickHours&&!(isPickMinutes||isPickSeconds)">时</span>
      </div>-->
            <div class="datetime-picker-time-input" *ngIf="isPickingTime">
                <select *ngIf="isPickHours" [(ngModel)]="hours">
          <option *ngFor="let h of hoursOptions" [value]="h">{{h>=10?h:'0'+h}}</option>
        </select>
                <span *ngIf="isPickMinutes">:</span>
                <select *ngIf="isPickMinutes" [(ngModel)]="minutes">
          <option *ngFor="let m of minutesOrSecondsOptions" [value]="m">{{m>=10?m:'0'+m}}</option>
        </select>
                <span *ngIf="isPickSeconds">:</span>
                <select *ngIf="isPickSeconds" [(ngModel)]="seconds">
          <option *ngFor="let s of minutesOrSecondsOptions" [value]="s">{{s>=10?s:'0'+s}}</option>
        </select>
                <span *ngIf="isPickHours&&!(isPickMinutes||isPickSeconds)">时</span>
            </div>
            <div class="datetime-picker-errors" *ngIf="minError||maxError">
                <div class="datetime-picker-error">
                    <span *ngIf="minError">您选择的日期小于允许的最小日期！</span>
                    <span *ngIf="maxError">您选择的日期大于允许的最大日期！</span>
                    <span class="datetime-picker-btn" (click)="clearErrors()">确定</span>
                </div>
            </div>
        </div>
        <div class="datetime-picker-footer">
            <div class="datetime-picker-time">
                <div *ngIf="!isPickingTime" (click)="isPickingTime=true">
                    <span *ngIf="isPickHours">{{hours>=10?hours:'0'+hours}}</span>
                    <span *ngIf="isPickMinutes">:{{minutes>=10?minutes:'0'+minutes}}</span>
                    <span *ngIf="isPickSeconds">:{{seconds>=10?seconds:'0'+seconds}}</span>
                    <span *ngIf="isPickHours&&!(isPickMinutes||isPickSeconds)">时</span>
                </div>
                <div *ngIf="isPickingTime" (click)="isPickingTime=false">返回日期</div>
            </div>
            <div class="datetime-picker-btns">
                <a class="datetime-picker-clear" (click)="clear()">清空</a>
                <a class="datetime-picker-today" (click)="now()">{{isPickHours||isPickMinutes||isPickSeconds?'现在':'今天'}}</a>
                <a class="datetime-picker-sure" *ngIf="isPickHours||isPickMinutes||isPickSeconds" (click)="output()">确定</a>
            </div>
        </div>
    </div>
</div>`,
                styles: [`.datetime-picker{width:240px;height:282px;background-color:#fff;position:absolute;z-index:9999;border:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:14px;left:0;overflow:hidden}.datetime-picker *{-webkit-box-sizing:border-box;box-sizing:border-box}.datetime-picker-header{border-bottom:1px solid #ddd;padding:5px;height:36px;line-height:24px;background-color:#f5f5f5;color:#333}.datetime-picker-header select{min-width:50px;height:24px;text-align:center;padding:2px}.datetime-picker-header:after{content:'';display:block;clear:both}.datetime-picker-ymd{padding:0 30px;text-align:center;position:relative;letter-spacing:1px}.datetime-picker-time:hover{color:#000}.datetime-picker-body{padding:5px;height:208px;position:relative}.datetime-picker-body table{width:100%;text-align:center;line-height:24px;font-size:13px;color:#333}.datetime-picker-body table td,.datetime-picker-body table th{text-align:center;padding:2px}.datetime-picker-body table td:hover{cursor:pointer;background-color:#f5f5f5}.datetime-picker-body table td.disabled{color:#999}.datetime-picker-body table td.invalid{color:#999;cursor:not-allowed}.datetime-picker-body table td.active{color:#000;background-color:#f0f0f0}.datetime-picker-footer{height:36px;border-top:1px solid #ddd;padding:5px}.datetime-picker-time{float:left;padding-right:2px;cursor:pointer;color:#444;letter-spacing:1px;line-height:25px;padding-left:10px;font-size:13px}.datetime-picker-time span{float:left}.datetime-picker-btns{float:right;line-height:26px}.datetime-picker-clear,.datetime-picker-sure,.datetime-picker-today{padding:4px 8px;background-color:#f5f5f5;border:1px solid #ddd;font-size:13px;color:#333;cursor:pointer}.datetime-picker-clear:hover,.datetime-picker-sure:hover,.datetime-picker-today:hover{background-color:#f0f0f0;color:#000}.datetime-picker-clear:active,.datetime-picker-sure:active,.datetime-picker-today:active{background-color:#eee}.datetime-picker-next,.datetime-picker-prev{position:absolute;display:block;width:24px;height:24px;border:1px solid #ddd;background-color:#eaeaea;top:0;text-align:center;line-height:20px;font-size:24px;cursor:pointer}.datetime-picker-prev{left:0}.datetime-picker-next{right:0}.datetime-picker-next:hover,.datetime-picker-prev:hover{background-color:#e5e5e5}.datetime-picker-time-input{display:block;position:absolute;left:0;top:0;width:100%;height:100%;background-color:#fafafa;text-align:center;line-height:180px}.datetime-picker-time-input input{width:50px;text-align:center;padding:4px 10px;border:1px solid #ddd;line-height:16px}.datetime-picker-errors{display:table;position:absolute;left:0;top:0;width:100%;height:100%;background-color:#fff;text-align:center;line-height:32px}.datetime-picker-errors .datetime-picker-error{display:table-cell;padding:0 40px;vertical-align:middle}.datetime-picker-btn{padding:4px 12px;background-color:#fff;color:#666;border:1px solid #ddd;cursor:pointer}.datetime-picker-btn:hover{background-color:#fafafa;color:#333}.datetime-picker-btn:active{background-color:#f5f5f5}.datetime-picker-hide{position:absolute;width:0;height:0;opacity:0;overflow:hidden}`]
            },] },
];
/** @nocollapse */
DatetimePickerComponent.ctorParameters = () => [
    { type: ElementRef, },
];
DatetimePickerComponent.propDecorators = {
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "format": [{ type: Input },],
    "max": [{ type: Input },],
    "min": [{ type: Input },],
    "start": [{ type: Input },],
    "end": [{ type: Input },],
    "trigger": [{ type: Input },],
    "zIndex": [{ type: Input },],
    "isCalendar": [{ type: Input },],
    "direction": [{ type: Input },],
    "complete": [{ type: Output },],
    "popover": [{ type: ViewChild, args: ['popover',] },],
    "datetimePicker": [{ type: ViewChild, args: ['datetimePicker',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatetimePickerModule {
}
DatetimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                ],
                declarations: [
                    DatetimePickerComponent
                ],
                providers: [],
                exports: [
                    DatetimePickerComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlideDownComponent {
    constructor() {
        this.isTransition = false;
        //设置动画时间
        this.animateTime = 0.3;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set show(value) {
        //传入的值为true，内容显示
        //先获取实际内容的高度
        let /** @type {?} */ height;
        if (value) {
            this.wrap.nativeElement.style.overflow = 'hidden';
            this.cssOpen = true;
            this.visible = value;
            setTimeout(() => {
                height = this.content.nativeElement.offsetHeight;
                this.wrap.nativeElement.style.height = 0;
                this.isTransition = true;
                setTimeout(() => {
                    this.cssOpen = false;
                    setTimeout(() => {
                        this.wrap.nativeElement.style.height = height + "px";
                        setTimeout(() => {
                            this.wrap.nativeElement.style.overflow = null;
                        }, this.animateTime * 1000);
                    });
                });
            });
        }
        else {
            this.wrap.nativeElement.style.height = 0;
            this.wrap.nativeElement.style.overflow = 'hidden';
            setTimeout(() => {
                this.wrap.nativeElement.style.overflow = null;
                this.wrap.nativeElement.style.height = null;
                this.isTransition = false;
                this.visible = value;
            }, this.animateTime * 1000);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    open() {
        if (!this.visible) {
            this.show = true;
        }
    }
    /**
     * @return {?}
     */
    close() {
        if (this.visible) {
            this.show = false;
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.show = !this.visible;
    }
}
SlideDownComponent.decorators = [
    { type: Component, args: [{
                selector: 'slide-down',
                template: `<div  #wrap class="drop-content"  [style.transition]="isTransition?'height '+animateTime+'s':null"
 [ngClass]="{'open':cssOpen}">
    <div *ngIf="visible" #content>
      <ng-content ></ng-content>
    </div>
	</div>
`,
                styles: [`.drop-content{width:100%}.drop-content.open{position:absolute;opacity:0;height:0;z-index:-1;overflow:hidden}`]
            },] },
];
/** @nocollapse */
SlideDownComponent.ctorParameters = () => [];
SlideDownComponent.propDecorators = {
    "animateTime": [{ type: Input },],
    "wrap": [{ type: ViewChild, args: ['wrap',] },],
    "content": [{ type: ViewChild, args: ['content',] },],
    "show": [{ type: Input },],
};

//获取的高度

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropDownComponent extends SlideDownComponent {
}
DropDownComponent.decorators = [
    { type: Component, args: [{
                selector: 'drop-down',
                template: `<div  #wrap class="drop-content"  [style.transition]="isTransition?'height '+animateTime+'s':null"
 [ngClass]="{'open':cssOpen}">
    <div *ngIf="visible" #content>
      <ng-content ></ng-content>
    </div>
	</div>
`,
                styles: [`.drop-content{width:100%}.drop-content.open{position:absolute;opacity:0;height:0;z-index:-1;overflow:hidden}`]
            },] },
];

//获取的高度

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropDownModule {
}
DropDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    DropDownComponent
                ],
                providers: [],
                exports: [
                    DropDownComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlideDownModule {
}
SlideDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SlideDownComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    SlideDownComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SliderComponent {
    /**
     * @param {?} eleRef
     */
    constructor(eleRef) {
        this.eleRef = eleRef;
        this.valueChange = new EventEmitter();
        this.min = 0;
        this.max = 100;
        this.decimal = 0;
        this.isValueBackground = true;
        this.complete = new EventEmitter();
        this.isPressing = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        window.addEventListener('mouseup', (ev) => {
            this.isPressing = false;
            this.complete.emit(this.value);
            window.removeEventListener('mousemove', this.mouseMoveHandler); //取消监听
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ valChg = changes['value'];
        if (valChg.currentValue != valChg.previousValue) {
            if (valChg.currentValue !== undefined) {
                if (!this.isPressing) {
                    this.setLeftByValue(valChg.currentValue);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        window.removeEventListener('mousemove', this.mouseMoveHandler); //取消监听
    }
    /**
     * @return {?}
     */
    thumbPress() {
        this.isPressing = true;
        this.mouseMoveHandler = (ev) => {
            this.setNewValueByMousePosition(ev);
        };
        window.addEventListener('mousemove', this.mouseMoveHandler);
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    setNewValueByMousePosition(ev) {
        let /** @type {?} */ e = ev;
        let /** @type {?} */ m_x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
                || document.body.scrollLeft));
        let /** @type {?} */ target_x = this.slider.nativeElement.getBoundingClientRect().left + (document.documentElement.scrollLeft
            || document.body.scrollLeft);
        let /** @type {?} */ sliderW = this.slider.nativeElement.offsetWidth;
        let /** @type {?} */ thumbW = this.sliderThumb.nativeElement.offsetWidth;
        let /** @type {?} */ minL = -thumbW / 2;
        let /** @type {?} */ maxL = sliderW - thumbW / 2;
        let /** @type {?} */ left = m_x - target_x - thumbW / 2;
        let /** @type {?} */ percent = 0;
        if (left < minL) {
            percent = minL / sliderW * 100;
        }
        else if (left > maxL) {
            percent = maxL / sliderW * 100;
        }
        else {
            percent = left / sliderW * 100;
        }
        this.left = percent + '%';
        let /** @type {?} */ newVal = this.parseDecimal((this.max - this.min) * (percent / 100 + thumbW / 2 / sliderW) + this.min);
        this.valueChange.emit(newVal);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setLeftByValue(val) {
        let /** @type {?} */ percent = 100 * ((val - this.min) / (this.max - this.min));
        if (percent < 0) {
            percent = 0;
        }
        else if (percent > 100) {
            percent = 100;
        }
        percent -= (100 * this.sliderThumb.nativeElement.offsetWidth / 2 / this.slider.nativeElement.offsetWidth);
        this.left = percent + '%';
    }
    /**
     * @param {?} val
     * @return {?}
     */
    parseDecimal(val) {
        if (this.decimal) {
            return parseFloat(val.toFixed(this.decimal));
        }
        else {
            return Math.round(val);
        }
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'slider',
                template: `<div class="slider" #slider (click)="setNewValueByMousePosition($event)">
  <div class="slider-text-bar">
    <span class="slider-min" *ngIf="(value-min)/(max-min)>0.1">{{min}}</span>
    <span class="slider-max" *ngIf="(max-value)/(max-min)>0.1">{{max}}</span>
  </div>
  <div class="slider-body" >
    <div class="slider-value" [style.left]="left">{{value}}</div>
    <div class="slider-bg" [style.width]="left" *ngIf="isValueBackground"></div>
    <div class="slider-thumb"   #sliderThumb
         [style.left]="left"
         [ngClass]="{'active':isPressing}" (mousedown)="thumbPress()"></div>
  </div>
</div>
`,
                styles: [`.slider{width:100%}.slider,.slider *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.slider-text-bar{display:block;width:100%;height:16px;font-size:12px;color:#999;margin-bottom:5px}.slider-text-bar .slider-min{float:left}.slider-text-bar .slider-max{float:right}.slider-body{display:block;position:relative;width:100%;height:8px;background-color:#e4eaec;border-radius:4px}.slider-body .slider-value{display:inline-block;min-width:20px;position:absolute;left:0;top:-22px;font-size:12px;color:#999;text-align:center;vertical-align:middle}.slider-body .slider-thumb{display:block;width:20px;height:20px;position:absolute;top:-6px;left:50%;border-radius:50%;border:1px solid #ddd;background-color:#fff}.slider-body .slider-thumb:after{content:'';display:block;width:8px;height:8px;position:absolute;top:5px;left:5px;border-radius:50%;background-color:#ddd}.slider-body .slider-thumb.active:after{background-color:#09a8f1}.slider-body .slider-bg{display:block;height:100%;width:0;position:absolute;background-color:#09a8f1;border-bottom-left-radius:10px;border-top-left-radius:10px}`]
            },] },
];
/** @nocollapse */
SliderComponent.ctorParameters = () => [
    { type: ElementRef, },
];
SliderComponent.propDecorators = {
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "size": [{ type: Input },],
    "min": [{ type: Input },],
    "max": [{ type: Input },],
    "decimal": [{ type: Input },],
    "isValueBackground": [{ type: Input },],
    "complete": [{ type: Output },],
    "slider": [{ type: ViewChild, args: ['slider',] },],
    "sliderThumb": [{ type: ViewChild, args: ['sliderThumb',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SliderModule {
}
SliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    SliderComponent
                ],
                providers: [],
                exports: [
                    SliderComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectComponent {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.visible = false;
        this.initializedStyle = false;
        this.text = '';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ valChg = changes['value'];
        if (valChg) {
            this.text = this.matchText(valChg.currentValue, this.options);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.visible = true;
        this.setDefaultStyle();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.setDefaultStyle();
    }
    /**
     * @return {?}
     */
    setDefaultStyle() {
        if (!this.initializedStyle && this.body) {
            const /** @type {?} */ select = this.elemRef.nativeElement.querySelector('select');
            if (select) {
                //lineHeight
                const /** @type {?} */ elem = this.body.nativeElement;
                const /** @type {?} */ rect = elem.getBoundingClientRect();
                this.body.nativeElement.style.lineHeight = rect.bottom - rect.top - 2 + "px";
                //paddingRight
                const /** @type {?} */ padLeft = this.getCss(select, 'paddingLeft');
                if (padLeft) {
                    elem.style.paddingLeft = padLeft;
                }
                this.initializedStyle = true;
            }
        }
    }
    /**
     * 获取元素生效的css属性值
     * @param {?} elem
     * @param {?} attr
     * @return {?}
     */
    getCss(elem, attr) {
        if (elem && typeof elem === 'object' && attr && typeof attr === 'string') {
            if (typeof document.defaultView.getComputedStyle == 'function') {
                if (attr === 'float') {
                    //float的特殊处理
                    attr = 'cssFloat';
                }
                return document.defaultView.getComputedStyle(elem, null)[attr];
            }
            else if (elem.currentStyle && typeof elem.currentStyle === 'object') {
                if (attr === 'float') {
                    //float的特殊处理
                    attr = 'styleFloat';
                }
                return elem.currentStyle[attr];
            }
        }
    }
    /**
     * 匹配文字
     * @param {?} val
     * @param {?} options
     * @return {?}
     */
    matchText(val, options) {
        let /** @type {?} */ text = '';
        if (options instanceof Array) {
            if (this.valueKey && typeof this.valueKey == 'string') {
                if (this.textKey && typeof this.textKey == 'string') {
                    for (let /** @type {?} */ o of options) {
                        if (o && typeof o == 'object' && val === o[this.valueKey]) {
                            text = o[this.textKey];
                        }
                    }
                }
            }
        }
        return text;
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'nx-select',
                template: `<div class="nx-select{{styleClass?' '+styleClass:''}}">
    <ng-content select="select">

    </ng-content>
    <div class="nx-select-body" #body *ngIf="visible">
        <span class="nx-select-text">{{text}}</span>
        <div class="nx-select-arrow"></div>
    </div>
</div>`,
                styles: [`.nx-select,.nx-select *{-webkit-box-sizing:border-box;box-sizing:border-box}.nx-select{display:inline-block;position:relative;overflow:hidden;vertical-align:middle}.nx-select-body{position:absolute;left:0;right:0;top:0;bottom:0;border:1px solid transparent;padding-right:20px;background-color:#fff;white-space:nowrap}.nx-select /deep/ select{position:relative;z-index:1;opacity:0}.nx-select /deep/ select+.nx-select-body{border-color:#ddd}.nx-select /deep/ select:focus+.nx-select-body{border-color:#24b6e4}.nx-select /deep/ select:focus+.nx-select-body .nx-select-arrow{border-top-color:#24b6e4}.nx-select-arrow{width:0;height:0;border-top:5px solid #666;border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:none;position:absolute;right:6px;top:50%;margin-top:-3px}`]
            },] },
];
/** @nocollapse */
SelectComponent.ctorParameters = () => [
    { type: ElementRef, },
];
SelectComponent.propDecorators = {
    "value": [{ type: Input },],
    "options": [{ type: Input },],
    "valueKey": [{ type: Input },],
    "textKey": [{ type: Input },],
    "styleClass": [{ type: Input },],
    "body": [{ type: ViewChild, args: ['body',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectModule {
}
SelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SelectComponent
                ],
                providers: [],
                exports: [
                    CommonModule,
                    SelectComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AreaPicker {
    constructor() {
        this.values = [];
        this.index = 0;
        this.isShowLoader = false;
    }
    /**
     * 创建最外层元素
     * @return {?}
     */
    createWrap() {
        let /** @type {?} */ wrap = document.createElement('DIV');
        wrap.className = 'areaPicker';
        if (this.zIndex || this.zIndex == 0) {
            wrap.style.zIndex = this.zIndex + '';
        }
        //定位
        this.setPosition(wrap);
        this.wrap = wrap;
        document.body.appendChild(this.wrap);
        setTimeout(() => {
            this.wrap.style.transition = 'opacity .3s ease-out';
            this.wrap.style.opacity = '1';
        });
    }
    /**
     * 创建顶部
     * @return {?}
     */
    createHeader() {
        let /** @type {?} */ header = document.createElement('DIV');
        header.className = 'areaPicker-header';
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.items.length; i < len; i++) {
            let /** @type {?} */ item = document.createElement('DIV');
            item.className = 'areaPicker-header-item';
            item.innerHTML = this.items[i].label;
            item.setAttribute('data-index', i + '');
            item.setAttribute('data-type', 'header');
            this.items[i].elem = item;
            header.appendChild(item);
        }
        this.header = header;
        this.wrap.appendChild(this.header);
    }
    /**
     * 创建body（选择区）
     * @return {?}
     */
    createBody() {
        let /** @type {?} */ body = document.createElement('DIV');
        body.className = 'areaPicker-body';
        this.body = body;
        this.wrap.appendChild(this.body);
    }
    /**
     * 设置数据
     * @param {?} data 新的数据
     * @param {?=} index 当前激活的item
     * @return {?}
     */
    setData(data, index) {
        let /** @type {?} */ i = (index !== undefined ? index : this.index);
        this.items[i].data = data;
        this.setBodyContent();
    }
    /**
     * 清空指定items下标的数据
     * @param {?=} index
     * @return {?}
     */
    clearData(index) {
        let /** @type {?} */ i = (index !== undefined ? index : this.index);
        this.items[i].data = [];
    }
    /**
     * 清空body内容
     * @return {?}
     */
    clearBody() {
        this.body.innerHTML = this.isShowLoader ? '<span class="areaPicker-loader">加载中...</span>' : '';
    }
    /**
     * 激活item
     * @param {?} index
     * @return {?}
     */
    activate(index) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.items.length; i < len; i++) {
            this.removeClass(this.items[i].elem, 'active');
            if (i >= index) {
                this.items[i].elem.innerHTML = this.items[i].label;
            }
        }
        this.addClass(this.items[index].elem, 'active');
        this.index = index;
    }
    /**
     * 设置body里的内容（供选择的元素）
     * @param {?=} index
     * @return {?}
     */
    setBodyContent(index) {
        this.body.innerHTML = '';
        let /** @type {?} */ act_index = index || this.index;
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.items[act_index].data.length; i < len; i++) {
            let /** @type {?} */ o = this.items[act_index].data[i];
            let /** @type {?} */ btn = document.createElement('SPAN');
            btn.className = 'areaPicker-item';
            btn.setAttribute('data-index', i + '');
            btn.setAttribute('data-type', 'item');
            btn.innerHTML = this.getObjByKey(o, this.items[act_index].key);
            this.body.appendChild(btn);
        }
    }
    /**
     * 定位
     * @param {?} refElem
     * @return {?}
     */
    setPosition(refElem) {
        let /** @type {?} */ el = this.wrap;
        if (el) {
            let /** @type {?} */ scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let /** @type {?} */ scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            let /** @type {?} */ offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
            var /** @type {?} */ pos = refElem.getBoundingClientRect();
            el.style.position = 'absolute';
            el.style.minWidth = (pos.right - pos.left) + 'px';
            if (document.body.clientHeight - pos.bottom < this.wrap.offsetHeight) {
                if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') < 0) {
                    this.addClass(this.wrap, 'areaPicker-top');
                }
                el.style.left = (pos.left + scrollLeft) + 'px';
                //el.style.top = (pos.top-this.wrap.offsetHeight+scrollTop)+ 'px';
                el.style.bottom = (offsetHeight - pos.top - scrollTop) + 'px';
            }
            else {
                if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') >= 0) {
                    this.removeClass(this.wrap, 'areaPicker-top');
                }
                el.style.left = (pos.left + scrollLeft) + 'px';
                el.style.top = (pos.bottom + scrollTop) + 'px';
            }
        }
    }
    /**
     * 关闭弹出框
     * @return {?}
     */
    close() {
        if (this.wrap) {
            document.body.removeChild(this.wrap);
            this.wrap = null;
        }
    }
    /**
     * 通过key字符串获取指定对象的数据
     * @param {?} data
     * @param {?} keyStr  key/key.key.....
     * @return {?} any
     */
    getObjByKey(data, keyStr) {
        if (data && typeof data === 'object') {
            let /** @type {?} */ keys = keyStr.split('.');
            let /** @type {?} */ obj = data;
            while (keys.length) {
                obj = obj[keys.shift()];
            }
            return obj;
        }
        else {
            return data;
        }
    }
    /**
     * 获取values中key指定的值拼接的字符串
     * @return {?} string
     */
    getValuesStr() {
        let /** @type {?} */ str = '';
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.values.length; i < len; i++) {
            str += this.getObjByKey(this.values[i], this.items[i].key);
        }
        return str;
    }
    /**
     * 为元素添加一个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    addClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    }
    /**
     * 删除某个类
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    removeClass(elem, className) {
        let /** @type {?} */ classList = elem.className.split(/\s+/);
        let /** @type {?} */ clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AreaPickerDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.ngModelChange = new EventEmitter();
        this.handlers = [];
        this.triggerListener = {
            event: 'focus'
        };
    }
    /**
     * 添加事件
     * @param {?} elem
     * @param {?} event
     * @param {?} fn
     * @return {?}
     */
    addEvent(elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    }
    /**
     * 移除事件
     * @param {?} elem
     * @param {?} event
     * @param {?} fn
     * @return {?}
     */
    removeEvent(elem, event, fn) {
        for (let /** @type {?} */ handler of this.handlers) {
            if (elem === handler.elem && event === handler.event && fn === handler.fn) {
                elem['removeEventListener'](event, fn);
            }
        }
    }
    /**
     * 清空事件
     * @return {?}
     */
    clearEvents() {
        for (let /** @type {?} */ handler of this.handlers) {
            handler.elem.removeEventListener(handler.event, handler.fn);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.triggerListener.fn = (ev) => {
            this.addEvent(this.elemRef.nativeElement, 'click', (ev) => {
                ev.stopPropagation();
            });
            let /** @type {?} */ picker = this.areaPicker;
            if (picker.wrap) {
                return;
            }
            picker.createWrap();
            picker.setPosition(this.elemRef.nativeElement);
            picker.createHeader();
            picker.createBody();
            picker.clearBody();
            picker.activate(0);
            picker.init();
            this.addEvent(picker.wrap, 'click', (ev) => {
                //点击事件
                ev.stopPropagation();
                let /** @type {?} */ target = ev.target || ev.srcElement;
                let /** @type {?} */ type = target['getAttribute']('data-type');
                if (type === 'item') {
                    //点击列表元素
                    let /** @type {?} */ dataIndex = target['getAttribute']('data-index');
                    let /** @type {?} */ selectedData = picker.items[picker.index].data[dataIndex];
                    picker.items[picker.index].elem.innerHTML = picker.getObjByKey(selectedData, picker.items[picker.index].key); //设置top内容
                    let /** @type {?} */ nextIndex = picker.index + 1; //下一个激活的下标
                    picker.values.splice(picker.index + 1, picker.values.length - (picker.index + 1)); //值切割
                    picker.values[picker.index] = selectedData;
                    let /** @type {?} */ selectedCallback = picker.items[picker.index].selected;
                    if (nextIndex < picker.items.length) {
                        //未选择完毕
                        picker.clearBody(); //清空body里的元素
                        picker.activate(nextIndex); //激活下一个
                    }
                    else {
                        //触发选择完毕回调
                        if (typeof picker.done === 'function') {
                            this.ngModelChange.emit(picker.getValuesStr());
                            picker.close(); //关闭弹出框
                            this.clearEvents(); //清空（临时）事件
                            picker.done(picker.values);
                        }
                    }
                    selectedCallback(selectedData); //触发选择完毕回调
                }
                else if (type === 'header') {
                    //点击顶部tab
                    let /** @type {?} */ index = parseInt(target['getAttribute']('data-index'));
                    if (index !== picker.index) {
                        if (index < picker.index) {
                            picker.activate(index);
                            picker.setData(picker.items[index].data);
                        }
                        else {
                            if (picker.values[index] == picker.items[index].data) {
                                picker.activate(index);
                                picker.setData(picker.items[index].data);
                            }
                        }
                    }
                }
            });
            //点击空白关闭
            this.addEvent(document, 'click', () => {
                this.areaPicker.close();
                this.clearEvents();
            });
            //窗口大小改变
            this.addEvent(window, 'resize', (ev) => {
                if (this.resizeTimer) {
                    clearTimeout(this.resizeTimer);
                }
                this.resizeTimer = setTimeout(() => {
                    this.areaPicker.setPosition(this.elemRef.nativeElement);
                }, 10);
            });
        };
        this.elemRef.nativeElement.addEventListener(this.triggerListener.event, this.triggerListener.fn);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.areaPicker.close();
        this.elemRef.nativeElement.removeEventListener(this.triggerListener.event, this.triggerListener.fn);
    }
}
AreaPickerDirective.decorators = [
    { type: Component, args: [{
                selector: '[areaPicker]',
                template: '',
                styles: [`/deep/ .areaPicker{position:absolute;min-height:120px;max-width:360px;border:1px solid #ddd;background-color:#fff;font-size:14px;opacity:0}/deep/ .areaPicker .areaPicker-header{height:32px;width:100%;position:relative;left:0;top:0;border-bottom:1px solid #ddd;background-color:#f5f5f5;z-index:1}/deep/ .areaPicker .areaPicker-header:after{content:'';clear:both;display:block}/deep/ .areaPicker .areaPicker-body{padding:12px;max-height:150px;overflow-y:auto}/deep/ .areaPicker .areaPicker-body:after{content:'';clear:both;display:block}/deep/ .areaPicker .areaPicker-header-item{line-height:31px;text-align:center;padding:0 12px;float:left;border-right:1px solid #ddd;cursor:pointer;color:#666}/deep/ .areaPicker .areaPicker-header-item.active{border-bottom:1px solid #fff;margin-bottom:-1px;background-color:#fff!important;color:#333}/deep/ .areaPicker .areaPicker-header-item:hover{background-color:#fafafa}/deep/ .areaPicker .areaPicker-header-item:last-child{border-right:none;margin-right:10px}/deep/ .areaPicker .areaPicker-header-item:last-child:hover{border-right:1px solid #ddd}/deep/ .areaPicker .areaPicker-header-item.active:last-child{border-right:1px solid #ddd}/deep/ .areaPicker .areaPicker-item{margin-right:8px;line-height:18px;margin-bottom:6px;color:#666;cursor:pointer;float:left}/deep/ .areaPicker .areaPicker-item:hover{color:#000}/deep/ .areaPicker .areaPicker-loader{display:block;color:#999}`]
            },] },
];
/** @nocollapse */
AreaPickerDirective.ctorParameters = () => [
    { type: ElementRef, },
];
AreaPickerDirective.propDecorators = {
    "areaPicker": [{ type: Input },],
    "ngModelChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AreaPickerModule {
}
AreaPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    AreaPickerDirective
                ],
                providers: [],
                exports: [
                    AreaPickerDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleClassDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.keep = false;
        this.triggerEvent = 'click';
        this.tempWindowEvent = {
            event: this.triggerEvent,
            handler: null
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.orgClassName = this.elemRef.nativeElement.className;
        this.toggleClassList = this.getToggleClassList(this.toggleClass);
        if (this.target) {
            this.targetElem = document.getElementById(this.target);
            this.targetElem && (this.orgTargetClassName = this.targetElem.className);
            let /** @type {?} */ targetToggleClass = this.targetClass || this.toggleClass;
            this.targetToggleClassList = this.getToggleClassList(targetToggleClass);
        }
        this.elemRef.nativeElement.addEventListener(this.triggerEvent, (ev) => {
            ev.stopPropagation();
            setTimeout(() => {
                if (this.keep) {
                    let /** @type {?} */ classList = this.uniqueArray((this.orgClassName + ' ' + this.toggleClass).split(/\s+/));
                    this.elemRef.nativeElement.className = classList.join(' ');
                    if (this.target) {
                        let /** @type {?} */ targetClassList = this.uniqueArray((this.orgTargetClassName + ' ' + this.targetClass).split(/\s+/));
                        this.targetElem.className = targetClassList.join(' ');
                    }
                }
                else {
                    this.changeElemClass(this.elemRef.nativeElement, this.toggleClassList);
                    if (this.target) {
                        this.targetElem && this.changeElemClass(this.targetElem, this.targetToggleClassList);
                    }
                }
                if (!(this.revokable === undefined || this.revokable === 'false')) {
                    let /** @type {?} */ finalClassList = this.getClassList(this.elemRef.nativeElement);
                    let /** @type {?} */ commonClassList = this.getCommonClass(finalClassList, this.toggleClassList);
                    if (commonClassList.length) {
                        this.addOutClickResetListener();
                    }
                }
            });
        });
    }
    /**
     * 切换元素类名
     * @param {?} elem
     * @param {?} toggleClass
     * @return {?}
     */
    changeElemClass(elem, toggleClass) {
        let /** @type {?} */ curClassList = this.getClassList(elem); //当前class列表
        let /** @type {?} */ curOnlyClass = this.getOnlyClass(curClassList, toggleClass); //仅当前元素有的class列表
        let /** @type {?} */ toggleOnlyClass = this.getOnlyClass(toggleClass, curClassList); //仅输入参数有的class列表
        let /** @type {?} */ newClassList = curOnlyClass.concat(toggleOnlyClass);
        elem.className = newClassList.join(' ');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeOutClickResetListener();
        this.targetElem = null;
    }
    /**
     * 添加点击外边重置class的事件
     * @return {?}
     */
    addOutClickResetListener() {
        let /** @type {?} */ handler = (ev) => {
            this.elemRef.nativeElement.className = this.orgClassName;
            if (this.target) {
                this.targetElem.className = this.orgTargetClassName;
            }
            this.removeOutClickResetListener();
        };
        window.addEventListener(this.triggerEvent, handler);
        this.tempWindowEvent.event = this.triggerEvent;
        this.tempWindowEvent.handler = handler;
    }
    /**
     * 移除window上的浏览器事件
     * @return {?}
     */
    removeOutClickResetListener() {
        if (this.tempWindowEvent !== undefined) {
            window.removeEventListener(this.tempWindowEvent.event, this.tempWindowEvent.handler);
        }
    }
    /**
     * 获取元素类名列表
     * @param {?} elem
     * @return {?} Array<string>
     */
    getClassList(elem) {
        return this.uniqueArray(elem.className.split(/\s+/));
    }
    /**
     * 获取需要切换的类名列表
     * @param {?} inputClass
     * @return {?} any
     */
    getToggleClassList(inputClass) {
        let /** @type {?} */ nullRegExp = /^\s+$/;
        if (!nullRegExp.test(inputClass)) {
            return this.uniqueArray(inputClass.split(/\s+/));
        }
        return [];
    }
    /**
     * 找出仅在数组A中存在，B中不存在的类
     * @param {?} arrA
     * @param {?} arrB
     * @return {?} Array
     */
    getOnlyClass(arrA, arrB) {
        let /** @type {?} */ result = [];
        for (let /** @type {?} */ item of arrA) {
            if (arrB.indexOf(item) < 0) {
                result.push(item);
            }
        }
        return result;
    }
    /**
     * 获取两个数组共有的类名
     * @param {?} arrA
     * @param {?} arrB
     * @return {?} Array
     */
    getCommonClass(arrA, arrB) {
        let /** @type {?} */ result = [];
        for (let /** @type {?} */ item of arrB) {
            if (arrA.indexOf(item) >= 0) {
                result.push(item);
            }
        }
        return result;
    }
    /**
     * 去重
     * @param {?} array
     * @return {?} Array
     */
    uniqueArray(array) {
        let /** @type {?} */ newArr = [];
        for (let /** @type {?} */ item of array) {
            if (newArr.indexOf(item) < 0) {
                newArr.push(item);
            }
        }
        return newArr;
    }
}
ToggleClassDirective.decorators = [
    { type: Directive, args: [{
                selector: '[toggleClass]'
            },] },
];
/** @nocollapse */
ToggleClassDirective.ctorParameters = () => [
    { type: ElementRef, },
];
ToggleClassDirective.propDecorators = {
    "toggleClass": [{ type: Input },],
    "revokable": [{ type: Input, args: ['opt-revokable',] },],
    "target": [{ type: Input, args: ['opt-target',] },],
    "targetClass": [{ type: Input, args: ['opt-targetClass',] },],
    "keep": [{ type: Input, args: ['opt-keep',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleClassModule {
}
ToggleClassModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ToggleClassDirective
                ],
                providers: [],
                exports: [
                    ToggleClassDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BtnBackDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.elemRef.nativeElement.addEventListener('click', () => {
            history.back();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
BtnBackDirective.decorators = [
    { type: Directive, args: [{
                selector: '[btnBack]'
            },] },
];
/** @nocollapse */
BtnBackDirective.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BtnBackModule {
}
BtnBackModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    BtnBackDirective
                ],
                providers: [],
                exports: [
                    BtnBackDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TextMaxLengthDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.textMaxLength = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.elemRef.nativeElement.style.maxWidth = this.textMaxLength;
        this.elemRef.nativeElement.style.whiteSpace = 'nowrap';
        this.elemRef.nativeElement.style.overflow = 'hidden';
        this.elemRef.nativeElement.style.textOverflow = 'ellipsis';
    }
}
TextMaxLengthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[textMaxLength]'
            },] },
];
/** @nocollapse */
TextMaxLengthDirective.ctorParameters = () => [
    { type: ElementRef, },
];
TextMaxLengthDirective.propDecorators = {
    "textMaxLength": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TextMaxLengthModule {
}
TextMaxLengthModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    TextMaxLengthDirective
                ],
                providers: [],
                exports: [
                    TextMaxLengthDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HTML5ValidateDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.visible = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.elemRef.nativeElement.nodeName === 'FORM') {
            this.elemRef.nativeElement.removeAttribute('novalidate');
        }
        else {
            this.initValidateRules();
        }
    }
    /**
     * @return {?}
     */
    createCustomValidity() {
        let /** @type {?} */ msg = '';
        if (this.HTML5Validate instanceof Array) {
            if (typeof this.HTML5Validate[1] === 'string') {
                if (!!this.HTML5Validate[0]) {
                    msg = this.HTML5Validate[1];
                }
            }
            else {
                for (let /** @type {?} */ o of this.HTML5Validate) {
                    if (typeof o[1] === 'string') {
                        if (!!o[0]) {
                            msg = o[1];
                            break;
                        }
                    }
                }
            }
        }
        return msg;
    }
    /**
     * @return {?}
     */
    initValidateRules() {
        this.elemRef.nativeElement.addEventListener('invalid', () => {
            this.elemRef.nativeElement.setCustomValidity(this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('change', () => {
            this.elemRef.nativeElement.setCustomValidity(this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('keydown', () => {
            this.elemRef.nativeElement.setCustomValidity('');
        });
    }
}
HTML5ValidateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[HTML5Validate]'
            },] },
];
/** @nocollapse */
HTML5ValidateDirective.ctorParameters = () => [
    { type: ElementRef, },
];
HTML5ValidateDirective.propDecorators = {
    "HTML5Validate": [{ type: Input },],
    "visible": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ValidateModule {
}
ValidateModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    HTML5ValidateDirective
                ],
                providers: [],
                exports: [
                    HTML5ValidateDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CurrencyFormatDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.separateLength = 3;
        this.accuracy = 2;
        this.separator = ',';
        this.ngModelChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout(() => {
            this.elemRef.nativeElement.value = this.transform(this.elemRef.nativeElement.value);
        });
        let /** @type {?} */ inputFn = (ev) => {
            this.ngModelChange.emit(this.elemRef.nativeElement.value.replace(new RegExp(this.separator, 'g'), ''));
            setTimeout(() => {
                this.elemRef.nativeElement.value = this.transform(this.elemRef.nativeElement.value);
            }, 0);
        };
        let /** @type {?} */ testinput = document.createElement('input');
        if ('oninput' in testinput) {
            this.elemRef.nativeElement.addEventListener("input", inputFn, false);
        }
        else {
            this.elemRef.nativeElement.onpropertychange = inputFn;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value) {
            //NaN  0   ''
            return '';
        }
        let /** @type {?} */ sep = this.separator;
        let /** @type {?} */ inputStr = (value + '').replace(new RegExp(sep, 'g'), ''), /** @type {?} */
        numRegExp = /^[0-9]+(\.[0-9]+)?$/, /** @type {?} */
        str = inputStr.replace(/\s/g, ''), /** @type {?} */
        sepLen = this.separateLength;
        let /** @type {?} */ result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                //分隔长度大于0
                let /** @type {?} */ splits = str.split('.');
                let /** @type {?} */ intStr = splits[0];
                let /** @type {?} */ ext = splits.length > 1 ? splits[1] : '';
                let /** @type {?} */ intLen = intStr.length, /** @type {?} */
                newIntStr = '';
                if (intLen > sepLen) {
                    for (let /** @type {?} */ i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
                        if (i > 0) {
                            newIntStr = sep + intStr.substr(i, sepLen) + newIntStr;
                        }
                        else {
                            newIntStr = intStr.substr(0, sepLen + i) + newIntStr;
                        }
                    }
                }
                else {
                    newIntStr = intStr;
                }
                result = newIntStr + (ext ? '.' + ext : '');
            }
            else {
                //分隔长度等于0
                result = inputStr;
            }
        }
        else {
            result = inputStr;
        }
        return result;
    }
}
CurrencyFormatDirective.decorators = [
    { type: Directive, args: [{
                selector: '[currencyFormat]'
            },] },
];
/** @nocollapse */
CurrencyFormatDirective.ctorParameters = () => [
    { type: ElementRef, },
];
CurrencyFormatDirective.propDecorators = {
    "ngModel": [{ type: Input },],
    "currencyFormat": [{ type: Input },],
    "ngModelChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CurrencyFormatPipe {
    constructor() {
        this.separateLength = 3;
        this.accuracy = 2;
        this.format = '';
        this.separator = ',';
    }
    /**
     * @param {?} value
     * @param {?=} param
     * @return {?}
     */
    transform(value, param) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value && value !== 0) {
            //NaN  0   ''
            return '';
        }
        let /** @type {?} */ sep = this.separator;
        let /** @type {?} */ flag = '';
        let /** @type {?} */ inputStr = value + '';
        flag = (inputStr.indexOf('-') >= 0 ? '-' : inputStr.indexOf('+') >= 0 ? '+' : '');
        inputStr = inputStr.replace(/[^\d\.]/g, /*new RegExp(sep, 'g')*/ '');
        let /** @type {?} */ numRegExp = /^[\-\+]?[0-9]+(\.[0-9]+)?$/, /** @type {?} */
        str = inputStr.replace(/\s/g, ''), /** @type {?} */
        accuracy = this.accuracy, /** @type {?} */
        format = this.format, /** @type {?} */
        sepLen = this.separateLength;
        //参数匹配
        let /** @type {?} */ nums = [];
        let /** @type {?} */ strs = [];
        if (typeof param === 'string') {
            strs.push(param);
        }
        else if (typeof param === 'number') {
            nums.push(param);
        }
        else if (param instanceof Array) {
            for (let /** @type {?} */ o of param) {
                if (typeof o === 'string') {
                    strs.push(o);
                }
                else if (typeof o === 'number') {
                    nums.push(o);
                }
            }
        }
        //数字参数识别
        if (nums.length > 0) {
            accuracy = nums[0];
        }
        if (nums.length > 1) {
            sepLen = nums[1];
        }
        //字符串参数识别
        if (strs.length > 0) {
            format = strs[0];
        }
        if (strs.length > 1) {
            sep = strs[1];
        }
        let /** @type {?} */ result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                //分隔长度大于0
                str = parseFloat(str).toFixed(accuracy) + ''; //四舍五入
                let /** @type {?} */ splits = str.split('.');
                let /** @type {?} */ intStr = splits[0];
                let /** @type {?} */ ext = splits.length > 1 ? splits[1] : '';
                if (ext.length < accuracy) {
                    let /** @type {?} */ fillLen = accuracy - ext.length;
                    for (let /** @type {?} */ i = 0; i < fillLen; i++) {
                        ext += '0';
                    }
                }
                let /** @type {?} */ intLen = intStr.length, /** @type {?} */
                newIntStr = '';
                if (intLen > sepLen) {
                    for (let /** @type {?} */ i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
                        if (i > 0) {
                            newIntStr = sep + intStr.substr(i, sepLen) + newIntStr;
                        }
                        else {
                            newIntStr = intStr.substr(0, sepLen + i) + newIntStr;
                        }
                    }
                }
                else {
                    newIntStr = intStr;
                }
                result = newIntStr + (ext ? '.' + ext : '');
            }
            else {
                //分隔长度等于0
                result = inputStr;
            }
            //格式化
            if (format) {
                let /** @type {?} */ index = format.indexOf('xx');
                if (index >= 0) {
                    result = format.replace(/xx/, result);
                }
                else {
                    result = result + format;
                }
            }
        }
        else {
            result = inputStr;
        }
        if (flag) {
            result = flag + result;
        }
        return result;
    }
}
CurrencyFormatPipe.decorators = [
    { type: Pipe, args: [{ name: 'currencyFormat' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CurrencyFormatModule {
}
CurrencyFormatModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    CurrencyFormatDirective,
                    CurrencyFormatPipe
                ],
                providers: [],
                exports: [
                    CurrencyFormatDirective,
                    CurrencyFormatPipe
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatePipe {
    constructor() {
        this.format = 'yyyy-MM-dd';
    }
    /**
     * @param {?} dateStr
     * @return {?}
     */
    createDate(dateStr) {
        let /** @type {?} */ date = new Date(dateStr);
        if (date + '' === 'Invalid Date') {
            date = new Date(dateStr + ''.replace(/-/g, '/').replace(/\.\d+$/, ''));
            if (date + '' === 'Invalid Date') {
                return null;
            }
        }
        return date;
    }
    /**
     * @param {?} value
     * @param {?} fmt
     * @return {?}
     */
    transform(value, fmt) {
        if (value) {
            let /** @type {?} */ date;
            if (value instanceof Date) {
                date = value;
            }
            else if (typeof value === 'string') {
                date = this.createDate(value);
            }
            else if (typeof value === 'number') {
                date = new Date(value);
            }
            if (!date) {
                return value;
            }
            let /** @type {?} */ o = {
                "M+": date.getMonth() + 1,
                //月份
                "d+": date.getDate(),
                //日
                "h+": date.getHours(),
                //小时
                "m+": date.getMinutes(),
                //分
                "s+": date.getSeconds(),
                //秒
                "q+": Math.floor((date.getMonth() + 3) / 3),
                //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (!fmt) {
                fmt = this.format;
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var /** @type {?} */ k in o)
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            return fmt;
        }
        else {
            return value;
        }
    }
}
DatePipe.decorators = [
    { type: Pipe, args: [{ name: 'date' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateFormatModule {
}
DateFormatModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    DatePipe
                ],
                providers: [],
                exports: [
                    DatePipe
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NullReplacePipe {
    constructor() {
        this.fmt = '--';
    }
    /**
     * @param {?} value
     * @param {?} fmt
     * @return {?}
     */
    transform(value, fmt) {
        if (value === undefined || value === null || value === '') {
            let /** @type {?} */ result = fmt || this.fmt;
            return result;
        }
        else {
            return value;
        }
    }
}
NullReplacePipe.decorators = [
    { type: Pipe, args: [{ name: 'nullReplace' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NullReplaceModule {
}
NullReplaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NullReplacePipe
                ],
                providers: [],
                exports: [
                    NullReplacePipe
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Uploader {
    constructor() {
        this.isUploading = false;
        this.url = '';
        this.name = '';
        this.headers = {};
        this.method = 'post';
        this.uploadType = 0;
        this.queue = [];
        this.isPreview = true;
        this.isCompress = false;
        this.handlers = {
            select: [],
            queue: [],
            queueAll: [],
            //    remove: [],
            upload: [],
            progress: [],
            success: [],
            overSize: [],
            overLength: [],
            error: [],
            complete: []
        };
        this.customData = {}; //默认空对象
    }
    /**
     * 触发
     * @param {?} handler
     * @param {?=} params
     * @return {?}
     */
    trigger(handler, params) {
        let /** @type {?} */ handlers = this.handlers[handler];
        if (handlers) {
            for (let /** @type {?} */ fn of handlers) {
                if (params) {
                    fn.apply(this, params);
                }
                else {
                    fn.apply(this);
                }
            }
        }
    }
    /**
     * 上传
     * @return {?}
     */
    upload() {
        let /** @type {?} */ createData = (index) => {
            if (this.uploadType === 0) {
                let /** @type {?} */ uploadFile = this.queue[index];
                let /** @type {?} */ fd = new FormData();
                if (uploadFile.submitData && uploadFile.submitData instanceof Array) {
                    for (let /** @type {?} */ o of uploadFile.submitData) {
                        fd.append(o.name, o.value);
                    }
                }
                else {
                    fd.append(uploadFile.name || this.name, uploadFile.getFile(0));
                }
                return fd;
            }
            else if (this.uploadType === 1) {
            }
        };
        let /** @type {?} */ submit = (index, data) => {
            let /** @type {?} */ next = () => {
                index++;
                if (index < this.queue.length) {
                    submit(index, createData(index));
                }
                else {
                    this.isUploading = false;
                    this.trigger('complete', [this]);
                }
            };
            let /** @type {?} */ uploadFile = this.queue[index];
            if (uploadFile.uploaded) {
                next();
                return;
            }
            let /** @type {?} */ xhr = new XMLHttpRequest();
            uploadFile.xhr = xhr;
            xhr.open(this.method.toLowerCase(), this.url);
            for (let /** @type {?} */ o in this.headers) {
                //设置header
                xhr.setRequestHeader(o + '', this.headers[o + '']);
            }
            //侦查当前附件上传情况
            xhr.upload.onprogress = (evt) => {
                let /** @type {?} */ loaded = evt.loaded;
                let /** @type {?} */ total = evt.total;
                let /** @type {?} */ percent = Math.floor(100 * loaded / total); //已经上传的百分比
                uploadFile.progress = percent;
                this.trigger('progress', [percent, uploadFile, this, index]); //触发
            };
            xhr.onload = () => {
                uploadFile.uploaded = true;
                uploadFile.response = xhr.responseText;
                if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)) {
                    uploadFile.setError();
                    this.trigger('error', [uploadFile, this, index]); //触发
                }
                else {
                    this.trigger('success', [uploadFile, this, index]); //触发
                }
                next();
            };
            xhr.onerror = (evt) => {
                uploadFile.setError();
            };
            xhr.send(data);
        };
        this.trigger('upload', [this]); //触发
        this.isUploading = true;
        submit(0, createData(0));
    }
    /**
     * @param {?} src
     * @param {?} scale
     * @param {?} quality
     * @return {?}
     */
    compress(src, scale, quality) {
        return new Promise((resolve, reject) => {
            if (quality < 0 || quality > 1) {
                quality = 1;
            }
            var /** @type {?} */ localImg = new Image();
            localImg.src = src;
            localImg.onload = function (e) {
                var /** @type {?} */ that = localImg;
                // 默认按比例压缩
                var /** @type {?} */ comScale = parseFloat(scale + '');
                var /** @type {?} */ w = that.width * comScale, /** @type {?} */
                h = that.height * comScale;
                //生成canvas
                var /** @type {?} */ canvas = document.createElement('canvas');
                var /** @type {?} */ ctx = canvas.getContext('2d');
                // 创建属性节点
                var /** @type {?} */ anw = document.createAttribute("width");
                anw.nodeValue = w + '';
                var /** @type {?} */ anh = document.createAttribute("height");
                anh.nodeValue = h + '';
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                // quality值越小，所绘制出的图像越模糊
                var /** @type {?} */ base64 = canvas.toDataURL('image/jpeg', parseFloat(quality + ''));
                // 回调函数返回base64的值
                resolve(base64);
            };
            localImg.onerror = function () {
                reject(src);
            };
        });
    }
    /**
     * base64转换
     * @param {?} file
     * @return {?}
     */
    createBase64(file) {
        return new Promise((resolve, reject) => {
            let /** @type {?} */ reader = new FileReader();
            // 读取File对象的数据
            reader.readAsDataURL(file);
            // 绑定load事件
            reader.onload = function (e) {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(file);
            };
        });
    }
    /**
     * 获取base64数据的文件长度
     * @param {?} base64Str
     * @return {?} number
     */
    getBase64FileSize(base64Str) {
        let /** @type {?} */ splitStr = base64Str.split(',');
        let /** @type {?} */ str = splitStr[splitStr.length - 1].replace(/=/g, '');
        let /** @type {?} */ strLength = str.length;
        return Math.round(strLength - (strLength / 8) * 2);
    }
    /**
     * 获取base64数据的data
     * @param {?} base64Str
     * @return {?} number
     */
    getBase64FileData(base64Str) {
        let /** @type {?} */ splitStr = base64Str.split(',');
        return splitStr[splitStr.length - 1];
    }
    /**
     * 选中
     * @param {?} fn
     * @return {?}
     */
    onSelect(fn) {
        this.handlers.select.push(fn);
        return this;
    }
    /**
     * 超过大小
     * @param {?} fn
     * @return {?} Uploader
     */
    onOverSize(fn) {
        this.handlers.overSize.push(fn);
        return this;
    }
    /**
     * 超过数量
     * @param {?} fn
     * @return {?} Uploader
     */
    onOverLength(fn) {
        this.handlers.overLength.push(fn);
        return this;
    }
    /**
     * 单个文件入列
     * @param {?} fn
     * @return {?}
     */
    onQueue(fn) {
        this.handlers.queue.push(fn);
        return this;
    }
    /**
     * 全部文件入列
     * @param {?} fn
     * @return {?}
     */
    onQueueAll(fn) {
        this.handlers.queueAll.push(fn);
        return this;
    }
    /**
     * 上传
     * @param {?} fn
     * @return {?}
     */
    onUpload(fn) {
        this.handlers.upload.push(fn);
        return this;
    }
    /**
     * 上传中
     * @param {?} fn
     * @return {?}
     */
    onProgress(fn) {
        this.handlers.progress.push(fn);
        return this;
    }
    /**
     * 上传成功
     * @param {?} fn
     * @return {?}
     */
    onSuccess(fn) {
        this.handlers.success.push(fn);
        return this;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onComplete(fn) {
        this.handlers.complete.push(fn);
        return this;
    }
    /**
     * 上传失败
     * @param {?} fn
     * @return {?}
     */
    onError(fn) {
        this.handlers.error.push(fn);
        return this;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UploadFile {
    constructor() {
        this.compressed = false;
        this.progress = 0;
        this.uploaded = false;
        this.success = false;
        this.error = false;
        this.response = null;
        this.submitData = [];
        this.customData = {}; //默认空对象
    }
    /**
     * @return {?}
     */
    setSuccess() {
        this.success = true;
        this.error = false;
    }
    /**
     * @return {?}
     */
    setError() {
        this.success = false;
        this.error = true;
    }
    /**
     * 获取(要提交)的文件
     * @param {?=} type 0:Filed/Blob对象 1:Base64数据
     * @return {?}
     */
    getFile(type) {
        let /** @type {?} */ result;
        if (type === 1) {
            if (this.compressed) {
                result = this.compressedDataUrl;
            }
            else {
                result = this.dataUrl;
            }
        }
        else {
            //0和默认
            if (this.compressed) {
                result = this.createBlob(this.compressedDataUrl);
            }
            else {
                result = this.file;
            }
        }
        return result;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    addSubmitData(name, value) {
        if (!(this.submitData instanceof Array)) {
            this.submitData = [];
        }
        this.submitData.push({
            name: name,
            value: value
        });
    }
    /**
     * 创建Blob存储文件数据
     * @param {?} dataUrl
     * @return {?}
     */
    createBlob(dataUrl) {
        let /** @type {?} */ arr = dataUrl.split(',');
        let /** @type {?} */ mime = arr[0].match(/:(.*?);/)[1];
        let /** @type {?} */ bstr = atob(arr[1].replace(/\s/g, ''));
        let /** @type {?} */ n = bstr.length;
        let /** @type {?} */ u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime }); //值，类型
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UploaderDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.el.nativeElement.addEventListener('change', (event) => {
            let /** @type {?} */ ev = event || window.event;
            let /** @type {?} */ target = ev.target || ev.srcElement;
            let /** @type {?} */ files = target.files;
            this.uploader.trigger('select', [files]);
            this.queueFiles(files);
        });
    }
    /**
     * @param {?} uploadFile
     * @return {?}
     */
    queue(uploadFile) {
        this.uploader.queue.push(uploadFile);
        this.uploader.trigger('queue', [uploadFile]);
    }
    /**
     * @return {?}
     */
    triggerQueueAll() {
        this.uploader.trigger('queueAll', [this.uploader.queue]);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    queueFiles(files) {
        if (files.length > this.uploader.maxLength) {
            //超出长度
            this.uploader.trigger('overLength', [files.length, this.uploader.maxLength]);
            return;
        }
        let /** @type {?} */ fn = (index) => {
            let /** @type {?} */ file = files[index];
            let /** @type {?} */ uploadFile = new UploadFile();
            uploadFile.fileName = file.name;
            uploadFile.fileType = file.type;
            uploadFile.fileSize = file.size;
            uploadFile.file = file;
            let /** @type {?} */ fileNameSplit = file.name.split('.');
            uploadFile.fileExtension = ('.' + fileNameSplit[fileNameSplit.length - 1]).toLowerCase();
            let /** @type {?} */ check = () => {
                index++;
                if (index < files.length) {
                    fn(index);
                }
                else {
                    this.triggerQueueAll();
                }
            };
            //检测合法性
            if (this.uploader.maxSize && uploadFile.fileSize > this.uploader.maxSize) {
                //超过大小
                this.uploader.trigger('overSize', [uploadFile.fileSize, this.uploader.maxSize, uploadFile]);
                check();
                return;
            }
            else if (this.uploader.maxLength && this.uploader.queue.length >= this.uploader.maxLength) {
                //超过数量
                this.uploader.trigger('overLength', [files.length, this.uploader.maxLength]);
                this.triggerQueueAll();
                return;
            }
            if (this.uploader.isCompress) {
                //压缩
                if (uploadFile.fileType.indexOf('image/') >= 0) {
                    //图片
                    this.uploader.createBase64(file)
                        .then((data) => {
                        uploadFile.dataUrl = data;
                        let /** @type {?} */ scale = this.compressScale || 1, /** @type {?} */
                        quality = this.compressQuality || 0.7;
                        return this.uploader.compress(data, scale, quality);
                    })
                        .then((dataUrl) => {
                        uploadFile.compressed = true;
                        uploadFile.fileSize = this.uploader.getBase64FileSize(dataUrl);
                        uploadFile.compressedDataUrl = dataUrl;
                        //queue
                        this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    /*this.uploader.createBase64(file)
                                .then((data)=> {
                                  uploadFile.dataUrl = data;
                                  this.queue(uploadFile);
                                  check();
                                });*/
                    //queue
                    this.queue(uploadFile);
                    check();
                }
            }
            else {
                //不压缩
                if (this.uploader.uploadType === 1 || this.uploader.isPreview) {
                    this.uploader.createBase64(file)
                        .then((data) => {
                        uploadFile.fileSize = this.uploader.getBase64FileSize(data);
                        uploadFile.dataUrl = data;
                        //queue
                        this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    this.queue(uploadFile);
                    check();
                }
            }
        };
        fn(0);
    }
}
UploaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uploader]'
            },] },
];
/** @nocollapse */
UploaderDirective.ctorParameters = () => [
    { type: ElementRef, },
];
UploaderDirective.propDecorators = {
    "uploader": [{ type: Input },],
    "compressScale": [{ type: Input },],
    "compressQuality": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UploaderModule {
}
UploaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    UploaderDirective
                ],
                providers: [],
                exports: [
                    UploaderDirective,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormsModule$1 {
}
FormsModule$1.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CheckboxModule,
                    RadioModule,
                    ToggleModule,
                    ValidateModule
                ],
                declarations: [],
                providers: [],
                exports: [
                    CheckboxModule,
                    RadioModule,
                    ToggleModule,
                    ValidateModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CommonModule$1 {
}
CommonModule$1.decorators = [
    { type: NgModule, args: [{
                imports: [
                    QBtnGroupModule,
                    BtnBackModule,
                    TextMaxLengthModule,
                    ToggleClassModule
                ],
                declarations: [],
                providers: [],
                exports: [
                    QBtnGroupModule,
                    BtnBackModule,
                    TextMaxLengthModule,
                    ToggleClassModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class PopupService {
    constructor() {
        this.animated = true;
        this.eventList = [];
    }
    /**
     * 初始化
     * @return {?}
     */
    init() {
        this.removePop();
        this.clearEvents();
        this.type = 'info';
        this.title = '提示';
        this.text = '';
        this.confirmButtonText = '确定';
        this.cancelButtonText = '取消';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        this.confirmButtonType = 'info';
        this.textAlign = 'center';
        this.cancelButtonType = 'default';
        this.closeOnConfirm = true;
        this.closeOnCancel = true;
        this.showLoaderOnConfirm = false;
        this.showLoaderOnCancel = false;
        this.confirmLoaderText = this.confirmButtonText;
        this.cancelLoaderText = this.cancelButtonText;
        this.confirmed = false;
        this.canceled = false;
        this.confirmHandlers = [];
        this.cancelHandlers = [];
        this.closeHandlers = [];
        this.confirmButton = null;
        this.cancelButton = null;
        this.closeButton = null;
        this.popWrap = null;
    }
    /**
     * 显示
     * @return {?}
     */
    show() {
        //蒙层
        this.popWrap = document.createElement('DIV');
        this.popWrap.className = 'pop-wrap' + ' ' + this.type;
        document.body.appendChild(this.popWrap);
        //内容块
        let /** @type {?} */ pop = document.createElement('DIV');
        pop.className = 'pop-main';
        //pop头部
        let /** @type {?} */ popHeader = document.createElement('DIV');
        popHeader.className = 'pop-header';
        popHeader.innerHTML = '<div class="alert-title">' + this.title + '</div>';
        //pop关闭按钮
        this.closeButton = document.createElement('span');
        this.closeButton.className = 'pop-btn-close';
        this.closeButton.innerHTML = '×';
        this.addEvent(this.closeButton, 'click', () => {
            this.close();
            for (let /** @type {?} */ handler of this.closeHandlers) {
                handler.apply(this);
            }
        });
        popHeader.appendChild(this.closeButton);
        pop.appendChild(popHeader);
        //pop body
        let /** @type {?} */ popBody = document.createElement('DIV');
        popBody.className = 'pop-body';
        if (this.textAlign === 'center') {
            popBody.className = 'pop-body pop-body-txt-center';
        }
        //icon
        let /** @type {?} */ popIcon = document.createElement('DIV');
        popIcon.className = 'pop-icon';
        //text
        let /** @type {?} */ iconHTML = (this.iconClass !== undefined && this.iconClass !== '') ? '<i class="' + this.iconClass + '"></i>' : '';
        let /** @type {?} */ popText = document.createElement('DIV');
        popText.className = 'pop-text';
        popText.innerHTML = iconHTML + this.text;
        popBody.appendChild(popText);
        pop.appendChild(popBody);
        // pop footer
        let /** @type {?} */ popFooter = document.createElement('DIV');
        popFooter.className = 'pop-footer';
        // let dottingHTML='<i class="dotting"></i>';//loader
        let /** @type {?} */ dottingHTML = '...'; //loader
        if (this.showConfirmButton) {
            //确定按钮
            let /** @type {?} */ btnConfirm = document.createElement('BUTTON');
            let /** @type {?} */ btnConfirmClassList = ['btn', 'btn-' + this.confirmButtonType];
            btnConfirm.className = btnConfirmClassList.join(' ');
            btnConfirm.innerHTML = this.confirmButtonText;
            popFooter.appendChild(btnConfirm);
            this.confirmButton = btnConfirm;
            this.addEvent(btnConfirm, 'click', () => {
                if (this.confirmed || this.canceled) {
                    this.close();
                    return;
                }
                if (this.closeOnConfirm) {
                    this.close();
                }
                else if (this.showLoaderOnConfirm) {
                    btnConfirmClassList.push('disabled');
                    btnConfirm.className = btnConfirmClassList.join(' ');
                    btnConfirm.innerHTML = this.confirmLoaderText + dottingHTML;
                }
                for (let /** @type {?} */ handler of this.confirmHandlers) {
                    handler.apply(this);
                }
                this.confirmed = true;
            });
        }
        if (this.showCancelButton) {
            //取消按钮
            let /** @type {?} */ btnCancel = document.createElement('BUTTON');
            let /** @type {?} */ btnCancelClassList = ['btn', 'btn-' + this.cancelButtonType];
            btnCancel.className = btnCancelClassList.join(' ');
            btnCancel.innerHTML = this.cancelButtonText;
            popFooter.appendChild(btnCancel);
            this.addEvent(btnCancel, 'click', () => {
                if (this.canceled || this.confirmed) {
                    this.close();
                    return;
                }
                if (this.closeOnCancel) {
                    this.close();
                }
                else if (this.showLoaderOnCancel) {
                    btnCancelClassList.push('disabled');
                    btnCancel.className = btnCancelClassList.join(' ');
                    btnCancel.innerHTML = this.cancelLoaderText + dottingHTML;
                }
                for (let /** @type {?} */ handler of this.cancelHandlers) {
                    handler.apply(this);
                }
                this.canceled = true;
            });
            this.cancelButton = btnCancel;
        }
        pop.appendChild(popFooter);
        this.popWrap.appendChild(pop);
        if (this.animated) {
            setTimeout(() => {
                this.popWrap.className = this.popWrap.className + ' animate';
                setTimeout(() => {
                    this.popWrap.className = this.popWrap.className + ' ready';
                }, 10);
            }, 10);
        }
        else {
            this.popWrap.className = this.popWrap.className + ' ready';
        }
    }
    /**
     * 关闭
     * @return {?}
     */
    close() {
        this.removePop();
    }
    /**
     * 移除
     * @return {?}
     */
    removePop() {
        if (this.popWrap !== null && this.popWrap !== undefined) {
            try {
                document.body.removeChild(this.popWrap);
            }
            catch (/** @type {?} */ err) {
                //ignore
            }
        }
    }
    /**
     * 设置参数
     * @param {?} opt
     * @return {?}
     */
    setOptions(opt) {
        for (let /** @type {?} */ prop in opt) {
            this[prop] = opt[prop];
        }
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    getArgs(arg) {
        let /** @type {?} */ strs = [], /** @type {?} */ opts = { text: '' };
        if (arguments.length) {
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = arguments.length; i < len; i++) {
                let /** @type {?} */ arg = arguments[i][0];
                if (typeof arg === 'string') {
                    strs.push(arg);
                }
                else if (arg && typeof arg === 'object') {
                    for (let /** @type {?} */ o in arg) {
                        opts[o + ''] = arg[o + ''];
                    }
                }
            }
        }
        if (strs.length > 0) {
            opts.text = strs[0];
        }
        if (strs.length > 1) {
            opts.title = strs[1];
        }
        return opts;
    }
    /**
     * 打开确认框
     * @param {?=} text
     * @param {?=} title
     * @param {?=} opt
     * @return {?} PopupService
     */
    confirm(text, title, opt) {
        this.init();
        this.type = 'confirm';
        this.showConfirmButton = true;
        this.showCancelButton = true;
        let /** @type {?} */ options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    }
    /**
     * 打开消息框
     * @param {?=} text
     * @param {?=} title
     * @param {?=} opt
     * @return {?} PopupService
     */
    info(text, title, opt) {
        this.init();
        this.type = 'info';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        let /** @type {?} */ options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    }
    /**
     * 打开错误消息框
     * @param {?=} text
     * @param {?=} title
     * @param {?=} opt
     * @return {?} PopupService
     */
    error(text, title, opt) {
        this.init();
        this.type = 'error';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        this.confirmButtonType = 'danger';
        this.title = '错误';
        let /** @type {?} */ options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    }
    /**
     * 添加确认处理
     * @param {?} handler 处理函数
     * @return {?}
     */
    onConfirm(handler) {
        this.confirmHandlers.push(handler);
        return this;
    }
    /**
     * 添加取消处理
     * @param {?} handler 处理函数
     * @return {?}
     */
    onCancel(handler) {
        this.cancelHandlers.push(handler);
        return this;
    }
    /**
     * 添加关闭处理
     * @param {?} handler 处理函数
     * @return {?}
     */
    onClose(handler) {
        this.closeHandlers.push(handler);
        return this;
    }
    /**
     * 清楚所有元素上绑定的事件
     * @return {?}
     */
    clearEvents() {
        try {
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = this.eventList.length; i < len; i++) {
                this.eventList[i].target.removeEventListener(this.eventList[i].event, this.eventList[i].handler);
            }
            this.eventList = [];
        }
        catch (/** @type {?} */ err) {
            console.log(err);
        }
    }
    /**
     * 给元素添加事件
     * @param {?} target 元素
     * @param {?} event 事件名
     * @param {?} handler 处理函数
     * @return {?}
     */
    addEvent(target, event, handler) {
        target.addEventListener(event, handler);
        this.eventList.push({ target: target, handler: handler, event: event });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopService extends PopupService {
    constructor() {
        super();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class Toaster {
    constructor() {
        this.toasters = [];
    }
    /**
     * 弹出
     * @param {?} options
     * @return {?}
     */
    pop(options) {
        let /** @type {?} */ delay = options.delay || 5000; //延迟关闭的时间
        let /** @type {?} */ animated = options.animated !== undefined ? options.animated : true; //是否加入动画
        if (this.container === null || this.container === undefined) {
            let /** @type {?} */ container = document.getElementById('toast-container');
            if (container === null) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-top-center';
                document.body.appendChild(container);
            }
            this.container = container;
        }
        let /** @type {?} */ toast = document.createElement('DIV');
        let /** @type {?} */ toastClass = ['toast', 'ng-leave', 'ng-leave-active'];
        let /** @type {?} */ type = 'info';
        if (options.type) {
            let /** @type {?} */ types = ['success', 'error', 'info', 'wait', 'warning'];
            if (types.indexOf(options.type) >= 0) {
                type = options.type;
            }
        }
        toastClass.push('toast-' + type);
        if (animated) {
            toastClass.push('ng-animate');
        }
        toast.className = toastClass.join(' ');
        let /** @type {?} */ closeBtn = document.createElement('BUTTON');
        closeBtn.className = 'toast-close-button';
        closeBtn.innerHTML = '×';
        let /** @type {?} */ message = document.createElement('div');
        message.innerHTML = `<div>` + options.message + `</div>`;
        toast.appendChild(closeBtn);
        if (options.title) {
            let /** @type {?} */ title = document.createElement('DIV');
            title.className = 'toast-title';
            title.innerHTML = options.title;
            toast.appendChild(title);
        }
        toast.appendChild(message);
        this.container.insertBefore(toast, this.container.firstChild);
        setTimeout(() => {
            let /** @type {?} */ classList = toast.className.split(/\s+/);
            let /** @type {?} */ clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex >= 0) {
                classList.splice(clsIndex, 1);
                toast.className = classList.join(' ');
            }
        });
        let /** @type {?} */ timer = this.delayCloseTimer(toast, delay);
        closeBtn.addEventListener('click', () => {
            this.container.removeChild(toast);
            toast = null;
        });
        toast.addEventListener('mouseover', () => {
            clearTimeout(timer);
            timer = null;
        });
        toast.addEventListener('mouseleave', () => {
            timer = this.delayCloseTimer(toast, delay);
        });
    }
    /**
     * @param {?} toast
     * @param {?} delay
     * @return {?}
     */
    delayCloseTimer(toast, delay) {
        return setTimeout(() => {
            let /** @type {?} */ classList = toast.className.split(/\s+/);
            let /** @type {?} */ clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex < 0) {
                classList.push('ng-leave-active');
                toast.className = classList.join(' ');
            }
            setTimeout(() => {
                this.container.removeChild(toast);
                toast = null;
            }, 1500);
        }, delay);
    }
    /**
     * 建立参数
     * @param {?} type
     * @param {?} args
     * @return {?} ToasterOptions
     */
    createOptions(type, args) {
        let /** @type {?} */ opt = {
            type: 'info',
            message: ''
        };
        if (['info', 'success', 'wait', 'warning', 'error'].indexOf(type) >= 0) {
            opt.type = type;
        }
        if (args) {
            if (args.length > 1) {
                opt.title = args[0];
                opt.message = args[1];
            }
            else if (args.length == 1) {
                opt.message = args[0];
            }
        }
        return opt;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    info(...args) {
        this.pop(this.createOptions('info', args));
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    success(...args) {
        this.pop(this.createOptions('success', args));
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    wait(...args) {
        this.pop(this.createOptions('wait', args));
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    warning(...args) {
        this.pop(this.createOptions('warning', args));
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    error(...args) {
        this.pop(this.createOptions('error', args));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * 可跟踪的路由
 */
class TracertService {
    /**
     * @param {?} router
     * @param {?} actRoute
     */
    constructor(router, actRoute) {
        this.router = router;
        this.actRoute = actRoute;
    }
    /**
     * 监听路由变化
     * @param {?} searchParams 搜索参数（只有初始化的参数能被监听到）
     * @param {?=} action 监听的回调
     * @return {?}
     */
    subscribe(searchParams, action) {
        this.searchParams = searchParams;
        this.actRoute.params.subscribe((params) => {
            let /** @type {?} */ url_params = params;
            for (let /** @type {?} */ key in this.searchParams) {
                if (typeof this.searchParams[key] === 'string' && url_params[key]) {
                    this.searchParams[key] = url_params[key] + '';
                }
                else if (typeof this.searchParams[key] === 'number' && url_params[key] !== undefined) {
                    this.searchParams[key] = parseFloat(url_params[key]);
                }
            }
            if (typeof action === 'function') {
                action();
            }
        });
    }
    /**
     * 导航
     * 将搜索参数写进url参数并跳转，使浏览器生成历史访问记录
     * @return {?}
     */
    navigate() {
        let /** @type {?} */ path = this.router.url.split(';')[0];
        let /** @type {?} */ searchParams = {};
        for (let /** @type {?} */ key in this.searchParams) {
            if (typeof this.searchParams[key] === 'string' && this.searchParams[key]) {
                searchParams[key] = this.searchParams[key];
            }
            else if (typeof this.searchParams[key] === 'number' && (this.searchParams[key] || this.searchParams[key] === 0)) {
                searchParams[key] = this.searchParams[key];
            }
        }
        this.router.navigate([path, searchParams]);
    }
}
TracertService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TracertService.ctorParameters = () => [
    { type: Router, },
    { type: ActivatedRoute, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//q-btn-group

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { QBtnGroupComponent, QBtnGroupModule, PaginatorComponent, PaginatorModule, GalleryComponent, GalleryModule, SpinnerComponent, LoaderModule, CheckboxComponent, CheckboxModule, RadioComponent, RadioModule, ToggleComponent, ToggleModule, SwitchComponent, SwitchModule, ModalBodyComponent, ModalHeaderComponent, ModalFooterComponent, ModalComponent, ModalModule, RootContainerComponent, AsideLeftComponent, HeaderComponent, HeaderLeftComponent, HeaderRightComponent, DeleteWrapComponent, LayoutModule, NavWrapComponent, NavItemComponent, SubNavItemComponent, ThirthNavItemComponent, NavModule, DatetimePickerComponent, DatetimePickerModule, DropDownComponent, DropDownModule, SlideDownComponent, SlideDownModule, SliderComponent, SliderModule, SelectComponent, SelectModule, AreaPickerDirective, AreaPickerModule, AreaPicker, ToggleClassDirective, ToggleClassModule, BtnBackDirective, BtnBackModule, TextMaxLengthDirective, TextMaxLengthModule, HTML5ValidateDirective, ValidateModule, CurrencyFormatDirective, CurrencyFormatPipe, CurrencyFormatModule, DatePipe, DateFormatModule, NullReplacePipe, NullReplaceModule, UploaderModule, Uploader, UploadFile, UploaderDirective, FormsModule$1 as FormsModule, CommonModule$1 as CommonModule, PopupService, PopService, Toaster, TracertService };
//# sourceMappingURL=dolphinng.js.map
