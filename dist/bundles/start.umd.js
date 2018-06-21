(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('rxjs/add/operator/mergeMap'), require('@angular/common'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define('start', ['exports', '@angular/core', '@angular/router', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap', '@angular/common', '@angular/forms'], factory) :
	(factory((global.start = {}),global.ng.core,global.ng.router,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.common,global.ng.forms));
}(this, (function (exports,core,router,filter,map,mergeMap,common,forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */









function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var QBtnGroupComponent = /** @class */ (function () {
    function QBtnGroupComponent() {
    }
    QBtnGroupComponent.prototype.goTop = function () {
        {
            if (document.documentElement) {
                document.documentElement.scrollTop = 0;
            }
            if (document.body) {
                document.body.scrollTop = 0;
            }
        }
    };
    QBtnGroupComponent.prototype.back = function () {
        history.back();
    };
    return QBtnGroupComponent;
}());
QBtnGroupComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'q-btn-group',
                template: "<div class=\"q-btn-group\">\n  <div class=\"q-btn\" (click)=\"goTop()\">\n    <i class=\"q-btn-icon fa fa-chevron-up\"></i>\n    <span class=\"q-btn-text\">\u56DE\u5230\u9876\u90E8</span>\n  </div>\n  <div class=\"q-btn\" (click)=\"back()\">\n    <i class=\"q-btn-icon fa fa-chevron-left\"></i>\n    <span class=\"q-btn-text\">\u8FD4\u56DE</span>\n  </div>\n</div>\n",
                styles: [".q-btn-group{position:fixed;width:50px;height:101px;right:0;bottom:50%;font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.q-btn{width:100%;height:50px;margin-bottom:1px;text-align:center;color:#fff;position:relative;overflow:hidden}.q-btn:last-child{border-bottom:none}.q-btn-icon{display:block;width:100%;height:100%;background-color:rgba(0,0,0,.4);line-height:50px;font-size:24px;position:absolute;left:0;top:0;-webkit-transition:top .3s;transition:top .3s;cursor:pointer}.q-btn-text{display:block;width:100%;height:100%;position:absolute;left:0;top:100%;padding:5px 10px;line-height:20px;cursor:pointer;-webkit-transition:top .3s;transition:top .3s;background-color:rgba(0,0,0,.5)}.q-btn:last-child .q-btn-text{line-height:36px}.q-btn-text:active{background-color:rgba(0,0,0,.6)}.q-btn:hover .q-btn-text{top:0}.q-btn:hover .q-btn-icon{top:-100%}"]
            },] },
];
QBtnGroupComponent.ctorParameters = function () { return []; };
var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent(elemRef) {
        this.elemRef = elemRef;
        this.count = 0;
        this.pageSize = 10;
        this.pageSizeChange = new core.EventEmitter();
        this.index = 0;
        this.indexChange = new core.EventEmitter();
        this.items = [];
        this.maximum = 5;
        this.changePageSizeAble = false;
        this.inputAble = false;
        this.ellipsis = true;
        this.pageSizeOptions = [10, 30, 50, 100];
        this.size = '';
        this.showTotal = false;
        this.onChangePage = new core.EventEmitter();
        this.onChangePageError = new core.EventEmitter();
    }
    PaginatorComponent.prototype.ngOnInit = function () {
        this.create();
        this.initPageSizeOptions();
    };
    PaginatorComponent.prototype.ngOnChanges = function (changes) {
        var countChg = changes['count'];
        var pageSizeChg = changes['pageSize'];
        if ((countChg && countChg.currentValue !== countChg.previousValue) || (pageSizeChg && pageSizeChg.currentValue !== pageSizeChg.previousValue)) {
            this.create();
        }
    };
    PaginatorComponent.prototype.create = function () {
        this.pageCount = Math.ceil(this.count / this.pageSize);
        var sIndex, eIndex;
        if (this.pageCount <= 0) {
            sIndex = 0;
            eIndex = 1;
        }
        else if (this.index > this.pageCount - 1) {
            this.index = this.pageCount - 1;
            this.indexChange.emit(this.index);
            eIndex = this.index + 1;
            sIndex = eIndex - this.maximum > 0 ? eIndex - this.maximum : 0;
        }
        else {
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
    };
    PaginatorComponent.prototype.initPageSizeOptions = function () {
        if (this.pageSizeOptions.indexOf(this.pageSize) < 0) {
            for (var i = 0, len = this.pageSizeOptions.length; i < len; i++) {
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
    };
    PaginatorComponent.prototype.createItems = function (start, end) {
        if (start < 0) {
            start = 0;
        }
        this.items = [];
        for (var i = start; i < end; i++) {
            this.items.push(i);
        }
    };
    PaginatorComponent.prototype.changePageSize = function (ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        var newSize = parseInt(target.value);
        this.pageSize = newSize;
        this.pageSizeChange.emit(newSize);
        this.create();
        this.onChangePage.emit(this.index);
    };
    PaginatorComponent.prototype.changePage = function (index) {
        if (index >= 0 && index < this.pageCount) {
            this.index = index;
            this.indexChange.emit(this.index);
            this.onChangePage.emit(this.index);
            if (this.items.indexOf(this.index) < 0) {
                var sIndex = void 0, eIndex = void 0;
                if (this.index < this.items[0]) {
                    var a = this.index - this.maximum + 1;
                    sIndex = (a > 0 ? a : 0);
                }
                else if (this.index > this.items[this.items.length - 1]) {
                    sIndex = this.index;
                    if (sIndex > this.pageCount - this.maximum) {
                        sIndex = this.pageCount - this.maximum;
                    }
                    if (sIndex < 0) {
                        sIndex = 0;
                    }
                }
                var b = this.pageCount - sIndex;
                eIndex = b > this.maximum ? sIndex + this.maximum : sIndex + b;
                this.createItems(sIndex, eIndex);
            }
        }
        else {
            var arg = (this.inputIndex !== undefined ? this.inputIndex : this.index);
            this.onChangePageError.emit(arg);
        }
    };
    PaginatorComponent.prototype.prev = function () {
        if (this.index > 0) {
            this.index--;
            this.changePage(this.index);
        }
    };
    PaginatorComponent.prototype.next = function () {
        if (this.index < this.pageCount - 1) {
            this.index++;
            this.changePage(this.index);
        }
    };
    PaginatorComponent.prototype.first = function () {
        if (this.index !== 0) {
            this.index = 0;
            this.changePage(this.index);
        }
    };
    PaginatorComponent.prototype.last = function () {
        if (this.index !== this.pageCount - 1) {
            this.index = this.pageCount - 1;
            this.changePage(this.index);
        }
    };
    return PaginatorComponent;
}());
PaginatorComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'paginator',
                template: "<div class=\"pagination-wrap{{styleClass?' '+styleClass:''}}\">\n    <div class=\"pagination-text\" *ngIf=\"showTotal\" [ngClass]=\"{'pagination-text-sm':size==='sm'}\">\n        \u5171<span>{{pageCount}}</span>\u9875\uFF0C<span>{{count}}</span>\u6761\u8BB0\u5F55\n    </div>\n    <div class=\"pagination-text\" *ngIf=\"changePageSizeAble\" [ngClass]=\"{'pagination-text-sm':size==='sm'}\">\n        \u6BCF\u9875\n        <select (change)=\"changePageSize($event)\" [value]=\"pageSize\">\n      <option [value]=\"opt\" *ngFor=\"let opt of pageSizeOptions\">{{opt}}</option>\n    </select> \u6761\n    </div>\n    <ul class=\"pagination\" [ngClass]=\"{'pagination-sm':size==='sm'}\">\n        <li [ngClass]=\"{'disabled':index===0}\" title=\"{{index===0?'\u5DF2\u7ECF\u662F\u7B2C\u4E00\u9875':'\u9996\u9875'}}\"><a (click)=\"first()\"><i class=\"fa-step-backward fa\"></i></a></li>\n        <li [ngClass]=\"{'disabled':index<=0}\" title=\"{{index<=0?'\u5DF2\u7ECF\u662F\u7B2C\u4E00\u9875':'\u4E0A\u4E00\u9875'}}\"><a (click)=\"prev()\"><i class=\"fa-angle-left fa\"></i></a></li>\n        <li (click)=\"changePage(items[0]-1)\" *ngIf=\"items[0]>0&&ellipsis\"><a>...</a></li>\n        <li [ngClass]=\"{'active':index===item}\" *ngFor=\"let item of items\" (click)=\"changePage(item)\"><a>{{item+1}}</a></li>\n        <li (click)=\"changePage(items[items.length-1]+1)\" *ngIf=\"items[items.length-1]<pageCount-1&&ellipsis  \"><a>...</a></li>\n        <li [ngClass]=\"{'disabled':index>=pageCount-1}\" title=\"{{index>=pageCount-1?'\u5DF2\u7ECF\u662F\u7B2C\u6700\u540E\u4E00\u9875':'\u4E0B\u4E00\u9875'}}\"><a (click)=\"next()\"><i class=\"fa-angle-right fa\"></i></a></li>\n        <li [ngClass]=\"{'disabled':index>=pageCount-1}\" title=\"{{index>=pageCount-1?'\u5DF2\u7ECF\u662F\u7B2C\u6700\u540E\u4E00\u9875':'\u6700\u540E\u4E00\u9875'}}\"><a (click)=\"last()\"><i class=\"fa-step-forward fa\"></i></a></li>\n    </ul>\n    <div class=\"pagination-input\" *ngIf=\"inputAble\">\n        <div class=\"input-group\" [ngClass]=\"{'input-group-sm':size==='sm'}\">\n            <input class=\"form-control\" placeholder=\"\u9875\u7801\" [(ngModel)]=\"inputIndex\" name=\"inputIndex\" />\n            <a class=\"input-group-addon\" (click)=\"changePage(inputIndex-1)\">GO</a>\n        </div>\n    </div>\n</div>",
                styles: ["ul.pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;float:left;margin:0}.pagination-text{float:left;line-height:34px;padding-right:10px}.pagination-text.pagination-text-sm{font-size:12px;line-height:29px}.pagination-wrap:after{content:'';display:block;clear:both}.pagination-input{float:left}.pagination-input a{color:#428bca}.pagination-input .input-group{width:105px}.pagination-input .input-group.input-group-sm{width:90px}.pagination-input .input-group .input-group-addon{background-color:#fff}.pagination-input .input-group .input-group-addon:hover{background-color:#edf1f2}.pagination-text select{padding:4px 6px;border:1px solid #ddd}.pagination-text.pagination-text-sm select{padding:4px}.pagination-text span{color:#ff6700}.pagination>li:first-child>a,.pagination>li:first-child>span{border-top-left-radius:0;border-bottom-left-radius:0}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon{border-radius:0}.input-group-sm>.form-control{height:29px;border-radius:0}.input-group-sm .input-group-addon{height:29px;padding:4px 10px}.pagination-input .form-control{min-width:0}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{background-color:#09c}"]
            },] },
];
PaginatorComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
PaginatorComponent.propDecorators = {
    "count": [{ type: core.Input },],
    "pageSize": [{ type: core.Input },],
    "pageSizeChange": [{ type: core.Output },],
    "index": [{ type: core.Input },],
    "indexChange": [{ type: core.Output },],
    "maximum": [{ type: core.Input },],
    "changePageSizeAble": [{ type: core.Input },],
    "inputAble": [{ type: core.Input },],
    "ellipsis": [{ type: core.Input },],
    "pageSizeOptions": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "showTotal": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
    "onChangePage": [{ type: core.Output },],
    "onChangePageError": [{ type: core.Output },],
};
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(eleRef) {
        var _this = this;
        this.eleRef = eleRef;
        this.data = [];
        this.dataProps = [];
        this.change = new core.EventEmitter();
        this.title = '';
        this.isFullScreen = false;
        this.images = [];
        this.render = false;
        this.visible = false;
        this.ready = false;
        this.left = 0;
        this.top = 0;
        this.tempLeft = 0;
        this.tempTop = 0;
        this.thumbScrollWidth = 0;
        this.transitionTime = 300;
        this.activeIndex = 0;
        this.isThumbOverflow = false;
        this.isEventSource = false;
        this.isShowTools = false;
        this.isSupportCssObjectFit = false;
        this.tween = {
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
        this.resizeHandler = function () {
            clearTimeout(_this.resizeCheckTimer);
            _this.resizeCheckTimer = setTimeout(function () {
                _this.checkIsThumbOverflow();
            }, 300);
        };
        this.windowClickHandler = function () {
            if (_this.size) {
                _this.close();
            }
        };
        this.keydownHandler = function (ev) {
            var kc = ev.keyCode;
            if (kc === 37 || kc === 38) {
                _this.prev();
            }
            else if (kc === 39 || kc === 40) {
                _this.next();
            }
        };
    }
    GalleryComponent.prototype.removeEvents = function () {
        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('click', this.windowClickHandler);
        window.removeEventListener('keydown', this.keydownHandler);
    };
    GalleryComponent.prototype.ngOnInit = function () {
        var elem = document.createElement('IMG');
        if (elem.style['objectFit'] !== undefined) {
            this.isSupportCssObjectFit = true;
        }
        elem = null;
    };
    GalleryComponent.prototype.ngOnDestroy = function () {
        this.removeEvents();
    };
    GalleryComponent.prototype.checkIsThumbOverflow = function () {
        var _this = this;
        var elem = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
        var check = function () {
            if (_this.images.length > 1) {
                if (elem && elem['offsetWidth'] > 0) {
                    _this.isThumbOverflow = elem && (elem.scrollWidth > elem.clientWidth);
                    if (_this.isThumbOverflow) {
                        var galleryThumbScroll = _this.eleRef.nativeElement.querySelector('.gallery-thumb-scroll');
                        var thumbSliders = galleryThumbScroll.querySelectorAll('.gallery-thumb-slider');
                        if (thumbSliders.length > 0) {
                            _this.thumbScrollWidth = thumbSliders[0]['offsetWidth'] * thumbSliders.length;
                            if (_this.thumbScrollWidth < elem.scrollWidth) {
                                _this.isThumbOverflow = false;
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
    };
    GalleryComponent.prototype.initImages = function (data, props) {
        this.images = [];
        if (data.length > 0) {
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var o = data_1_1.value;
                    if (props.length > 0) {
                        this.images.push(this.getValueByProps(o, props));
                    }
                    else {
                        this.images.push(o);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _a;
    };
    GalleryComponent.prototype.slideThumbAfterChange = function (direction) {
        var _this = this;
        clearTimeout(this.thumbSlideTimer);
        this.thumbSlideTimer = setTimeout(function () {
            var sliderWrap = _this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
            var perW = _this.eleRef.nativeElement.querySelector('.gallery-thumb-slider').offsetWidth;
            var scrollL = sliderWrap.scrollLeft;
            var sliderW = sliderWrap.clientWidth;
            if (direction === 0) {
                var refValue = (_this.activeIndex) * perW;
                if (scrollL > refValue) {
                    _this.slide(sliderWrap, refValue - scrollL);
                }
            }
            else if (direction === 1) {
                var validScrollLeft = perW * (_this.activeIndex + 1) - sliderW;
                if (validScrollLeft > scrollL) {
                    _this.slide(sliderWrap, validScrollLeft - scrollL);
                }
            }
        });
    };
    GalleryComponent.prototype.slideThumb = function (elem, direction) {
        var val = 0;
        var thumbItem = elem.querySelector('.gallery-thumb-slider');
        var thumbItemWidth = thumbItem['offsetWidth'];
        if (direction == 0) {
            val = -elem.clientWidth;
        }
        else {
            val = Math.floor(elem.clientWidth / thumbItemWidth) * thumbItemWidth;
        }
        var canScrollVal = elem.scrollWidth - elem.scrollLeft;
        if (val > canScrollVal) {
            val = Math.floor((canScrollVal) / thumbItemWidth) * thumbItemWidth;
        }
        this.slide(elem, val);
    };
    GalleryComponent.prototype.slide = function (elem, val) {
        var scrollLen = val;
        {
            var fps = 60;
            var run_time = 300;
            var t_o = 1000 / fps;
            var t = 0;
            var b = elem.scrollLeft;
            var c = scrollLen;
            var d = run_time / t_o;
            var animate = this.tween.easeInOut;
        }
        var timer = setInterval(function () {
            var newVal = Math.ceil(animate(t, b, c, d));
            elem.scrollLeft = newVal;
            if (t < d) {
                t++;
            }
            else {
                clearInterval(timer);
            }
        }, t_o);
    };
    GalleryComponent.prototype.getValueByProps = function (obj, pros) {
        var result = obj;
        try {
            for (var pros_1 = __values(pros), pros_1_1 = pros_1.next(); !pros_1_1.done; pros_1_1 = pros_1.next()) {
                var prop = pros_1_1.value;
                if (typeof result === 'object') {
                    result = result[prop];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pros_1_1 && !pros_1_1.done && (_a = pros_1.return)) _a.call(pros_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
        var e_2, _a;
    };
    GalleryComponent.prototype.open = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.render = true;
        this.isShowTools = true;
        this.isFullScreen = false;
        var dataIndex = 0;
        var ev;
        var paramStrArr = [];
        var imgSrc = '';
        if (args && args.length > 0) {
            for (var i in args) {
                if (args[i] instanceof MouseEvent) {
                    ev = args[i];
                }
                if (typeof args[i] === 'number') {
                    dataIndex = args[i];
                }
                if (args[i] instanceof Array) {
                    paramStrArr.push(args[i]);
                }
                if (typeof args[i] === 'string') {
                    if (!imgSrc) {
                        imgSrc = args[i];
                    }
                    else {
                        this.title = args[i];
                    }
                }
            }
        }
        var dataObj = this.data;
        var dataProps = this.dataProps;
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
        var maxIndex = dataObj.length - 1;
        this.activate(dataIndex > maxIndex ? maxIndex : dataIndex);
        if (ev) {
            this.isEventSource = true;
            var pos = this.getMousePosition(ev), scrollElem = document.documentElement || document.body, scrollLeft = scrollElem.scrollLeft, scrollTop = scrollElem.scrollTop;
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
        setTimeout(function () {
            _this.visible = true;
            _this.setPositionAccordingSize();
        });
        setTimeout(function () {
            _this.ready = true;
            _this.checkIsThumbOverflow();
        }, this.transitionTime);
        window.addEventListener('resize', this.resizeHandler);
        setTimeout(function () {
            window.addEventListener('click', _this.windowClickHandler);
        });
        setTimeout(function () {
            window.addEventListener('keydown', _this.keydownHandler);
        });
    };
    GalleryComponent.prototype.setPositionAccordingSize = function () {
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
    };
    GalleryComponent.prototype.close = function () {
        var _this = this;
        this.visible = false;
        if (this.isEventSource) {
            this.left = this.tempLeft;
            this.top = this.tempTop;
        }
        this.ready = false;
        setTimeout(function () {
            _this.render = false;
        }, this.transitionTime);
        this.removeEvents();
    };
    GalleryComponent.prototype.toggleFullScreen = function () {
        this.isFullScreen = !this.isFullScreen;
    };
    GalleryComponent.prototype.whiteSpaceClickAction = function () {
        if (!this.size) {
            this.close();
        }
    };
    GalleryComponent.prototype.wrapClickAction = function (ev) {
        if (this.size) {
            ev.stopPropagation();
        }
    };
    GalleryComponent.prototype.prev = function () {
        if (this.activeIndex > 0) {
            this.activate(this.activeIndex - 1);
        }
    };
    GalleryComponent.prototype.next = function () {
        if (this.activeIndex < this.images.length - 1) {
            this.activate(this.activeIndex + 1);
        }
    };
    GalleryComponent.prototype.activate = function (index) {
        this.activeIndex = index;
        this.change.emit(this.activeIndex);
    };
    GalleryComponent.prototype.getMousePosition = function (e) {
        var m_x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
                || document.body.scrollLeft));
        var m_y = e.pageY || (e.clientY +
            (document.documentElement.scrollTop
                || document.body.scrollTop));
        return { left: m_x, top: m_y };
    };
    GalleryComponent.prototype.toggleShowTools = function (ev) {
        ev.stopPropagation();
        this.isShowTools = !this.isShowTools;
    };
    return GalleryComponent;
}());
GalleryComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'gallery',
                template: "<div class=\"gallery\" *ngIf=\"render\" (click)=\"wrapClickAction($event)\"\n     [ngClass]=\"{'open':visible,\n     'transitionAll':isEventSource||ready,\n     'lg':size=='lg',\n     'md':size=='md',\n     'sm':size=='sm',\n     'xs':size=='xs'\n     }\"\n     [style.left]=\"isFullScreen?0:left\"\n     [style.top]=\"isFullScreen?0:top\"\n     [style.width]=\"isFullScreen?'100%':null\"\n     [style.height]=\"isFullScreen?'100%':null\"\n>\n  <div *ngIf=\"size\" class=\"gallery-header\">\n    {{title}}\n    <a class=\"gallery-btn-full\" [ngClass]=\"{'resize':isFullScreen}\" (click)=\"toggleFullScreen()\">\n    </a>\n    <a class=\"gallery-btn-close\" (click)=\"close()\" >\u00D7</a>\n  </div>\n  <div class=\"gallery-sliders\" (click)=\"whiteSpaceClickAction()\">\n    <img *ngFor=\"let img of images;let i=index\" [src]=\"img\" [hidden]=\"!ready&&activeIndex!=i\"\n         [style.left.%]=\"activeIndex==i?0:(i-activeIndex)*200\" (click)=\"toggleShowTools($event)\"\n    />\n  </div>\n  <a class=\"gallery-close\" (click)=\"close()\" *ngIf=\"isShowTools&&!size\">\u00D7</a>\n  <a class=\"gallery-prev\" (click)=\"prev();slideThumbAfterChange(0)\" *ngIf=\"isShowTools&&images.length>1\">\u2039</a>\n  <a class=\"gallery-next\" (click)=\"next();slideThumbAfterChange(1)\" *ngIf=\"isShowTools&&images.length>1\">\u203A</a>\n  <div class=\"gallery-thumb\" *ngIf=\"isShowTools&&images.length>1\" [ngClass]=\"{'gallery-thumb-overflow':isThumbOverflow}\">\n    <div class=\"gallery-thumb-back\" (click)=\"slideThumb(galleryThumbSliders,0)\" ></div>\n    <div class=\"gallery-thumb-sliders\" #galleryThumbSliders>\n      <div class=\"gallery-thumb-scroll\" [style.width]=\"isThumbOverflow?thumbScrollWidth+'px':'auto'\">\n\n        <a class=\"gallery-thumb-slider\" *ngFor=\"let img of images;let i=index\"\n         [ngClass]=\"{'active':i==activeIndex}\" (click)=\"activate(i)\">\n          <img  [src]=\"img\" [ngClass]=\"{'cover':isSupportCssObjectFit}\"  />\n        </a>\n      </div>\n    </div>\n    <div class=\"gallery-thumb-forward\"  (click)=\"slideThumb(galleryThumbSliders,1)\"></div>\n  </div>\n</div>\n",
                styles: [".gallery{opacity:0;position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,.75);z-index:99999;-webkit-transition:opacity .3s ease-in-out;transition:opacity .3s ease-in-out;-webkit-transform:translate3d(0,0,0)}.gallery.open,.gallery.open.transitionAll{width:100%;height:100%;opacity:1}.gallery.transitionAll{width:0;height:0;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.gallery,.gallery *{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.gallery-sliders{position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,.75);text-align:center}.gallery-sliders img{max-width:100%;max-height:100%;position:absolute;top:0;right:0;bottom:0;margin:auto;-webkit-transition:left .5s;transition:left .5s;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0)}.gallery-btn-full span{display:block}.gallery .gallery-next,.gallery .gallery-prev{-webkit-box-sizing:content-box;box-sizing:content-box}.gallery-next,.gallery-prev{position:absolute;top:50%;left:15px;width:40px;height:40px;margin-top:-23px;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:60px;font-weight:100;line-height:30px;color:#fff;text-decoration:none;text-shadow:0 0 2px #000;text-align:center;background:rgba(0,0,0,.5);-webkit-box-sizing:content-box;box-sizing:content-box;border:3px solid #fff;border-radius:23px;opacity:.5;cursor:pointer}.gallery-next{left:auto;right:15px}.gallery-next:hover,.gallery-prev:hover{color:#fff;opacity:1}.gallery-thumb{position:absolute;bottom:20px;width:100%;height:40px}.gallery-thumb img{max-width:100%;max-height:100%;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto}.gallery-thumb img.cover{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.gallery-thumb-sliders{width:50%;height:40px;margin:0 auto;text-align:center;overflow:hidden;white-space:nowrap}.gallery-thumb-scroll{width:100%;height:100%}.gallery-thumb-slider{position:relative;display:inline-block;width:40px;height:40px;border:2px solid transparent;cursor:pointer}.gallery-thumb-slider:hover{border-color:#ddd}.gallery-thumb-slider.active,.gallery-thumb-slider.active:hover{border-color:#ff8d00}.gallery-thumb-back,.gallery-thumb-forward{width:20px;height:40px;background-color:#080808;position:absolute;top:0;cursor:pointer;opacity:.5;display:none}.gallery-thumb-back:hover,.gallery-thumb-forward:hover{opacity:1}.gallery-thumb-back{left:25%;margin-left:-24px}.gallery-thumb-forward{left:75%;margin-left:4px}.gallery-thumb-back:after{content:'';display:block;width:0;height:0;border:6px solid transparent;border-right-color:#999;position:absolute;left:0;top:14px}.gallery-thumb-forward:after{content:'';display:block;width:0;height:0;border:6px solid transparent;border-left-color:#999;position:absolute;left:8px;top:14px}.gallery-thumb-overflow .gallery-thumb-back,.gallery-thumb-overflow .gallery-thumb-forward{display:block}.gallery-thumb-overflow .gallery-thumb-slider{display:block;float:left}.gallery.lg,.gallery.md,.gallery.sm,.gallery.xs{background-color:transparent;border:1px solid #ddd}.gallery.lg.transitionAll,.gallery.md.transitionAll,.gallery.sm.transitionAll,.gallery.xs.transitionAll{width:0;height:0}.gallery.lg .gallery-sliders,.gallery.md .gallery-sliders,.gallery.sm .gallery-sliders,.gallery.xs .gallery-sliders{top:32px}.gallery.lg .gallery-header,.gallery.md .gallery-header,.gallery.sm .gallery-header,.gallery.xs .gallery-header{display:block;position:absolute;width:100%;height:32px;line-height:32px;padding-left:15px;padding-right:32px;background-color:#fafafa}.gallery.lg .gallery-header .gallery-btn-close,.gallery.lg .gallery-header .gallery-btn-full,.gallery.md .gallery-header .gallery-btn-close,.gallery.md .gallery-header .gallery-btn-full,.gallery.sm .gallery-header .gallery-btn-close,.gallery.sm .gallery-header .gallery-btn-full,.gallery.xs .gallery-header .gallery-btn-close,.gallery.xs .gallery-header .gallery-btn-full{display:block;position:absolute;left:100%;top:0;text-align:center;cursor:pointer;opacity:.5;width:32px;height:32px;font-size:24px;line-height:1.2;color:#000;font-weight:400}.gallery.lg .gallery-header .gallery-btn-close:hover,.gallery.lg .gallery-header .gallery-btn-full:hover,.gallery.md .gallery-header .gallery-btn-close:hover,.gallery.md .gallery-header .gallery-btn-full:hover,.gallery.sm .gallery-header .gallery-btn-close:hover,.gallery.sm .gallery-header .gallery-btn-full:hover,.gallery.xs .gallery-header .gallery-btn-close:hover,.gallery.xs .gallery-header .gallery-btn-full:hover{opacity:1;background-color:#f0f0f0}.gallery.lg .gallery-header .gallery-btn-close:active,.gallery.lg .gallery-header .gallery-btn-full:active,.gallery.md .gallery-header .gallery-btn-close:active,.gallery.md .gallery-header .gallery-btn-full:active,.gallery.sm .gallery-header .gallery-btn-close:active,.gallery.sm .gallery-header .gallery-btn-full:active,.gallery.xs .gallery-header .gallery-btn-close:active,.gallery.xs .gallery-header .gallery-btn-full:active{background-color:#eee}.gallery.lg .gallery-header .gallery-btn-full:after,.gallery.md .gallery-header .gallery-btn-full:after,.gallery.sm .gallery-header .gallery-btn-full:after,.gallery.xs .gallery-header .gallery-btn-full:after{content:'';display:block;position:absolute;left:30%;top:30%;width:40%;height:40%;border:1px solid #000}.gallery.lg .gallery-header .gallery-btn-full:after.resize,.gallery.md .gallery-header .gallery-btn-full:after.resize,.gallery.sm .gallery-header .gallery-btn-full:after.resize,.gallery.xs .gallery-header .gallery-btn-full:after.resize{background-color:#fafafa}.gallery.lg .gallery-header .gallery-btn-full.resize:before,.gallery.md .gallery-header .gallery-btn-full.resize:before,.gallery.sm .gallery-header .gallery-btn-full.resize:before,.gallery.xs .gallery-header .gallery-btn-full.resize:before{content:'';display:block;position:absolute;left:40%;top:20%;width:40%;height:40%;border:1px solid #000}.gallery.lg .gallery-header .gallery-btn-full.resize:after,.gallery.md .gallery-header .gallery-btn-full.resize:after,.gallery.sm .gallery-header .gallery-btn-full.resize:after,.gallery.xs .gallery-header .gallery-btn-full.resize:after{background-color:#fafafa}.gallery.lg .gallery-header .gallery-btn-close,.gallery.md .gallery-header .gallery-btn-close,.gallery.sm .gallery-header .gallery-btn-close,.gallery.xs .gallery-header .gallery-btn-close{margin-left:-32px}.gallery.lg .gallery-header .gallery-btn-full,.gallery.md .gallery-header .gallery-btn-full,.gallery.sm .gallery-header .gallery-btn-full,.gallery.xs .gallery-header .gallery-btn-full{margin-left:-64px}.gallery.lg,.gallery.lg.open{width:80%;height:80%}.gallery.md,.gallery.md.open{width:60%;height:60%}.gallery.sm,.gallery.sm.open{width:40%;height:40%}.gallery.xs,.gallery.xs.open{width:25%;height:25%}.gallery .gallery-close{display:block;width:50px;height:50px;text-align:center;line-height:50px;color:#fff;font-size:48px;position:absolute;right:0;top:0;cursor:pointer;opacity:.5}.gallery .gallery-close:hover{opacity:1}"]
            },] },
];
GalleryComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
GalleryComponent.propDecorators = {
    "data": [{ type: core.Input },],
    "dataProps": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "change": [{ type: core.Output },],
    "title": [{ type: core.Input },],
};
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent(elemRef) {
        this.elemRef = elemRef;
        this.isDark = false;
    }
    SpinnerComponent.prototype.ngOnInit = function () {
    };
    return SpinnerComponent;
}());
SpinnerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'spinner',
                template: "<div class=\"spinner\"\n     [ngClass]=\"{'spinner-xs':size==='xs','spinner-sm':size==='sm','spinner-lg':size==='lg',\n     'spinner-dark':isDark,\n     'spinner-three':type==='three','spinner-sixty':type==='sixty'}\">\n</div>\n",
                styles: [".spinner{display:inline-block;width:32px;height:32px;background-image:url(img/nine-lg.gif);background-size:100%;vertical-align:middle}.spinner.spinner-sixty{background-image:url(img/sixty-lg.gif)}.spinner.spinner-dark{background-image:url(img/nine-dark-lg.gif)}.spinner.spinner-sixty.spinner-dark{background-image:url(img/sixty-dark-lg.gif)}.spinner.spinner-xs{width:16px;height:16px}.spinner.spinner-sm{width:24px;height:24px}.spinner.spinner-lg{width:48px;height:48px}"]
            },] },
];
SpinnerComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
SpinnerComponent.propDecorators = {
    "type": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "isDark": [{ type: core.Input },],
};
var CheckboxComponent = /** @class */ (function () {
    function CheckboxComponent(elemRef) {
        this.elemRef = elemRef;
        this.value = false;
        this.valueChange = new core.EventEmitter();
    }
    CheckboxComponent.prototype.ngOnInit = function () {
    };
    CheckboxComponent.prototype.changeAction = function (ev) {
        this.valueChange.emit(this.value);
    };
    return CheckboxComponent;
}());
CheckboxComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'checkbox',
                template: "<div class=\"{{styleClass!=='none'?styleClass:''}} {{display==='block'?'checkbox':'checkbox-inline'}}\">\n  <label class=\"i-checks\"\n         [ngClass]=\"{'i-checks-sm':size==='sm','i-checks-lg':size==='lg'}\">\n    <input type=\"checkbox\"  [(ngModel)]=\"value\" [name]=\"name\" [disabled]=\"disabled\" (change)=\"changeAction($event)\" />\n    <i [ngClass]=\"{'inner-checked':innerStyle==='checked'}\"\n       [style.border-color]=\"value?customBackground&&innerStyle!=='checked'?customBackground:null:null\"\n       [style.background-color]=\"value?customBackground&&innerStyle==='checked'?customBackground:null:null\"\n       >\n      <span class=\"i-checks-inner\" [style.background-color]=\"value?customBackground&&innerStyle!=='checked'?customBackground:null:null\">\n\n      </span>\n    </i>\n    <ng-content></ng-content>\n  </label>\n</div>\n\n\n",
                styles: [".checkbox,.checkbox-inline{padding-right:15px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox]{position:relative;margin-top:0;margin-left:0;top:2px}.i-checks input+i:before{content:none}.i-checks input[disabled]:checked+i .i-checks-inner{background-color:#dee5e7}.i-checks input:checked+i .i-checks-inner{left:4px;top:4px;width:10px;height:10px;background-color:#23b7e5}.i-checks>i .i-checks-inner{content:\"\";position:absolute;left:50%;top:50%;width:0;height:0;background-color:transparent;-webkit-transition:all .2s;transition:all .2s}.i-checks input+i.inner-checked{-webkit-transition:all .3s;transition:all .3s}.i-checks input:checked+i.inner-checked{border-color:transparent;background-color:#186ba0}.i-checks input:checked+i.inner-checked .i-checks-inner{left:2px;top:3px;width:14px;height:8px;background-color:transparent;border-left:3px solid #fff;border-bottom:3px solid #fff;-webkit-transition:none;transition:none;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.i-checks.i-checks-sm input:checked+i.inner-checked .i-checks-inner{left:2px;top:2px;width:10px;height:6px;border-left:2px solid #fff;border-bottom:2px solid #fff}.i-checks.i-checks-lg input:checked+i.inner-checked .i-checks-inner{left:4px;top:6px;width:20px;height:10px;background-color:transparent;border-left:4px solid #fff;border-bottom:4px solid #fff}.i-checks-lg input:checked+i .i-checks-inner{left:8px;top:8px;width:12px;height:12px}.i-checks-sm input:checked+i .i-checks-inner{left:3px;top:3px;width:8px;height:8px}.i-checks>i{margin-left:-16px}"]
            },] },
];
CheckboxComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
CheckboxComponent.propDecorators = {
    "value": [{ type: core.Input },],
    "valueChange": [{ type: core.Output },],
    "size": [{ type: core.Input },],
    "display": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "innerStyle": [{ type: core.Input },],
    "customBackground": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
    "name": [{ type: core.Input },],
};
var RadioComponent = /** @class */ (function () {
    function RadioComponent(elemRef) {
        this.elemRef = elemRef;
        this.keyChange = new core.EventEmitter();
    }
    RadioComponent.prototype.ngOnInit = function () {
    };
    RadioComponent.prototype.toggleCheck = function (ev) {
        if (!this.disabled) {
            var target = ev.target || ev.srcElement;
            if (target.nodeName !== 'INPUT') {
                this.keyChange.emit(this.value);
            }
        }
    };
    RadioComponent.prototype.changeValue = function (ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            this.keyChange.emit(this.value);
        }
    };
    return RadioComponent;
}());
RadioComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'radio',
                template: "<div class=\" {{display==='block'?'radio':'radio-inline'}}\">\n  <label  class=\"{{styleClass!=='none'?styleClass:''}}\"\n    (click)=\"toggleCheck($event)\" [ngClass]=\"{'i-checks':this.styleClass!=='none','i-checks-sm':size==='sm','i-checks-lg':size==='lg'}\">\n    <input type=\"radio\"  [disabled]=\"disabled\" [checked]=\"key===value\" (click)=\"changeValue($event)\" [value]=\"value\"/>\n    <i [style.border-color]=\"key===value&&customBackground?customBackground:null\">\n      <span class=\"radio-inner\" [style.background-color]=\"(key===value&&customBackground)?customBackground:null\"></span>\n    </i>\n    <ng-content></ng-content>\n  </label>\n</div>\n",
                styles: [".radio,.radio-inline{padding-right:15px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.radio input[type=radio],.radio-inline input[type=radio]{position:relative;margin-top:0;margin-left:0;top:2px}.i-checks i:before{content:none}.i-checks input+i .radio-inner{position:absolute;left:50%;top:50%;width:0;height:0;background-color:transparent;-webkit-transition:all .3s;transition:all .3s}.i-checks input[disabled]:checked+i{border-color:#cfdadd!important}.i-checks input[disabled]:checked+i .radio-inner{background-color:#cfdadd!important}.i-checks input:checked+i .radio-inner{left:4px;top:4px;width:10px;height:10px;background-color:#23b7e5;border-radius:50%}.i-checks-sm input:checked+i .radio-inner{left:3px;top:3px;width:8px;height:8px}.i-checks-lg input:checked+i .radio-inner{left:8px;top:8px;width:12px;height:12px}label.i-checks{margin-bottom:0}"]
            },] },
];
RadioComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
RadioComponent.propDecorators = {
    "key": [{ type: core.Input },],
    "keyChange": [{ type: core.Output },],
    "value": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "display": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "customBackground": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
    "name": [{ type: core.Input },],
};
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent(elemRef) {
        this.elemRef = elemRef;
        this.valueChange = new core.EventEmitter();
        this.auto = true;
        this.action = new core.EventEmitter();
    }
    ToggleComponent.prototype.ngOnInit = function () {
    };
    ToggleComponent.prototype.toggleCheck = function (ev) {
        if (!this.disabled) {
            if (!this.auto) {
                this.action.emit(this.value);
            }
            else {
                var target = ev.target || ev.srcElement;
                if (target.nodeName !== 'INPUT') {
                    this.value = !this.value;
                    this.valueChange.emit(this.value);
                }
            }
        }
    };
    ToggleComponent.prototype.toggle = function (ev) {
        ev.stopPropagation();
        if (!this.disabled) {
            var target = ev.target || ev.srcElement;
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    };
    return ToggleComponent;
}());
ToggleComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'toggle',
                template: "<label  class=\"i-switch{{styleClass?' '+styleClass:''}}\"\n    (click)=\"toggleCheck($event)\"\n    [ngClass]=\"{'bg-info':type==='info'||!type,\n    'bg-primary':type==='primary',\n    'bg-success':type==='success',\n    'bg-danger':type==='danger',\n    'bg-warning':type==='warning',\n    'i-switch-sm':size==='sm',\n    'i-switch-lg':size==='lg'}\">\n    <i [ngClass]=\"{'checked':value}\"></i>\n    <span>\n          <ng-content></ng-content>\n    </span>\n</label>\n",
                styles: [".i-switch{vertical-align:middle}.i-switch input{cursor:pointer}.i-switch i:after{left:0}.i-switch i.checked:after{margin-left:16px}.i-switch i.checked:before{background-color:transparent}.i-switch.i-switch-lg i.checked:after{margin-left:22px}"]
            },] },
];
ToggleComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
ToggleComponent.propDecorators = {
    "value": [{ type: core.Input },],
    "valueChange": [{ type: core.Output },],
    "size": [{ type: core.Input },],
    "display": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "type": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
    "auto": [{ type: core.Input },],
    "action": [{ type: core.Output },],
    "name": [{ type: core.Input },],
};
var ModalBodyComponent = /** @class */ (function () {
    function ModalBodyComponent() {
        this.delayShow = false;
        this.isReady = false;
    }
    return ModalBodyComponent;
}());
ModalBodyComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'modal-body',
                template: "\n    <div class=\"modal-body{{styleClass?' '+styleClass:''}}\" #modalBody>\n        <ng-content *ngIf=\"isReady||!delayShow\"></ng-content>\n    </div>\n  "
            },] },
];
ModalBodyComponent.ctorParameters = function () { return []; };
ModalBodyComponent.propDecorators = {
    "styleClass": [{ type: core.Input },],
    "delayShow": [{ type: core.Input },],
    "modalBody": [{ type: core.ViewChild, args: ['modalBody',] },],
};
var ModalHeaderComponent = /** @class */ (function () {
    function ModalHeaderComponent() {
        this.showCloseButton = true;
    }
    return ModalHeaderComponent;
}());
ModalHeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'modal-header',
                template: "\n    <div class=\"modal-header{{styleClass?' '+styleClass:''}}\" [ngClass]=\"{'modal-header-reduce':showCloseButton}\">\n        <ng-content></ng-content>\n    </div>\n  ",
                styles: [".modal{display:block;position:fixed}.modal:before{content:'';display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);position:absolute;left:0;top:0}/deep/ .modal .modal:before{background-color:transparent}.modal-content{border-radius:2px}.modal-content.disabled:before{content:'';display:block;position:absolute;z-index:2;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.1);cursor:wait}.modal .modal-header{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.modal-header-reduce.modal-header{padding-right:48px;position:relative}.modal-btn-close{display:block;width:48px;height:48px;position:absolute;left:100%;top:0;margin-left:-48px;text-align:center;font-size:36px;opacity:.35;z-index:1;line-height:48px}.modal-btn-close:hover{opacity:.5}.modal-btn-close:active{opacity:.8}.modal ::-webkit-scrollbar{width:10px}.modal ::-webkit-scrollbar-track-piece{background:#f0f0f0}.modal ::-webkit-scrollbar-thumb{width:12px;background:rgba(125,125,125,.25)}.modal ::-webkit-scrollbar-thumb:hover{background:rgba(125,125,125,.5)}"]
            },] },
];
ModalHeaderComponent.propDecorators = {
    "showCloseButton": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
};
var ModalFooterComponent = /** @class */ (function () {
    function ModalFooterComponent() {
    }
    return ModalFooterComponent;
}());
ModalFooterComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'modal-footer',
                template: "\n    <div class=\"modal-footer{{styleClass?' '+styleClass:''}}\" >\n        <ng-content></ng-content>\n    </div>\n  "
            },] },
];
ModalFooterComponent.ctorParameters = function () { return []; };
ModalFooterComponent.propDecorators = {
    "styleClass": [{ type: core.Input },],
};
var ModalComponent = /** @class */ (function () {
    function ModalComponent(elemRef) {
        this.elemRef = elemRef;
        this.visibleChange = new core.EventEmitter();
        this.onOpen = new core.EventEmitter();
        this.onClose = new core.EventEmitter();
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
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.ngOnDestroy = function () {
        this.testAndResetBody();
    };
    ModalComponent.prototype.bgClickAction = function (ev) {
        var wouldClose = this.outClickClose;
        if (wouldClose) {
            var target = ev.target || ev.srcElement;
            if (target === this.modal.nativeElement) {
                this.close();
            }
        }
    };
    ModalComponent.prototype.open = function () {
        this.visible = true;
        this.visibleChange.emit(true);
        this.showModal();
    };
    ModalComponent.prototype.close = function () {
        this.visible = false;
        var promise = this.hideModal();
        this.visibleChange.emit(false);
        return promise;
    };
    ModalComponent.prototype.showModal = function () {
        var _this = this;
        this.isRender = true;
        var orgW = document.body.offsetWidth;
        this.addClass(document.body, 'modal-open');
        var curW = document.body.offsetWidth;
        if (curW > orgW) {
            document.body.style.paddingRight = (curW - orgW) + 'px';
        }
        this.initBodyStyle();
        setTimeout(function () {
            _this.isTransition = true;
            _this.isShow = true;
            _this.onOpen.emit(_this.visible);
            setTimeout(function () {
                _this.isReady = true;
                _this.modalBody.isReady = true;
            }, 300);
        });
    };
    ModalComponent.prototype.hideModal = function (callback) {
        var _this = this;
        this.testAndResetBody();
        this.isShow = false;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.isRender = false;
                if (typeof callback === 'function') {
                    callback();
                }
                _this.isTransition = false;
                resolve(_this.visible);
                _this.isReady = false;
                _this.modalBody.isReady = false;
                _this.onClose.emit(_this.visible);
            }, 500);
        });
    };
    ModalComponent.prototype.testAndResetBody = function () {
        var modals = document.querySelectorAll('.modal');
        if (modals && modals.length <= 1) {
            this.removeClass(document.body, 'modal-open');
            document.body.style.paddingRight = null;
        }
    };
    ModalComponent.prototype.ngOnChanges = function (changes) {
        var visibleChg = changes['visible'];
        if (visibleChg) {
            var isVisible = visibleChg.currentValue;
            var prevValue = visibleChg.previousValue;
            if (isVisible !== prevValue) {
                if (isVisible === true) {
                    this.showModal();
                }
                else if (isVisible === false && prevValue !== undefined) {
                    this.hideModal();
                }
            }
        }
    };
    ModalComponent.prototype.initBodyStyle = function () {
        var _this = this;
        var isOverflow = !!this.overflow;
        var isFullHeight = (this.fullHeight !== undefined && this.fullHeight !== false);
        if (isFullHeight || !isOverflow) {
            setTimeout(function () {
                var modalBody = _this.modalBody.modalBody.nativeElement;
                var maxHeight = document.documentElement.clientHeight - 183;
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
    };
    ModalComponent.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    ModalComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return ModalComponent;
}());
ModalComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'modal',
                template: "<div class=\"modal{{styleClass?' '+styleClass:''}}\" *ngIf=\"isRender\" [ngClass]=\"{'in':isShow,'fade':animated}\" (click)=\"bgClickAction($event)\" #modal [style.transition]=\"isTransition?'opacity .2s linear':'none'\">\n    <div class=\"modal-dialog{{this.size?' modal-'+this.size:''}}\" #modalDialog [style.transition]=\"isTransition?'transform .3s ease-out':'none'\" [style.width.px]=\"width\">\n        <div class=\"modal-content\" [class.disabled]=\"disabled\">\n            <a class=\"modal-btn-close\" *ngIf=\"showCloseButton\" (click)=\"close()\">\n                <span>&times;</span>\n            </a>\n            <ng-content></ng-content>\n            <ng-content select=\"modal-header\"></ng-content>\n            <ng-content select=\"modal-body\"></ng-content>\n            <ng-content select=\"modal-footer\"></ng-content>\n        </div>\n    </div>\n</div>",
                styles: [".modal{display:block;position:fixed}.modal:before{content:'';display:block;width:100%;height:100%;background-color:rgba(0,0,0,.5);position:absolute;left:0;top:0}/deep/ .modal .modal:before{background-color:transparent}.modal-content{border-radius:2px}.modal-content.disabled:before{content:'';display:block;position:absolute;z-index:2;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.1);cursor:wait}.modal .modal-header{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.modal-header-reduce.modal-header{padding-right:48px;position:relative}.modal-btn-close{display:block;width:48px;height:48px;position:absolute;left:100%;top:0;margin-left:-48px;text-align:center;font-size:36px;opacity:.35;z-index:1;line-height:48px}.modal-btn-close:hover{opacity:.5}.modal-btn-close:active{opacity:.8}.modal ::-webkit-scrollbar{width:10px}.modal ::-webkit-scrollbar-track-piece{background:#f0f0f0}.modal ::-webkit-scrollbar-thumb{width:12px;background:rgba(125,125,125,.25)}.modal ::-webkit-scrollbar-thumb:hover{background:rgba(125,125,125,.5)}"]
            },] },
];
ModalComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
ModalComponent.propDecorators = {
    "visible": [{ type: core.Input },],
    "visibleChange": [{ type: core.Output },],
    "onOpen": [{ type: core.Output },],
    "onClose": [{ type: core.Output },],
    "overflow": [{ type: core.Input },],
    "animated": [{ type: core.Input },],
    "size": [{ type: core.Input },],
    "styleClass": [{ type: core.Input },],
    "fullHeight": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "width": [{ type: core.Input },],
    "outClickClose": [{ type: core.Input },],
    "showCloseButton": [{ type: core.Input },],
    "modal": [{ type: core.ViewChild, args: ['modal',] },],
    "modalDialog": [{ type: core.ViewChild, args: ['modalDialog',] },],
    "modalHeader": [{ type: core.ContentChild, args: [ModalHeaderComponent,] },],
    "modalBody": [{ type: core.ContentChild, args: [ModalBodyComponent,] },],
};
var RootContainerComponent = /** @class */ (function () {
    function RootContainerComponent() {
    }
    return RootContainerComponent;
}());
RootContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'root-container',
                template: "<div class=\"app\"\n     [ngClass]=\"{'app-header-fixed':headerFixed,\n     'app-aside-fixed':asideFixed,\n     'app-aside-folded':asideFolded,\n     'app-aside-dock':asideDock,\n     'container':container,\n     'app-aside-slide':offScreen,\n     'off-screen':offScreen}\" >\n  <!--<div class=\"app  app-header-fixed app-aside-fixed app-aside-folded\">-->\n    <ng-content></ng-content>\n</div>\n\n\n",
                styles: [""]
            },] },
];
RootContainerComponent.ctorParameters = function () { return []; };
RootContainerComponent.propDecorators = {
    "headerFixed": [{ type: core.Input },],
    "asideFixed": [{ type: core.Input },],
    "asideFolded": [{ type: core.Input },],
    "asideDock": [{ type: core.Input },],
    "container": [{ type: core.Input },],
    "offScreen": [{ type: core.Input },],
};
var AsideLeftComponent = /** @class */ (function () {
    function AsideLeftComponent() {
        this.theme = '';
    }
    return AsideLeftComponent;
}());
AsideLeftComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'aside-left',
                template: "<div class=\"app-aside hidden-xs\"\n [ngClass]=\"{'bg-black':theme==='black',\n 'cerulean-outline':theme==='cerulean-outline',\n 'bg-white':theme==='white'\n }\">\n  <div class=\"aside-wrap\">\n    <ng-content></ng-content>\n  </div>\n</div>\n\n\n",
                styles: [".app-aside /deep/ .glyphicon{top:0}.cerulean-outline{color:#23b7e5}.cerulean-outline /deep/ .aside-wrap{background-color:#fff;-webkit-box-shadow:3px 0 5px #ddd;box-shadow:3px 0 5px #ddd}.cerulean-outline /deep/ .navi-wrap a{color:#23b7e5}.cerulean-outline /deep/ .text-muted{color:#23b7e5}.cerulean-outline /deep/ .thirth-nav-item.active,.cerulean-outline /deep/ .thirth-nav-item.active:hover,.cerulean-outline /deep/ li.active>a,.cerulean-outline /deep/ li.active>a:hover{background-color:#dee5eb;color:inherit}.cerulean-outline /deep/ li.exist-children.active>a,.cerulean-outline /deep/ li.has-child.active>a{background-color:transparent;color:inherit}.cerulean-outline /deep/ .thirth-nav-item:hover,.cerulean-outline /deep/ li>a:hover{background-color:#f0f0f0}.cerulean-outline /deep/ li.exist-children.active>a:hover,.cerulean-outline /deep/ li.has-child.active>a:hover{background-color:#f0f0f0}/deep/ .app-aside-folded .cerulean-outline .nav-sub{background-color:#fff;border:1px solid #ddd;border-left:none}/deep/ .app-aside-folded .cerulean-outline li.active>a>i{background-color:#23b7e5;color:#fff}/deep/ .app-aside-folded.off-screen .cerulean-outline li.active>a>i{background-color:transparent;color:inherit}"]
            },] },
];
AsideLeftComponent.ctorParameters = function () { return []; };
AsideLeftComponent.propDecorators = {
    "theme": [{ type: core.Input },],
};
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.theme = '';
    }
    return HeaderComponent;
}());
HeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'header',
                template: "<div class=\"app-header navbar\"\n[ngClass]=\"{'bg-black':theme==='black',\n           'bg-info':theme==='cerulean'\n           }\">\n  <ng-content></ng-content>\n</div>\n\n\n",
                styles: [".bg-info,.navbar-header.bg-info{background-color:#09c}.navbar-header.bg-info{border-right:1px solid #0091c2}"]
            },] },
];
HeaderComponent.ctorParameters = function () { return []; };
HeaderComponent.propDecorators = {
    "theme": [{ type: core.Input },],
};
var HeaderLeftComponent = /** @class */ (function () {
    function HeaderLeftComponent() {
        this.theme = '';
    }
    return HeaderLeftComponent;
}());
HeaderLeftComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'header-left',
                template: "\n    <div class=\"navbar-header\" \n[ngClass]=\"{'bg-black':theme==='black',\n           'bg-info':theme==='cerulean'\n           }\">\n        <ng-content></ng-content>\n    </div>\n  ",
                styles: [".bg-info,.navbar-header.bg-info{background-color:#09c}.navbar-header.bg-info{border-right:1px solid #0091c2}"]
            },] },
];
HeaderLeftComponent.ctorParameters = function () { return []; };
HeaderLeftComponent.propDecorators = {
    "theme": [{ type: core.Input },],
};
var HeaderRightComponent = /** @class */ (function () {
    function HeaderRightComponent() {
        this.theme = 'black';
        this.dropDown = false;
    }
    HeaderRightComponent.prototype.toggleDropDown = function () {
        this.dropDown = !this.dropDown;
    };
    return HeaderRightComponent;
}());
HeaderRightComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'header-right',
                template: "\n    <div class=\"collapse pos-rlt navbar-collapse box-shadow\" [ngClass]=\"{'show':dropDown,\n    'bg-black':theme==='black',\n     'bg-white-only':theme==='white'\n    }\">\n        <ng-content></ng-content>\n    </div>\n  "
            },] },
];
HeaderRightComponent.ctorParameters = function () { return []; };
HeaderRightComponent.propDecorators = {
    "theme": [{ type: core.Input },],
};
var DeleteWrapComponent = /** @class */ (function () {
    function DeleteWrapComponent() {
        this.size = 'md';
        this.remove = new core.EventEmitter();
    }
    DeleteWrapComponent.prototype.btnRemoveAction = function (event) {
        this.remove.emit(event);
    };
    return DeleteWrapComponent;
}());
DeleteWrapComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'delete-wrap',
                template: "<div class=\"delete-wrap {{'delete-wrap-'+size}}\">\n  <ng-content></ng-content>\n  <span class=\"delete-wrap-btn\" (click)=\"btnRemoveAction($event)\">\n      <i class=\"glyphicon glyphicon-remove\"></i>\n  </span>\n</div>\n",
                styles: [".delete-wrap{display:inline-block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.delete-wrap-btn{display:none;width:36px;height:36px;border-radius:50%;position:absolute;left:100%;top:-18px;margin-left:-18px;cursor:pointer;z-index:1;text-align:center;line-height:1.5;font-size:36px;color:#fff;background-color:#f05050}.delete-wrap-btn:active{background-color:#f02b2d}.delete-wrap:hover .delete-wrap-btn{display:block}.delete-wrap.delete-wrap-lg .delete-wrap-btn{width:48px;height:48px;top:-24px;margin-left:-24px;font-size:36px}.delete-wrap.delete-wrap-md .delete-wrap-btn{width:36px;height:36px;top:-18px;margin-left:-18px;line-height:1.66;font-size:24px}.delete-wrap.delete-wrap-sm .delete-wrap-btn{width:24px;height:24px;top:-12px;margin-left:-12px;font-size:18px}.delete-wrap.delete-wrap-xs .delete-wrap-btn{width:18px;height:18px;top:-9px;margin-left:-9px;font-size:12px;text-indent:-.5px}"]
            },] },
];
DeleteWrapComponent.ctorParameters = function () { return []; };
DeleteWrapComponent.propDecorators = {
    "size": [{ type: core.Input },],
    "remove": [{ type: core.Output },],
};
var NavWrapComponent = /** @class */ (function () {
    function NavWrapComponent(elemRef) {
        this.elemRef = elemRef;
        this.test = 'hellow';
    }
    NavWrapComponent.prototype.ngOnInit = function () {
        var elem = this.elemRef.nativeElement.querySelector('.navi');
    };
    return NavWrapComponent;
}());
NavWrapComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'nav-wrap',
                template: "<div class=\"navi-wrap\">\n  <nav class=\"navi\">\n    <ul class=\"nav\">\n      <ng-content></ng-content>\n    </ul>\n  </nav>\n</div>\n\n\n",
                styles: [""]
            },] },
];
NavWrapComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
var ThirthNavItemComponent = /** @class */ (function () {
    function ThirthNavItemComponent(elemRef, router$$1) {
        this.elemRef = elemRef;
        this.router = router$$1;
        this.elemRef.nativeElement.addEventListener('click', function (ev) {
            ev.stopPropagation();
        });
    }
    ThirthNavItemComponent.prototype.isActive = function () {
        var active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            active = false;
        }
        return active;
    };
    return ThirthNavItemComponent;
}());
ThirthNavItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'thirth-nav-item',
                template: "<div class=\"thirth-nav-item\" [ngClass]=\"{'disabled':disabled!==undefined&&disabled!==false}\" routerLinkActive=\"{{link?'active':''}}\">\n    <span routerLink=\"{{link}}\" style=\"display:block\" *ngIf=\"!!link&&!(disabled!==undefined&&disabled!==false)\">{{text}}</span>\n    <span style=\"display:block\" *ngIf=\"!link||(disabled!==undefined&&disabled!==false)\">{{text}}</span>\n</div>",
                styles: [".disabled,.disabled *{color:#999!important}"]
            },] },
];
ThirthNavItemComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: router.Router, },
]; };
ThirthNavItemComponent.propDecorators = {
    "text": [{ type: core.Input },],
    "link": [{ type: core.Input },],
    "icon": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
};
var SubNavItemComponent = /** @class */ (function () {
    function SubNavItemComponent(elemRef, router$$1, actRoute, componentFactoryResolver) {
        this.elemRef = elemRef;
        this.router = router$$1;
        this.actRoute = actRoute;
        this.componentFactoryResolver = componentFactoryResolver;
        this.hasChild = false;
    }
    SubNavItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .subscribe(function (event) {
            if (event instanceof router.NavigationEnd) {
                var url = event.url.split(';')[0];
                var li = _this.elemRef.nativeElement.querySelector('.sub-nav-item');
                var wouldActive = false;
                var thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                wouldActive = _this.isActive();
                if (wouldActive) {
                    _this.addClass(li, 'active');
                    thirthNavWrap && _this.openWrap(thirthNavWrap);
                }
                else {
                    if (_this.isAsideFolded()) {
                        thirthNavWrap && _this.closeWrap(thirthNavWrap);
                        _this.removeClass(li, 'active');
                    }
                }
            }
        });
        this.elemRef.nativeElement.addEventListener('click', function (ev) {
            ev.stopPropagation();
            if (_this.hasChild) {
                var li = _this.elemRef.nativeElement.querySelector('.sub-nav-item');
                var linkElem = li.querySelector('a');
                if (linkElem.getAttribute('href') !== null) {
                    return;
                }
                var wouldActive = false;
                var thirthNavWrap = li ? li.querySelector('.thirth-nav-wrap') : null;
                wouldActive = (li && !_this.hasClass(li, 'active'));
                if (wouldActive) {
                    thirthNavWrap && _this.openWrap(thirthNavWrap);
                    _this.addClass(li, 'active');
                }
                else {
                    thirthNavWrap && _this.closeWrap(thirthNavWrap);
                    _this.removeClass(li, 'active');
                }
            }
        });
    };
    SubNavItemComponent.prototype.isActive = function () {
        var active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            if (this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')) {
                active = true;
            }
        }
        return active;
    };
    SubNavItemComponent.prototype.openWrap = function (elem) {
        var org_h = elem.clientHeight, h = 0;
        var items = elem.querySelectorAll('.thirth-nav-item');
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                h += item.clientHeight;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (elem.clientHeight < h) {
            elem.style.height = org_h + '';
            setTimeout(function () {
                elem.style.height = h + 'px';
                setTimeout(function () {
                    elem.style.height = null;
                }, 300);
            });
        }
        var e_3, _a;
    };
    SubNavItemComponent.prototype.closeWrap = function (elem) {
        elem.style.height = elem.clientHeight + 'px';
        setTimeout(function () {
            elem.style.height = '0';
            setTimeout(function () {
                elem.style.height = null;
            }, 300);
        });
    };
    SubNavItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.elemRef.nativeElement.querySelector('.thirth-nav-item')) {
                _this.hasChild = true;
                if (_this.elemRef.nativeElement.querySelector('.thirth-nav-item.active')) {
                    _this.addClass(_this.elemRef.nativeElement.querySelector('.sub-nav-item'), 'active');
                }
            }
        });
    };
    SubNavItemComponent.prototype.isAsideFolded = function () {
        var foldedElem = document.querySelector('.app.app-aside-folded');
        var isAsideFolded = foldedElem ? true : false;
        if (!isAsideFolded) {
            return false;
        }
        var classList = foldedElem.className.split(/\s+/);
        if (classList.indexOf('off-screen') >= 0) {
            var clientWidth = document.body.clientWidth;
            if (clientWidth < 768) {
                return false;
            }
        }
        return true;
    };
    SubNavItemComponent.prototype.hasClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    };
    SubNavItemComponent.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    SubNavItemComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    SubNavItemComponent.prototype.inserThirthNavItem = function (options) {
        var viewContainerRef = this.childrenHost;
        var sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ThirthNavItemComponent);
        var sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
        var sNavComponentInstance = ((sNavComponentRef.instance));
        sNavComponentInstance.text = options.text;
        options.icon && (sNavComponentInstance.icon = options.icon);
        options.link && (sNavComponentInstance.link = options.link);
        return sNavComponentInstance;
    };
    return SubNavItemComponent;
}());
SubNavItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'sub-nav-item',
                template: "<li routerLinkActive=\"{{link?'active':''}}\" class=\"sub-nav-item\" [ngClass]=\"{'has-child':hasChild,'disabled':disabled!==undefined&&disabled!==false}\">\n    <a routerLink=\"{{link}}\" *ngIf=\"!!link&&!(disabled!==undefined&&disabled!==false)\">\n        <i class=\"sub-nav-icon fa fa-caret-right\" *ngIf=\"hasChild\"></i>\n        <i class=\"sub-nav-icon fa fa-caret-down\" *ngIf=\"hasChild\"></i> {{text}}\n    </a>\n    <a *ngIf=\"!link||(disabled!==undefined&&disabled!==false)\">\n        <i class=\"sub-nav-icon fa fa-caret-right\" *ngIf=\"hasChild\"></i>\n        <i class=\"sub-nav-icon fa fa-caret-down\" *ngIf=\"hasChild\" style=\"margin-left: -18px\"></i> {{text}}\n    </a>\n    <div class=\"thirth-nav-wrap\">\n        <ng-content></ng-content>\n        <ng-container #childrenHost></ng-container>\n    </div>\n</li>",
                styles: [".disabled,.disabled *{color:#999!important}"]
            },] },
];
SubNavItemComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: router.Router, },
    { type: router.ActivatedRoute, },
    { type: core.ComponentFactoryResolver, },
]; };
SubNavItemComponent.propDecorators = {
    "text": [{ type: core.Input },],
    "link": [{ type: core.Input },],
    "icon": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "childrenHost": [{ type: core.ViewChild, args: ['childrenHost', { read: core.ViewContainerRef },] },],
    "thirthNavItems": [{ type: core.ContentChildren, args: [ThirthNavItemComponent,] },],
};
var NavItemComponent = /** @class */ (function () {
    function NavItemComponent(elemRef, router$$1, actRoute, componentFactoryResolver) {
        this.elemRef = elemRef;
        this.router = router$$1;
        this.actRoute = actRoute;
        this.componentFactoryResolver = componentFactoryResolver;
        this.haveChild = false;
        this.childrenActive = false;
    }
    NavItemComponent.prototype.getPosition = function (obj) {
        var topValue = 0, leftValue = 0;
        while (obj) {
            leftValue += obj.offsetLeft;
            topValue += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { left: leftValue, top: topValue };
    };
    NavItemComponent.prototype.activeNavItem = function () {
        this.addClass(this.rootElem, 'active');
    };
    NavItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rootElem = this.root.nativeElement;
        this.router.events
            .subscribe(function (event) {
            if (event instanceof router.NavigationEnd) {
                setTimeout(function () {
                    var url = event.url.split(';')[0];
                    var subNavWrap = _this.subWrap.nativeElement;
                    var wouldActive = _this.isActive();
                    if (wouldActive) {
                        _this.openSubNav(subNavWrap);
                        (!_this.link) && _this.addClass(_this.rootElem, 'active');
                    }
                    else {
                        _this.closeSubNav(subNavWrap);
                        (!_this.link) && _this.removeClass(_this.rootElem, 'active');
                    }
                });
            }
        });
        this.rootElem.addEventListener('click', function (ev) {
            var isAsideFolded = _this.isAsideFolded();
            var linkElem = _this.rootElem.querySelector('a');
            if (linkElem.getAttribute('href') !== null) {
                return;
            }
            var subWrap = _this.subWrap.nativeElement;
            var wouldActive = (subWrap.clientHeight > 0 ? false : true);
            if (!isAsideFolded) {
                if (wouldActive) {
                    _this.addClass(_this.rootElem, 'active');
                    _this.openSubNav(subWrap);
                }
                else {
                    _this.removeClass(_this.rootElem, 'active');
                    _this.closeSubNav(subWrap);
                }
            }
        });
        this.rootElem.addEventListener('mouseenter', function (ev) {
            var target = _this.rootElem;
            if (!_this.isAsideFolded()) {
                return;
            }
            if (!_this.hasClass(target, 'nav-item-hover')) {
                _this.addClass(target, 'nav-item-hover');
            }
            else {
                return;
            }
            var pos = _this.getPosition(target), wrapPos;
            var navWrap = document.querySelector('.navi-wrap');
            if (navWrap) {
                wrapPos = _this.getPosition(navWrap);
            }
            var subNavWrap = target.querySelector('.nav.nav-sub');
            var w = target.offsetWidth;
            var h = target.offsetHeight;
            var win_h = document.body.clientHeight;
            if (subNavWrap) {
                var subWrapHeight = subNavWrap.offsetHeight;
                var top = pos.top;
                subNavWrap.style.left = pos.left + w + 'px';
                if (win_h - pos.top < subWrapHeight) {
                    if (win_h - pos.top + h < subWrapHeight) {
                        top = wrapPos.top || 0;
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
        this.rootElem.addEventListener('mouseleave', function (ev) {
            if (!_this.isAsideFolded()) {
                return;
            }
            var classList = _this.rootElem.className.split(/\s+/);
            if (classList.indexOf('nav-item-hover') >= 0) {
                _this.removeClass(_this.rootElem, 'nav-item-hover');
            }
            var subNavWrap = _this.rootElem.querySelector('.nav.nav-sub');
            if (subNavWrap) {
                subNavWrap.style.maxHeight = 'inherit';
            }
        });
    };
    NavItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.checkChild();
            if (_this.hasActiveChildren()) {
                _this.childrenActive = true;
                _this.addClass(_this.rootElem, 'active');
                _this.openSubNav(_this.rootElem.querySelector('.nav-sub'));
            }
        });
    };
    NavItemComponent.prototype.ngAfterViewChecked = function () {
    };
    NavItemComponent.prototype.openSubNav = function (subNavElem) {
        var _this = this;
        if (subNavElem) {
            if (this.isAsideFolded()) {
                subNavElem.style.height = 'auto';
            }
            else if (subNavElem.clientHeight <= 0) {
                setTimeout(function () {
                    var height = _this.getSubNavHeight(subNavElem);
                    subNavElem.style.height = height + 'px';
                    setTimeout(function () {
                        if (_this.hasClass(_this.rootElem, 'active')) {
                            subNavElem.style.height = 'auto';
                        }
                        else {
                            subNavElem.style.height = '0';
                        }
                    }, 300);
                });
            }
        }
    };
    NavItemComponent.prototype.closeSubNav = function (subNavElem) {
        if (subNavElem.clientHeight > 0) {
            var height = this.getSubNavHeight(subNavElem);
            subNavElem.style.height = height + 'px';
            setTimeout(function () {
                subNavElem.style.height = '0';
            });
        }
    };
    NavItemComponent.prototype.getSubNavHeight = function (subNavElem) {
        var height = 0;
        if (subNavElem) {
            var children = subNavElem.querySelectorAll('sub-nav-item>li');
            if (children) {
                for (var i = 0, len = children.length; i < len; i++) {
                    height += children[i].clientHeight;
                }
            }
        }
        return height;
    };
    NavItemComponent.prototype.hasActiveChildren = function () {
        var activeChildren = this.rootElem.querySelector('sub-nav-item li.active');
        return activeChildren !== null;
    };
    NavItemComponent.prototype.isAsideFolded = function () {
        var foldedElem = document.querySelector('.app.app-aside-folded');
        var isAsideFolded = foldedElem ? true : false;
        if (!isAsideFolded) {
            return false;
        }
        var classList = foldedElem.className.split(/\s+/);
        if (classList.indexOf('off-screen') >= 0) {
            var clientWidth = document.body.clientWidth;
            if (clientWidth < 768) {
                return false;
            }
        }
        return true;
    };
    NavItemComponent.prototype.isActive = function () {
        var active = false;
        if (this.link) {
            active = this.router.isActive(this.link, false);
        }
        else {
            if (this.elemRef.nativeElement.querySelector('.sub-nav-item.active')) {
                active = true;
            }
        }
        return active;
    };
    NavItemComponent.prototype.checkChild = function () {
        var child = this.elemRef.nativeElement.querySelector('sub-nav-item');
        if (child) {
            this.haveChild = true;
        }
    };
    NavItemComponent.prototype.hasClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        return classList.indexOf(className) >= 0;
    };
    NavItemComponent.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    NavItemComponent.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    NavItemComponent.prototype.inserSubNavItem = function (options) {
        var viewContainerRef = this.childrenHost;
        var sNavComponentFactory = this.componentFactoryResolver.resolveComponentFactory(SubNavItemComponent);
        var sNavComponentRef = viewContainerRef.createComponent(sNavComponentFactory);
        var sNavComponentInstance = ((sNavComponentRef.instance));
        sNavComponentInstance.text = options.text;
        options.icon && (sNavComponentInstance.icon = options.icon);
        options.link && (sNavComponentInstance.link = options.link);
        return sNavComponentInstance;
    };
    return NavItemComponent;
}());
NavItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'nav-item',
                template: "<li routerLinkActive=\"{{link?'active':''}}\" [ngClass]=\"{'exist-children':haveChild,'disabled':disabled!==undefined&&disabled!==false}\" #root>\n    <a routerLink=\"{{link}}\" *ngIf=\"!!link&&!(disabled!==undefined&&disabled!==false)\">\n        <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n    </a>\n    <a *ngIf=\"!link||(disabled!==undefined&&disabled!==false)\">\n        <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n    </a>\n    <ul class=\"nav nav-sub dk\" #subWrap>\n        <li class=\"nav-item-title\">{{text}}</li>\n        <ng-content></ng-content>\n        <ng-container #childrenHost></ng-container>\n    </ul>\n</li>\n\n<ng-template #content>\n    <span class=\"pull-right text-muted\" *ngIf=\"haveChild\">\n    <i class=\"fa fa-fw fa-angle-right text\"></i>\n    <i class=\"fa fa-fw fa-angle-down text-active\"></i>\n</span>\n    <b class=\"pull-right {{badgeClass}}\" *ngIf=\"badgeValue\">{{badgeValue}}</b>\n    <i class=\"{{icon}}\"></i>\n    <span>{{text}}</span>\n</ng-template>",
                styles: [".disabled,.disabled *{color:#999!important}"]
            },] },
];
NavItemComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: router.Router, },
    { type: router.ActivatedRoute, },
    { type: core.ComponentFactoryResolver, },
]; };
NavItemComponent.propDecorators = {
    "icon": [{ type: core.Input },],
    "text": [{ type: core.Input },],
    "link": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "badgeClass": [{ type: core.Input, args: ['badge-class',] },],
    "badgeValue": [{ type: core.Input, args: ['badge-value',] },],
    "subWrap": [{ type: core.ViewChild, args: ['subWrap',] },],
    "root": [{ type: core.ViewChild, args: ['root',] },],
    "childrenHost": [{ type: core.ViewChild, args: ['childrenHost', { read: core.ViewContainerRef },] },],
    "subNavItems": [{ type: core.ContentChildren, args: [SubNavItemComponent,] },],
    "thirthNavItems": [{ type: core.ContentChildren, args: [ThirthNavItemComponent,] },],
};
var DatetimePickerComponent = /** @class */ (function () {
    function DatetimePickerComponent(elemRef) {
        this.elemRef = elemRef;
        this.valueChange = new core.EventEmitter();
        this.format = 'yyyy-MM-dd';
        this.start = '1970/01/01';
        this.end = '2070/12/31';
        this.trigger = 'focus';
        this.zIndex = 999;
        this.isCalendar = false;
        this.complete = new core.EventEmitter();
        this.visible = false;
        this.ready = false;
        this.year = null;
        this.month = null;
        this.day = null;
        this.hours = null;
        this.minutes = null;
        this.seconds = null;
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
        for (var i = 0; i < 24; i++) {
            this.hoursOptions.push(i);
        }
        for (var j = 0; j < 60; j++) {
            this.minutesOrSecondsOptions.push(j);
        }
    }
    DatetimePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.body.appendChild(this.popover.nativeElement);
        {
            this.elemRef.nativeElement.style.display = 'inline-block';
            this.elemRef.nativeElement.style.position = 'relative';
            this.elemRef.nativeElement.style.verticalAlign = 'middle';
        }
        var inputElem = this.elemRef.nativeElement.querySelector('input');
        this.inputElem = inputElem;
        if (this.inputElem) {
            this.addEvent(this.inputElem, 'blur', function (ev) {
                if (_this.value) {
                    if (!_this.isFormat(_this.value, _this.format)) {
                        _this.valueChange.emit('');
                    }
                    else {
                        if (_this.min) {
                            var minDate = _this.getMinDate();
                            if (minDate && _this.isDateTimeGreaterThan(minDate, _this.date)) {
                                _this.valueChange.emit('');
                            }
                        }
                        if (_this.max) {
                            var maxDate = _this.getMaxDate();
                            if (maxDate && _this.isDateTimeGreaterThan(_this.date, maxDate)) {
                                _this.valueChange.emit('');
                            }
                        }
                    }
                }
            });
            this.addEvent(this.inputElem, 'input', function (ev) {
                if (_this.value && _this.isFormat(_this.value, _this.format)) {
                    _this.setOrgDate();
                }
            });
            this.addEvent(this.inputElem, this.trigger, function (ev) {
                _this.init();
                _this.visible = true;
                setTimeout(function () {
                    _this.setPosition();
                });
            });
            this.addEvent(document, 'click', function (ev) {
                if (_this.inputElem !== ev.target) {
                    if (_this.visible) {
                        _this.close();
                    }
                }
            });
        }
    };
    DatetimePickerComponent.prototype.ngOnDestroy = function () {
        try {
            for (var _a = __values(this.handlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var handle = _b.value;
                handle.elem.removeEventListener(handle.event, handle.fn);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (this.popover.nativeElement) {
            document.body.removeChild(this.popover.nativeElement);
        }
        var e_4, _c;
    };
    DatetimePickerComponent.prototype.init = function () {
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
    };
    DatetimePickerComponent.prototype.testFormat = function () {
        if (typeof this.format === 'string') {
            this.isPickHours = /[h|H]/.test(this.format);
            this.isPickMinutes = /[m]/.test(this.format);
            this.isPickSeconds = /[s|S]/.test(this.format);
        }
    };
    DatetimePickerComponent.prototype.createYearOptions = function () {
        this.yearOptions = [];
        var startDate = this.createDateWidthFormat(this.start, this.format);
        var endDate = this.createDateWidthFormat(this.end, this.format);
        var startYear = startDate.getFullYear();
        var endYear = endDate.getFullYear();
        if (startYear && endYear) {
            for (var i = startYear; i < endYear; i++) {
                this.yearOptions.push(i);
            }
        }
    };
    DatetimePickerComponent.prototype.createMonthOptions = function () {
        this.monthOptions = [];
        for (var i = 0; i < 12; i++) {
            this.monthOptions.push(i);
        }
    };
    DatetimePickerComponent.prototype.createDayOptions = function () {
        if (this.year === null || this.month === null) {
            return;
        }
        var dayIndex = 0;
        var startDay = this.createDate();
        startDay.setDate(1);
        startDay.setMonth(this.month);
        startDay.setFullYear(this.year);
        var weekDay = startDay.getDay();
        if (weekDay === 0) {
            startDay.setDate(startDay.getDate() - 7);
        }
        else if (weekDay < 7) {
            startDay.setDate(startDay.getDate() - weekDay);
        }
        var y = startDay.getFullYear();
        var m = startDay.getMonth();
        var d = startDay.getDate();
        this.dayOptions = [];
        var minDate = this.getMinDate(), maxDate = this.getMaxDate();
        for (var i = 0; i < 6; i++) {
            var group = [];
            for (var j = 0; j < 7; j++) {
                var newDateStr = '' + y + '/' + (m + 1) + '/' + d;
                var newDate = this.createDate(newDateStr);
                newDate.setDate(d + dayIndex);
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                var isCurrent = (newDate.getMonth() == this.month);
                var disabled = false;
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
    };
    DatetimePickerComponent.prototype.addEvent = function (elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    };
    DatetimePickerComponent.prototype.searchStrByFormat = function (str, format, condiction, len) {
        var result = '';
        var index, resultLen;
        if (len instanceof Array) {
            len.sort(function (a, b) {
                return b - a;
            });
            try {
                for (var len_1 = __values(len), len_1_1 = len_1.next(); !len_1_1.done; len_1_1 = len_1.next()) {
                    var l = len_1_1.value;
                    var regExpStr = condiction + (l > 1 ? '{' + l + '}' : '');
                    var resExp = new RegExp(regExpStr);
                    index = format.search(resExp);
                    if (index >= 0) {
                        resultLen = l;
                        break;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (len_1_1 && !len_1_1.done && (_a = len_1.return)) _a.call(len_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (typeof len === 'number') {
            var regExpStr = condiction + (len > 1 ? '{' + len + '}' : '');
            var resExp = new RegExp(regExpStr);
            index = format.search(resExp);
            resultLen = len;
        }
        if (index >= 0) {
            result = str.substring(index, index + resultLen);
            return result;
        }
        var e_5, _a;
    };
    DatetimePickerComponent.prototype.createDateWidthFormat = function (dateStr, format) {
        var date = this.createDate(dateStr);
        if (!date) {
            date = this.createDate();
            var year = void 0, month = void 0, day = void 0, hours = void 0, minutes = void 0, seconds = void 0;
            day = parseInt(this.searchStrByFormat(dateStr, format, '[dD]', [1, 2])) || 1;
            date.setDate(parseInt(day));
            month = parseInt(this.searchStrByFormat(dateStr, format, '[M]', [1, 2])) || 1;
            date.setMonth(parseInt(month) - 1);
            year = parseInt(this.searchStrByFormat(dateStr, format, '[yY]', 4)) || date.getFullYear();
            date.setFullYear(year);
            hours = parseInt(this.searchStrByFormat(dateStr, format, '[hH]', [1, 2])) || 0;
            date.setHours(parseInt(hours));
            minutes = parseInt(this.searchStrByFormat(dateStr, format, '[m]', [1, 2])) || 0;
            date.setMinutes(parseInt(minutes));
            seconds = parseInt(this.searchStrByFormat(dateStr, format, '[sS]', [1, 2])) || 0;
            date.setSeconds(parseInt(seconds));
        }
        return date;
    };
    DatetimePickerComponent.prototype.isDateTimeGreaterThan = function (date1, date2) {
        return date1.getTime() - date2.getTime() >= 1000;
    };
    DatetimePickerComponent.prototype.createDate = function (dateStr) {
        var date;
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
    };
    DatetimePickerComponent.prototype.setOrgDate = function () {
        var dateStr = '';
        if (this.value) {
            dateStr = this.value;
        }
        else if (this.inputElem) {
            dateStr = this.inputElem.value;
        }
        var date;
        if (dateStr) {
            date = this.createDateWidthFormat(dateStr, this.format);
        }
        else {
            date = this.createDate();
        }
        this.date = date;
        this.setValues();
    };
    DatetimePickerComponent.prototype.setDateFullYear = function (year) {
        this.date.setFullYear(year || this.year);
    };
    DatetimePickerComponent.prototype.setDateMonth = function (month) {
        this.date.setMonth(month || this.month);
    };
    DatetimePickerComponent.prototype.setValues = function (date) {
        var dateTime = date || this.date;
        this.year = dateTime.getFullYear();
        this.month = dateTime.getMonth();
        this.day = dateTime.getDate();
        this.hours = dateTime.getHours();
        this.minutes = dateTime.getMinutes();
        this.seconds = dateTime.getSeconds();
    };
    DatetimePickerComponent.prototype.stopPropagation = function (ev) {
        ev.stopPropagation();
    };
    DatetimePickerComponent.prototype.setPosition = function () {
        if (this.popover && this.inputElem) {
            var popoverH = this.datetimePicker.nativeElement.offsetHeight;
            var popoverW = this.datetimePicker.nativeElement.offsetWidth;
            var rect = this.inputElem.getBoundingClientRect();
            var viewH = document.body.clientHeight;
            var viewW = document.body.clientWidth;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop || document.documentElement.scrollTop;
            if (viewW - rect.left < popoverW) {
                this.left = rect.right - popoverW + scrollLeft;
            }
            else {
                this.left = rect.left + scrollLeft;
            }
            if (this.direction === 'bottom') {
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
    };
    DatetimePickerComponent.prototype.pickDay = function (day) {
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
    };
    DatetimePickerComponent.prototype.prevMonth = function () {
        var newMonth = this.month - 1;
        this.date.setMonth(newMonth);
        if (this.date.getMonth() > newMonth) {
            this.date.setDate(0);
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    };
    DatetimePickerComponent.prototype.nextMonth = function () {
        var newMonth = this.month + 1;
        this.date.setMonth(newMonth);
        if (this.date.getMonth() > newMonth) {
            this.date.setDate(0);
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    };
    DatetimePickerComponent.prototype.getMinDate = function () {
        if (this.min) {
            var date = this.createDateWidthFormat(this.min, this.format);
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    };
    DatetimePickerComponent.prototype.getMaxDate = function () {
        if (this.max) {
            var date = this.createDateWidthFormat(this.max, this.format);
            if (date.toDateString() !== 'Invalid Date') {
                return date;
            }
        }
        return null;
    };
    DatetimePickerComponent.prototype.maxInputTest = function (ev, max) {
    };
    DatetimePickerComponent.prototype.isFormat = function (str, format) {
        var str1 = str.replace(/\d{2}|\d/g, '**');
        var str2 = format.replace(/[yYMdDhHmsS]{2}|[yYMdDhHmsS]/g, '**');
        return str1 === str2;
    };
    DatetimePickerComponent.prototype.clear = function () {
        if (this.inputElem) {
            this.inputElem.value = '';
            this.valueChange.emit('');
        }
        this.close();
    };
    DatetimePickerComponent.prototype.now = function () {
        var date = this.createDate();
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
    };
    DatetimePickerComponent.prototype.clearErrors = function () {
        this.minError = false;
        this.maxError = false;
    };
    DatetimePickerComponent.prototype.output = function () {
        var minDate = this.getMinDate(), maxDate = this.getMaxDate();
        if (minDate && this.isDateTimeGreaterThan(minDate, this.date)) {
            this.minError = true;
            return false;
        }
        else if (maxDate && this.isDateTimeGreaterThan(this.date, maxDate)) {
            this.maxError = true;
            return false;
        }
        var result = this.format;
        var month = this.month + 1;
        result = result.replace(/[yY]{4}/, this.year + '');
        if (/[M]{2}/.test(this.format)) {
            result = result.replace(/[M]{2}/, month < 10 ? '0' + month : month + '');
        }
        else if (/M/.test(this.format)) {
            result = result.replace(/M/, month + '');
        }
        if (/[dD]{2}/.test(this.format)) {
            result = result.replace(/[dD]{2}/, this.day < 10 ? '0' + this.day : this.day + '');
        }
        else if (/[dD]/.test(this.format)) {
            result = result.replace(/[dD]/, this.day + '');
        }
        if (/[hH]{2}/.test(this.format)) {
            result = result.replace(/[hH]{2}/, this.hours < 10 ? '0' + this.hours : this.hours + '');
        }
        else if (/[hH]/.test(this.format)) {
            result = result.replace(/[hH]/, this.hours + '');
        }
        if (/[m]{2}/.test(this.format)) {
            result = result.replace(/[m]{2}/, this.minutes < 10 ? '0' + this.minutes : this.minutes + '');
        }
        else if (/[m]/.test(this.format)) {
            result = result.replace(/[m]/, this.minutes + '');
        }
        if (/[sS]{2}/.test(this.format)) {
            result = result.replace(/[sS]{2}/, this.seconds < 10 ? '0' + this.seconds : this.seconds + '');
        }
        else if (/[sS]/.test(this.format)) {
            result = result.replace(/[sS]/, this.seconds + '');
        }
        this.valueChange.emit(result);
        this.close();
        this.complete.emit(result);
    };
    DatetimePickerComponent.prototype.close = function () {
        this.visible = false;
        this.ready = false;
    };
    return DatetimePickerComponent;
}());
DatetimePickerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'datetime-picker',
                template: "<ng-content select=\"input\"></ng-content>\n<div #popover [ngClass]=\"{'datetime-picker-hide':!ready}\">\n    <div class=\"datetime-picker\" *ngIf=\"visible\" (click)=\"stopPropagation($event)\" [style.left.px]=\"left\" [style.top.px]=\"top\" [style.zIndex]=\"zIndex||null\" [style.opacity]=\"ready?'1':0\" [style.transition]=\"ready?'opacity .3s ease-out':'none'\" #datetimePicker>\n        <div class=\"datetime-picker-header\">\n            <div class=\"datetime-picker-ymd\">\n                <span class=\"datetime-picker-prev\" (click)=\"prevMonth();createDayOptions()\">\u2039</span>\n                <select [(ngModel)]=\"year\" (change)=\"setDateFullYear();setValues();createDayOptions()\">\n          <option *ngFor=\"let y of yearOptions\" [value]=\"y\">{{y}}</option>\n        </select> \u5E74\n                <select [(ngModel)]=\"month\" (change)=\"setDateMonth();setValues();createDayOptions()\">\n          <option *ngFor=\"let m of monthOptions\" [value]=\"m\">{{m+1}}</option>\n        </select> \u6708\n                <span class=\"datetime-picker-next\" (click)=\"nextMonth();createDayOptions()\">\u203A</span>\n            </div>\n\n        </div>\n        <div class=\"datetime-picker-body\">\n            <table>\n                <thead>\n                    <tr>\n                        <th>\u65E5</th>\n                        <th>\u4E00</th>\n                        <th>\u4E8C</th>\n                        <th>\u4E09</th>\n                        <th>\u56DB</th>\n                        <th>\u4E94</th>\n                        <th>\u516D</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let group of dayOptions\">\n                        <td *ngFor=\"let d of group\" [ngClass]=\"{'disabled':!d.isCurrent,'invalid':d.disabled,'active':d.isCurrent&&d.text==day}\" (click)=\"pickDay(d)\">{{d.text}}</td>\n                    </tr>\n                </tbody>\n            </table>\n            <!--<div class=\"datetime-picker-time-input\" *ngIf=\"isPickingTime\">\n        <input *ngIf=\"isPickHours\" maxlength=\"2\" placeholder=\"\u65F6\" [(ngModel)]=\"hours\" (input)=\"maxInputTest($event,23)\"/>\n        <span *ngIf=\"isPickMinutes\">:</span>\n        <input *ngIf=\"isPickMinutes\" maxlength=\"2\" placeholder=\"\u5206\" [(ngModel)]=\"minutes\" (input)=\"maxInputTest($event,59)\"/>\n        <span *ngIf=\"isPickSeconds\">:</span>\n        <input *ngIf=\"isPickSeconds\" maxlength=\"2\" placeholder=\"\u79D2\" [(ngModel)]=\"seconds\" (input)=\"maxInputTest($event,59)\"/>\n        <span *ngIf=\"isPickHours&&!(isPickMinutes||isPickSeconds)\">\u65F6</span>\n      </div>-->\n            <div class=\"datetime-picker-time-input\" *ngIf=\"isPickingTime\">\n                <select *ngIf=\"isPickHours\" [(ngModel)]=\"hours\">\n          <option *ngFor=\"let h of hoursOptions\" [value]=\"h\">{{h>=10?h:'0'+h}}</option>\n        </select>\n                <span *ngIf=\"isPickMinutes\">:</span>\n                <select *ngIf=\"isPickMinutes\" [(ngModel)]=\"minutes\">\n          <option *ngFor=\"let m of minutesOrSecondsOptions\" [value]=\"m\">{{m>=10?m:'0'+m}}</option>\n        </select>\n                <span *ngIf=\"isPickSeconds\">:</span>\n                <select *ngIf=\"isPickSeconds\" [(ngModel)]=\"seconds\">\n          <option *ngFor=\"let s of minutesOrSecondsOptions\" [value]=\"s\">{{s>=10?s:'0'+s}}</option>\n        </select>\n                <span *ngIf=\"isPickHours&&!(isPickMinutes||isPickSeconds)\">\u65F6</span>\n            </div>\n            <div class=\"datetime-picker-errors\" *ngIf=\"minError||maxError\">\n                <div class=\"datetime-picker-error\">\n                    <span *ngIf=\"minError\">\u60A8\u9009\u62E9\u7684\u65E5\u671F\u5C0F\u4E8E\u5141\u8BB8\u7684\u6700\u5C0F\u65E5\u671F\uFF01</span>\n                    <span *ngIf=\"maxError\">\u60A8\u9009\u62E9\u7684\u65E5\u671F\u5927\u4E8E\u5141\u8BB8\u7684\u6700\u5927\u65E5\u671F\uFF01</span>\n                    <span class=\"datetime-picker-btn\" (click)=\"clearErrors()\">\u786E\u5B9A</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"datetime-picker-footer\">\n            <div class=\"datetime-picker-time\">\n                <div *ngIf=\"!isPickingTime\" (click)=\"isPickingTime=true\">\n                    <span *ngIf=\"isPickHours\">{{hours>=10?hours:'0'+hours}}</span>\n                    <span *ngIf=\"isPickMinutes\">:{{minutes>=10?minutes:'0'+minutes}}</span>\n                    <span *ngIf=\"isPickSeconds\">:{{seconds>=10?seconds:'0'+seconds}}</span>\n                    <span *ngIf=\"isPickHours&&!(isPickMinutes||isPickSeconds)\">\u65F6</span>\n                </div>\n                <div *ngIf=\"isPickingTime\" (click)=\"isPickingTime=false\">\u8FD4\u56DE\u65E5\u671F</div>\n            </div>\n            <div class=\"datetime-picker-btns\">\n                <a class=\"datetime-picker-clear\" (click)=\"clear()\">\u6E05\u7A7A</a>\n                <a class=\"datetime-picker-today\" (click)=\"now()\">{{isPickHours||isPickMinutes||isPickSeconds?'\u73B0\u5728':'\u4ECA\u5929'}}</a>\n                <a class=\"datetime-picker-sure\" *ngIf=\"isPickHours||isPickMinutes||isPickSeconds\" (click)=\"output()\">\u786E\u5B9A</a>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [".datetime-picker{width:240px;height:282px;background-color:#fff;position:absolute;z-index:9999;border:1px solid #ddd;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:14px;left:0;overflow:hidden}.datetime-picker *{-webkit-box-sizing:border-box;box-sizing:border-box}.datetime-picker-header{border-bottom:1px solid #ddd;padding:5px;height:36px;line-height:24px;background-color:#f5f5f5;color:#333}.datetime-picker-header select{min-width:50px;height:24px;text-align:center;padding:2px}.datetime-picker-header:after{content:'';display:block;clear:both}.datetime-picker-ymd{padding:0 30px;text-align:center;position:relative;letter-spacing:1px}.datetime-picker-time:hover{color:#000}.datetime-picker-body{padding:5px;height:208px;position:relative}.datetime-picker-body table{width:100%;text-align:center;line-height:24px;font-size:13px;color:#333}.datetime-picker-body table td,.datetime-picker-body table th{text-align:center;padding:2px}.datetime-picker-body table td:hover{cursor:pointer;background-color:#f5f5f5}.datetime-picker-body table td.disabled{color:#999}.datetime-picker-body table td.invalid{color:#999;cursor:not-allowed}.datetime-picker-body table td.active{color:#000;background-color:#f0f0f0}.datetime-picker-footer{height:36px;border-top:1px solid #ddd;padding:5px}.datetime-picker-time{float:left;padding-right:2px;cursor:pointer;color:#444;letter-spacing:1px;line-height:25px;padding-left:10px;font-size:13px}.datetime-picker-time span{float:left}.datetime-picker-btns{float:right;line-height:26px}.datetime-picker-clear,.datetime-picker-sure,.datetime-picker-today{padding:4px 8px;background-color:#f5f5f5;border:1px solid #ddd;font-size:13px;color:#333;cursor:pointer}.datetime-picker-clear:hover,.datetime-picker-sure:hover,.datetime-picker-today:hover{background-color:#f0f0f0;color:#000}.datetime-picker-clear:active,.datetime-picker-sure:active,.datetime-picker-today:active{background-color:#eee}.datetime-picker-next,.datetime-picker-prev{position:absolute;display:block;width:24px;height:24px;border:1px solid #ddd;background-color:#eaeaea;top:0;text-align:center;line-height:20px;font-size:24px;cursor:pointer}.datetime-picker-prev{left:0}.datetime-picker-next{right:0}.datetime-picker-next:hover,.datetime-picker-prev:hover{background-color:#e5e5e5}.datetime-picker-time-input{display:block;position:absolute;left:0;top:0;width:100%;height:100%;background-color:#fafafa;text-align:center;line-height:180px}.datetime-picker-time-input input{width:50px;text-align:center;padding:4px 10px;border:1px solid #ddd;line-height:16px}.datetime-picker-errors{display:table;position:absolute;left:0;top:0;width:100%;height:100%;background-color:#fff;text-align:center;line-height:32px}.datetime-picker-errors .datetime-picker-error{display:table-cell;padding:0 40px;vertical-align:middle}.datetime-picker-btn{padding:4px 12px;background-color:#fff;color:#666;border:1px solid #ddd;cursor:pointer}.datetime-picker-btn:hover{background-color:#fafafa;color:#333}.datetime-picker-btn:active{background-color:#f5f5f5}.datetime-picker-hide{position:absolute;width:0;height:0;opacity:0;overflow:hidden}"]
            },] },
];
DatetimePickerComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
DatetimePickerComponent.propDecorators = {
    "value": [{ type: core.Input },],
    "valueChange": [{ type: core.Output },],
    "format": [{ type: core.Input },],
    "max": [{ type: core.Input },],
    "min": [{ type: core.Input },],
    "start": [{ type: core.Input },],
    "end": [{ type: core.Input },],
    "trigger": [{ type: core.Input },],
    "zIndex": [{ type: core.Input },],
    "isCalendar": [{ type: core.Input },],
    "direction": [{ type: core.Input },],
    "complete": [{ type: core.Output },],
    "popover": [{ type: core.ViewChild, args: ['popover',] },],
    "datetimePicker": [{ type: core.ViewChild, args: ['datetimePicker',] },],
};
var DropDownComponent = /** @class */ (function () {
    function DropDownComponent() {
        this.isTransition = false;
        this.animateTime = 0.3;
    }
    Object.defineProperty(DropDownComponent.prototype, "show", {
        set: function (value) {
            var _this = this;
            var height;
            if (value) {
                this.wrap.nativeElement.style.overflow = 'hidden';
                this.cssOpen = true;
                this.visible = value;
                setTimeout(function () {
                    height = _this.content.nativeElement.offsetHeight;
                    _this.wrap.nativeElement.style.height = 0;
                    _this.isTransition = true;
                    setTimeout(function () {
                        _this.cssOpen = false;
                        setTimeout(function () {
                            _this.wrap.nativeElement.style.height = height + "px";
                            setTimeout(function () {
                                _this.wrap.nativeElement.style.overflow = null;
                            }, _this.animateTime * 1000);
                        });
                    });
                });
            }
            else {
                this.wrap.nativeElement.style.height = 0;
                this.wrap.nativeElement.style.overflow = 'hidden';
                setTimeout(function () {
                    _this.wrap.nativeElement.style.overflow = null;
                    _this.wrap.nativeElement.style.height = null;
                    _this.isTransition = false;
                    _this.visible = value;
                }, this.animateTime * 1000);
            }
        },
        enumerable: true,
        configurable: true
    });
    DropDownComponent.prototype.ngOnInit = function () {
    };
    DropDownComponent.prototype.open = function () {
        if (!this.visible) {
            this.show = true;
        }
    };
    DropDownComponent.prototype.close = function () {
        if (this.visible) {
            this.show = false;
        }
    };
    DropDownComponent.prototype.toggle = function () {
        this.show = !this.visible;
    };
    return DropDownComponent;
}());
DropDownComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'drop-down',
                template: "<div  #wrap class=\"drop-content\"  [style.transition]=\"isTransition?'height '+animateTime+'s':null\"\n [ngClass]=\"{'open':cssOpen}\">\n    <div *ngIf=\"visible\" #content>\n      <ng-content ></ng-content>\n    </div>\n\t</div>\n",
                styles: [".drop-content{width:100%}.drop-content.open{position:absolute;opacity:0;height:0;z-index:-1;overflow:hidden}"]
            },] },
];
DropDownComponent.ctorParameters = function () { return []; };
DropDownComponent.propDecorators = {
    "animateTime": [{ type: core.Input },],
    "wrap": [{ type: core.ViewChild, args: ['wrap',] },],
    "content": [{ type: core.ViewChild, args: ['content',] },],
    "show": [{ type: core.Input },],
};
var SliderComponent = /** @class */ (function () {
    function SliderComponent(eleRef) {
        this.eleRef = eleRef;
        this.valueChange = new core.EventEmitter();
        this.min = 0;
        this.max = 100;
        this.decimal = 0;
        this.isValueBackground = true;
        this.complete = new core.EventEmitter();
        this.isPressing = false;
    }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.addEventListener('mouseup', function (ev) {
            _this.isPressing = false;
            _this.complete.emit(_this.value);
            window.removeEventListener('mousemove', _this.mouseMoveHandler);
        });
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        var valChg = changes['value'];
        if (valChg.currentValue != valChg.previousValue) {
            if (valChg.currentValue !== undefined) {
                if (!this.isPressing) {
                    this.setLeftByValue(valChg.currentValue);
                }
            }
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener('mousemove', this.mouseMoveHandler);
    };
    SliderComponent.prototype.thumbPress = function () {
        var _this = this;
        this.isPressing = true;
        this.mouseMoveHandler = function (ev) {
            _this.setNewValueByMousePosition(ev);
        };
        window.addEventListener('mousemove', this.mouseMoveHandler);
    };
    SliderComponent.prototype.setNewValueByMousePosition = function (ev) {
        var e = ev;
        var m_x = e.pageX || (e.clientX +
            (document.documentElement.scrollLeft
                || document.body.scrollLeft));
        var target_x = this.slider.nativeElement.getBoundingClientRect().left + (document.documentElement.scrollLeft
            || document.body.scrollLeft);
        var sliderW = this.slider.nativeElement.offsetWidth;
        var thumbW = this.sliderThumb.nativeElement.offsetWidth;
        var minL = -thumbW / 2;
        var maxL = sliderW - thumbW / 2;
        var left = m_x - target_x - thumbW / 2;
        var percent = 0;
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
        var newVal = this.parseDecimal((this.max - this.min) * (percent / 100 + thumbW / 2 / sliderW) + this.min);
        this.valueChange.emit(newVal);
    };
    SliderComponent.prototype.setLeftByValue = function (val) {
        var percent = 100 * ((val - this.min) / (this.max - this.min));
        if (percent < 0) {
            percent = 0;
        }
        else if (percent > 100) {
            percent = 100;
        }
        percent -= (100 * this.sliderThumb.nativeElement.offsetWidth / 2 / this.slider.nativeElement.offsetWidth);
        this.left = percent + '%';
    };
    SliderComponent.prototype.parseDecimal = function (val) {
        if (this.decimal) {
            return parseFloat(val.toFixed(this.decimal));
        }
        else {
            return Math.round(val);
        }
    };
    return SliderComponent;
}());
SliderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'slider',
                template: "<div class=\"slider\" #slider (click)=\"setNewValueByMousePosition($event)\">\n  <div class=\"slider-text-bar\">\n    <span class=\"slider-min\" *ngIf=\"(value-min)/(max-min)>0.1\">{{min}}</span>\n    <span class=\"slider-max\" *ngIf=\"(max-value)/(max-min)>0.1\">{{max}}</span>\n  </div>\n  <div class=\"slider-body\" >\n    <div class=\"slider-value\" [style.left]=\"left\">{{value}}</div>\n    <div class=\"slider-bg\" [style.width]=\"left\" *ngIf=\"isValueBackground\"></div>\n    <div class=\"slider-thumb\"   #sliderThumb\n         [style.left]=\"left\"\n         [ngClass]=\"{'active':isPressing}\" (mousedown)=\"thumbPress()\"></div>\n  </div>\n</div>\n",
                styles: [".slider{width:100%}.slider,.slider *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.slider-text-bar{display:block;width:100%;height:16px;font-size:12px;color:#999;margin-bottom:5px}.slider-text-bar .slider-min{float:left}.slider-text-bar .slider-max{float:right}.slider-body{display:block;position:relative;width:100%;height:8px;background-color:#e4eaec;border-radius:4px}.slider-body .slider-value{display:inline-block;min-width:20px;position:absolute;left:0;top:-22px;font-size:12px;color:#999;text-align:center;vertical-align:middle}.slider-body .slider-thumb{display:block;width:20px;height:20px;position:absolute;top:-6px;left:50%;border-radius:50%;border:1px solid #ddd;background-color:#fff}.slider-body .slider-thumb:after{content:'';display:block;width:8px;height:8px;position:absolute;top:5px;left:5px;border-radius:50%;background-color:#ddd}.slider-body .slider-thumb.active:after{background-color:#09a8f1}.slider-body .slider-bg{display:block;height:100%;width:0;position:absolute;background-color:#09a8f1;border-bottom-left-radius:10px;border-top-left-radius:10px}"]
            },] },
];
SliderComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
SliderComponent.propDecorators = {
    "value": [{ type: core.Input },],
    "valueChange": [{ type: core.Output },],
    "size": [{ type: core.Input },],
    "min": [{ type: core.Input },],
    "max": [{ type: core.Input },],
    "decimal": [{ type: core.Input },],
    "isValueBackground": [{ type: core.Input },],
    "complete": [{ type: core.Output },],
    "slider": [{ type: core.ViewChild, args: ['slider',] },],
    "sliderThumb": [{ type: core.ViewChild, args: ['sliderThumb',] },],
};
var ToggleClassDirective = /** @class */ (function () {
    function ToggleClassDirective(elemRef) {
        this.elemRef = elemRef;
        this.keep = false;
        this.triggerEvent = 'click';
        this.tempWindowEvent = {
            event: this.triggerEvent,
            handler: null
        };
    }
    ToggleClassDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.orgClassName = this.elemRef.nativeElement.className;
        this.toggleClassList = this.getToggleClassList(this.toggleClass);
        if (this.target) {
            this.targetElem = document.getElementById(this.target);
            this.targetElem && (this.orgTargetClassName = this.targetElem.className);
            var targetToggleClass = this.targetClass || this.toggleClass;
            this.targetToggleClassList = this.getToggleClassList(targetToggleClass);
        }
        this.elemRef.nativeElement.addEventListener(this.triggerEvent, function (ev) {
            ev.stopPropagation();
            setTimeout(function () {
                if (_this.keep) {
                    var classList = _this.uniqueArray((_this.orgClassName + ' ' + _this.toggleClass).split(/\s+/));
                    _this.elemRef.nativeElement.className = classList.join(' ');
                    if (_this.target) {
                        var targetClassList = _this.uniqueArray((_this.orgTargetClassName + ' ' + _this.targetClass).split(/\s+/));
                        _this.targetElem.className = targetClassList.join(' ');
                    }
                }
                else {
                    _this.changeElemClass(_this.elemRef.nativeElement, _this.toggleClassList);
                    if (_this.target) {
                        _this.targetElem && _this.changeElemClass(_this.targetElem, _this.targetToggleClassList);
                    }
                }
                if (!(_this.revokable === undefined || _this.revokable === 'false')) {
                    var finalClassList = _this.getClassList(_this.elemRef.nativeElement);
                    var commonClassList = _this.getCommonClass(finalClassList, _this.toggleClassList);
                    if (commonClassList.length) {
                        _this.addOutClickResetListener();
                    }
                }
            });
        });
    };
    ToggleClassDirective.prototype.changeElemClass = function (elem, toggleClass) {
        var curClassList = this.getClassList(elem);
        var curOnlyClass = this.getOnlyClass(curClassList, toggleClass);
        var toggleOnlyClass = this.getOnlyClass(toggleClass, curClassList);
        var newClassList = curOnlyClass.concat(toggleOnlyClass);
        elem.className = newClassList.join(' ');
    };
    ToggleClassDirective.prototype.ngOnDestroy = function () {
        this.removeOutClickResetListener();
        this.targetElem = null;
    };
    ToggleClassDirective.prototype.addOutClickResetListener = function () {
        var _this = this;
        var handler = function (ev) {
            _this.elemRef.nativeElement.className = _this.orgClassName;
            if (_this.target) {
                _this.targetElem.className = _this.orgTargetClassName;
            }
            _this.removeOutClickResetListener();
        };
        window.addEventListener(this.triggerEvent, handler);
        this.tempWindowEvent.event = this.triggerEvent;
        this.tempWindowEvent.handler = handler;
    };
    ToggleClassDirective.prototype.removeOutClickResetListener = function () {
        if (this.tempWindowEvent !== undefined) {
            window.removeEventListener(this.tempWindowEvent.event, this.tempWindowEvent.handler);
        }
    };
    ToggleClassDirective.prototype.getClassList = function (elem) {
        return this.uniqueArray(elem.className.split(/\s+/));
    };
    ToggleClassDirective.prototype.getToggleClassList = function (inputClass) {
        var nullRegExp = /^\s+$/;
        if (!nullRegExp.test(inputClass)) {
            return this.uniqueArray(inputClass.split(/\s+/));
        }
        return [];
    };
    ToggleClassDirective.prototype.getOnlyClass = function (arrA, arrB) {
        var result = [];
        try {
            for (var arrA_1 = __values(arrA), arrA_1_1 = arrA_1.next(); !arrA_1_1.done; arrA_1_1 = arrA_1.next()) {
                var item = arrA_1_1.value;
                if (arrB.indexOf(item) < 0) {
                    result.push(item);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (arrA_1_1 && !arrA_1_1.done && (_a = arrA_1.return)) _a.call(arrA_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return result;
        var e_6, _a;
    };
    ToggleClassDirective.prototype.getCommonClass = function (arrA, arrB) {
        var result = [];
        try {
            for (var arrB_1 = __values(arrB), arrB_1_1 = arrB_1.next(); !arrB_1_1.done; arrB_1_1 = arrB_1.next()) {
                var item = arrB_1_1.value;
                if (arrA.indexOf(item) >= 0) {
                    result.push(item);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (arrB_1_1 && !arrB_1_1.done && (_a = arrB_1.return)) _a.call(arrB_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return result;
        var e_7, _a;
    };
    ToggleClassDirective.prototype.uniqueArray = function (array) {
        var newArr = [];
        try {
            for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                var item = array_1_1.value;
                if (newArr.indexOf(item) < 0) {
                    newArr.push(item);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return newArr;
        var e_8, _a;
    };
    return ToggleClassDirective;
}());
ToggleClassDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[toggleClass]'
            },] },
];
ToggleClassDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
ToggleClassDirective.propDecorators = {
    "toggleClass": [{ type: core.Input },],
    "revokable": [{ type: core.Input, args: ['opt-revokable',] },],
    "target": [{ type: core.Input, args: ['opt-target',] },],
    "targetClass": [{ type: core.Input, args: ['opt-targetClass',] },],
    "keep": [{ type: core.Input, args: ['opt-keep',] },],
};
var BtnBackDirective = /** @class */ (function () {
    function BtnBackDirective(elemRef) {
        this.elemRef = elemRef;
    }
    BtnBackDirective.prototype.ngOnInit = function () {
        this.elemRef.nativeElement.addEventListener('click', function () {
            history.back();
        });
    };
    BtnBackDirective.prototype.ngOnDestroy = function () {
    };
    return BtnBackDirective;
}());
BtnBackDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[btnBack]'
            },] },
];
BtnBackDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
var TextMaxLengthDirective = /** @class */ (function () {
    function TextMaxLengthDirective(elemRef) {
        this.elemRef = elemRef;
        this.textMaxLength = '';
    }
    TextMaxLengthDirective.prototype.ngOnInit = function () {
        this.elemRef.nativeElement.style.maxWidth = this.textMaxLength;
        this.elemRef.nativeElement.style.whiteSpace = 'nowrap';
        this.elemRef.nativeElement.style.overflow = 'hidden';
        this.elemRef.nativeElement.style.textOverflow = 'ellipsis';
    };
    return TextMaxLengthDirective;
}());
TextMaxLengthDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[textMaxLength]'
            },] },
];
TextMaxLengthDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
TextMaxLengthDirective.propDecorators = {
    "textMaxLength": [{ type: core.Input },],
};
var HTML5ValidateDirective = /** @class */ (function () {
    function HTML5ValidateDirective(elemRef) {
        this.elemRef = elemRef;
        this.visible = false;
    }
    HTML5ValidateDirective.prototype.ngOnInit = function () {
        if (this.elemRef.nativeElement.nodeName === 'FORM') {
            this.elemRef.nativeElement.removeAttribute('novalidate');
        }
        else {
            this.initValidateRules();
        }
    };
    HTML5ValidateDirective.prototype.createCustomValidity = function () {
        var msg = '';
        if (this.HTML5Validate instanceof Array) {
            if (typeof this.HTML5Validate[1] === 'string') {
                if (!!this.HTML5Validate[0]) {
                    msg = this.HTML5Validate[1];
                }
            }
            else {
                try {
                    for (var _a = __values(this.HTML5Validate), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var o = _b.value;
                        if (typeof o[1] === 'string') {
                            if (!!o[0]) {
                                msg = o[1];
                                break;
                            }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        }
        return msg;
        var e_9, _c;
    };
    HTML5ValidateDirective.prototype.initValidateRules = function () {
        var _this = this;
        this.elemRef.nativeElement.addEventListener('invalid', function () {
            _this.elemRef.nativeElement.setCustomValidity(_this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('change', function () {
            _this.elemRef.nativeElement.setCustomValidity(_this.createCustomValidity());
        });
        this.elemRef.nativeElement.addEventListener('keydown', function () {
            _this.elemRef.nativeElement.setCustomValidity('');
        });
    };
    return HTML5ValidateDirective;
}());
HTML5ValidateDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[HTML5Validate]'
            },] },
];
HTML5ValidateDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
HTML5ValidateDirective.propDecorators = {
    "HTML5Validate": [{ type: core.Input },],
    "visible": [{ type: core.Input },],
};
var AreaPicker = /** @class */ (function () {
    function AreaPicker() {
        this.values = [];
        this.index = 0;
        this.isShowLoader = false;
    }
    AreaPicker.prototype.createWrap = function () {
        var _this = this;
        var wrap = document.createElement('DIV');
        wrap.className = 'areaPicker';
        this.setPosition(wrap);
        this.wrap = wrap;
        document.body.appendChild(this.wrap);
        setTimeout(function () {
            _this.wrap.style.transition = 'opacity .3s ease-out';
            _this.wrap.style.opacity = '1';
        });
    };
    AreaPicker.prototype.createHeader = function () {
        var header = document.createElement('DIV');
        header.className = 'areaPicker-header';
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = document.createElement('DIV');
            item.className = 'areaPicker-header-item';
            item.innerHTML = this.items[i].label;
            item.setAttribute('data-index', i + '');
            item.setAttribute('data-type', 'header');
            this.items[i].elem = item;
            header.appendChild(item);
        }
        this.header = header;
        this.wrap.appendChild(this.header);
    };
    AreaPicker.prototype.createBody = function () {
        var body = document.createElement('DIV');
        body.className = 'areaPicker-body';
        this.body = body;
        this.wrap.appendChild(this.body);
    };
    AreaPicker.prototype.setData = function (data, index) {
        var i = (index !== undefined ? index : this.index);
        this.items[i].data = data;
        this.setBodyContent();
    };
    AreaPicker.prototype.clearData = function (index) {
        var i = (index !== undefined ? index : this.index);
        this.items[i].data = [];
    };
    AreaPicker.prototype.clearBody = function () {
        this.body.innerHTML = this.isShowLoader ? '<span class="areaPicker-loader">加载中...</span>' : '';
    };
    AreaPicker.prototype.activate = function (index) {
        for (var i = 0, len = this.items.length; i < len; i++) {
            this.removeClass(this.items[i].elem, 'active');
            if (i >= index) {
                this.items[i].elem.innerHTML = this.items[i].label;
            }
        }
        this.addClass(this.items[index].elem, 'active');
        this.index = index;
    };
    AreaPicker.prototype.setBodyContent = function (index) {
        this.body.innerHTML = '';
        var act_index = index || this.index;
        for (var i = 0, len = this.items[act_index].data.length; i < len; i++) {
            var o = this.items[act_index].data[i];
            var btn = document.createElement('SPAN');
            btn.className = 'areaPicker-item';
            btn.setAttribute('data-index', i + '');
            btn.setAttribute('data-type', 'item');
            btn.innerHTML = this.getObjByKey(o, this.items[act_index].key);
            this.body.appendChild(btn);
        }
    };
    AreaPicker.prototype.setPosition = function (refElem) {
        var el = this.wrap;
        if (el) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
            var pos = refElem.getBoundingClientRect();
            el.style.position = 'absolute';
            el.style.minWidth = (pos.right - pos.left) + 'px';
            if (document.body.clientHeight - pos.bottom < this.wrap.offsetHeight) {
                if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') < 0) {
                    this.addClass(this.wrap, 'areaPicker-top');
                }
                el.style.left = (pos.left + scrollLeft) + 'px';
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
    };
    AreaPicker.prototype.close = function () {
        if (this.wrap) {
            document.body.removeChild(this.wrap);
            this.wrap = null;
        }
    };
    AreaPicker.prototype.getObjByKey = function (data, keyStr) {
        if (data && typeof data === 'object') {
            var keys = keyStr.split('.');
            var obj = data;
            while (keys.length) {
                obj = obj[keys.shift()];
            }
            return obj;
        }
        else {
            return data;
        }
    };
    AreaPicker.prototype.getValuesStr = function () {
        var str = '';
        for (var i = 0, len = this.values.length; i < len; i++) {
            str += this.getObjByKey(this.values[i], this.items[i].key);
        }
        return str;
    };
    AreaPicker.prototype.addClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        if (classList.indexOf(className) < 0) {
            classList.push(className);
            elem.className = classList.join(' ');
        }
    };
    AreaPicker.prototype.removeClass = function (elem, className) {
        var classList = elem.className.split(/\s+/);
        var clsIndex = classList.indexOf(className);
        if (clsIndex >= 0) {
            classList.splice(clsIndex, 1);
            elem.className = classList.join(' ');
        }
    };
    return AreaPicker;
}());
var AreaPickerDirective = /** @class */ (function () {
    function AreaPickerDirective(elemRef) {
        this.elemRef = elemRef;
        this.ngModelChange = new core.EventEmitter();
        this.handlers = [];
        this.triggerListener = {
            event: 'focus'
        };
    }
    AreaPickerDirective.prototype.addEvent = function (elem, event, fn) {
        elem['addEventListener'](event, fn);
        this.handlers.push({
            elem: elem,
            event: event,
            fn: fn
        });
    };
    AreaPickerDirective.prototype.removeEvent = function (elem, event, fn) {
        try {
            for (var _a = __values(this.handlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var handler = _b.value;
                if (elem === handler.elem && event === handler.event && fn === handler.fn) {
                    elem['removeEventListener'](event, fn);
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_10) throw e_10.error; }
        }
        var e_10, _c;
    };
    AreaPickerDirective.prototype.clearEvents = function () {
        try {
            for (var _a = __values(this.handlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var handler = _b.value;
                handler.elem.removeEventListener(handler.event, handler.fn);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_11) throw e_11.error; }
        }
        var e_11, _c;
    };
    AreaPickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.triggerListener.fn = function (ev) {
            _this.addEvent(_this.elemRef.nativeElement, 'click', function (ev) {
                ev.stopPropagation();
            });
            var picker = _this.areaPicker;
            if (picker.wrap) {
                return;
            }
            picker.createWrap();
            picker.setPosition(_this.elemRef.nativeElement);
            picker.createHeader();
            picker.createBody();
            picker.clearBody();
            picker.activate(0);
            picker.init();
            _this.addEvent(picker.wrap, 'click', function (ev) {
                ev.stopPropagation();
                var target = ev.target || ev.srcElement;
                var type = target['getAttribute']('data-type');
                if (type === 'item') {
                    var dataIndex = target['getAttribute']('data-index');
                    var selectedData = picker.items[picker.index].data[dataIndex];
                    picker.items[picker.index].elem.innerHTML = picker.getObjByKey(selectedData, picker.items[picker.index].key);
                    var nextIndex = picker.index + 1;
                    picker.values.splice(picker.index + 1, picker.values.length - (picker.index + 1));
                    picker.values[picker.index] = selectedData;
                    var selectedCallback = picker.items[picker.index].selected;
                    if (nextIndex < picker.items.length) {
                        picker.clearBody();
                        picker.activate(nextIndex);
                    }
                    else {
                        if (typeof picker.done === 'function') {
                            _this.ngModelChange.emit(picker.getValuesStr());
                            picker.close();
                            _this.clearEvents();
                            picker.done(picker.values);
                        }
                    }
                    selectedCallback(selectedData);
                }
                else if (type === 'header') {
                    var index = parseInt(target['getAttribute']('data-index'));
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
            _this.addEvent(document, 'click', function () {
                _this.areaPicker.close();
                _this.clearEvents();
            });
            _this.addEvent(window, 'resize', function (ev) {
                if (_this.resizeTimer) {
                    clearTimeout(_this.resizeTimer);
                }
                _this.resizeTimer = setTimeout(function () {
                    _this.areaPicker.setPosition(_this.elemRef.nativeElement);
                }, 10);
            });
        };
        this.elemRef.nativeElement.addEventListener(this.triggerListener.event, this.triggerListener.fn);
    };
    AreaPickerDirective.prototype.ngOnDestroy = function () {
        this.elemRef.nativeElement.removeEventListener(this.triggerListener.event, this.triggerListener.fn);
    };
    return AreaPickerDirective;
}());
AreaPickerDirective.decorators = [
    { type: core.Component, args: [{
                selector: '[areaPicker]',
                template: '',
                styles: ["/deep/ .areaPicker{position:absolute;min-height:120px;max-width:360px;border:1px solid #aaa;background-color:#fff;font-size:14px;opacity:0}/deep/ .areaPicker .areaPicker-header{height:32px;width:100%;position:relative;left:0;top:0;border-bottom:1px solid #aaa;background-color:#f5f5f5}/deep/ .areaPicker .areaPicker-header:after{content:'';clear:both;display:block}/deep/ .areaPicker .areaPicker-body{padding:12px;max-height:150px;overflow-y:auto}/deep/ .areaPicker .areaPicker-body:after{content:'';clear:both;display:block}/deep/ .areaPicker .areaPicker-header-item{line-height:31px;text-align:center;padding:0 12px;float:left;border-right:1px solid #aaa;cursor:pointer;color:#666}/deep/ .areaPicker .areaPicker-header-item.active{border-bottom:1px solid #fff;margin-bottom:-1px;background-color:#fff!important;color:#333}/deep/ .areaPicker .areaPicker-header-item:hover{background-color:#fafafa}/deep/ .areaPicker .areaPicker-header-item:last-child{border-right:none;margin-right:10px}/deep/ .areaPicker .areaPicker-header-item:last-child:hover{border-right:1px solid #aaa}/deep/ .areaPicker .areaPicker-header-item.active:last-child{border-right:1px solid #aaa}/deep/ .areaPicker .areaPicker-item{margin-right:8px;line-height:18px;margin-bottom:6px;color:#666;cursor:pointer;float:left}/deep/ .areaPicker .areaPicker-item:hover{color:#000}/deep/ .areaPicker .areaPicker-loader{display:block;color:#999}"]
            },] },
];
AreaPickerDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
AreaPickerDirective.propDecorators = {
    "areaPicker": [{ type: core.Input },],
    "ngModelChange": [{ type: core.Output },],
};
var CurrencyFormatDirective = /** @class */ (function () {
    function CurrencyFormatDirective(elemRef) {
        this.elemRef = elemRef;
        this.separateLength = 3;
        this.accuracy = 2;
        this.separator = ',';
        this.ngModelChange = new core.EventEmitter();
    }
    CurrencyFormatDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.elemRef.nativeElement.value = _this.transform(_this.elemRef.nativeElement.value);
        });
        var inputFn = function (ev) {
            _this.ngModelChange.emit(_this.elemRef.nativeElement.value.replace(new RegExp(_this.separator, 'g'), ''));
            setTimeout(function () {
                _this.elemRef.nativeElement.value = _this.transform(_this.elemRef.nativeElement.value);
            }, 0);
        };
        var testinput = document.createElement('input');
        if ('oninput' in testinput) {
            this.elemRef.nativeElement.addEventListener("input", inputFn, false);
        }
        else {
            this.elemRef.nativeElement.onpropertychange = inputFn;
        }
    };
    CurrencyFormatDirective.prototype.ngOnChanges = function (changes) {
    };
    CurrencyFormatDirective.prototype.transform = function (value) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value) {
            return '';
        }
        var sep = this.separator;
        var inputStr = (value + '').replace(new RegExp(sep, 'g'), ''), numRegExp = /^[0-9]+(\.[0-9]+)?$/, str = inputStr.replace(/\s/g, ''), sepLen = this.separateLength;
        var result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                var splits = str.split('.');
                var intStr = splits[0];
                var ext = splits.length > 1 ? splits[1] : '';
                var intLen = intStr.length, newIntStr = '';
                if (intLen > sepLen) {
                    for (var i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
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
                result = inputStr;
            }
        }
        else {
            result = inputStr;
        }
        return result;
    };
    return CurrencyFormatDirective;
}());
CurrencyFormatDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[currencyFormat]'
            },] },
];
CurrencyFormatDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
CurrencyFormatDirective.propDecorators = {
    "ngModel": [{ type: core.Input },],
    "currencyFormat": [{ type: core.Input },],
    "ngModelChange": [{ type: core.Output },],
};
var Uploader = /** @class */ (function () {
    function Uploader() {
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
            upload: [],
            progress: [],
            success: [],
            overSize: [],
            overLength: [],
            error: [],
            complete: []
        };
        this.customData = {};
    }
    Uploader.prototype.trigger = function (handler, params) {
        var handlers = this.handlers[handler];
        if (handlers) {
            try {
                for (var handlers_1 = __values(handlers), handlers_1_1 = handlers_1.next(); !handlers_1_1.done; handlers_1_1 = handlers_1.next()) {
                    var fn = handlers_1_1.value;
                    if (params) {
                        fn.apply(this, params);
                    }
                    else {
                        fn.apply(this);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (handlers_1_1 && !handlers_1_1.done && (_a = handlers_1.return)) _a.call(handlers_1);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        var e_12, _a;
    };
    Uploader.prototype.upload = function () {
        var _this = this;
        var createData = function (index) {
            if (_this.uploadType === 0) {
                var uploadFile = _this.queue[index];
                var fd = new FormData();
                if (uploadFile.submitData && uploadFile.submitData instanceof Array) {
                    try {
                        for (var _a = __values(uploadFile.submitData), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var o = _b.value;
                            fd.append(o.name, o.value);
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                }
                else {
                    fd.append(uploadFile.name || _this.name, uploadFile.getFile(0));
                }
                return fd;
            }
            else if (_this.uploadType === 1) {
            }
            var e_13, _c;
        };
        var submit = function (index, data) {
            var next = function () {
                index++;
                if (index < _this.queue.length) {
                    submit(index, createData(index));
                }
                else {
                    _this.isUploading = false;
                    _this.trigger('complete', [_this]);
                }
            };
            var uploadFile = _this.queue[index];
            if (uploadFile.uploaded) {
                next();
                return;
            }
            var xhr = new XMLHttpRequest();
            uploadFile.xhr = xhr;
            xhr.open(_this.method.toLowerCase(), _this.url);
            for (var o in _this.headers) {
                xhr.setRequestHeader(o + '', _this.headers[o + '']);
            }
            xhr.upload.onprogress = function (evt) {
                var loaded = evt.loaded;
                var total = evt.total;
                var percent = Math.floor(100 * loaded / total);
                uploadFile.progress = percent;
                _this.trigger('progress', [percent, uploadFile, _this, index]);
            };
            xhr.onload = function () {
                uploadFile.uploaded = true;
                uploadFile.response = xhr.responseText;
                if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)) {
                    uploadFile.setError();
                    _this.trigger('error', [uploadFile, _this, index]);
                }
                else {
                    _this.trigger('success', [uploadFile, _this, index]);
                }
                next();
            };
            xhr.onerror = function (evt) {
                uploadFile.setError();
            };
            xhr.send(data);
        };
        this.trigger('upload', [this]);
        this.isUploading = true;
        submit(0, createData(0));
    };
    Uploader.prototype.compress = function (src, scale, quality) {
        return new Promise(function (resolve, reject) {
            if (quality < 0 || quality > 1) {
                quality = 1;
            }
            var localImg = new Image();
            localImg.src = src;
            localImg.onload = function (e) {
                var that = localImg;
                var comScale = parseFloat(scale + '');
                var w = that.width * comScale, h = that.height * comScale;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var anw = document.createAttribute("width");
                anw.nodeValue = w + '';
                var anh = document.createAttribute("height");
                anh.nodeValue = h + '';
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                var base64 = canvas.toDataURL('image/jpeg', parseFloat(quality + ''));
                resolve(base64);
            };
            localImg.onerror = function () {
                reject(src);
            };
        });
    };
    Uploader.prototype.createBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(file);
            };
        });
    };
    Uploader.prototype.getBase64FileSize = function (base64Str) {
        var splitStr = base64Str.split(',');
        var str = splitStr[splitStr.length - 1].replace(/=/g, '');
        var strLength = str.length;
        return Math.round(strLength - (strLength / 8) * 2);
    };
    Uploader.prototype.getBase64FileData = function (base64Str) {
        var splitStr = base64Str.split(',');
        return splitStr[splitStr.length - 1];
    };
    Uploader.prototype.onSelect = function (fn) {
        this.handlers.select.push(fn);
        return this;
    };
    Uploader.prototype.onOverSize = function (fn) {
        this.handlers.overSize.push(fn);
        return this;
    };
    Uploader.prototype.onOverLength = function (fn) {
        this.handlers.overLength.push(fn);
        return this;
    };
    Uploader.prototype.onQueue = function (fn) {
        this.handlers.queue.push(fn);
        return this;
    };
    Uploader.prototype.onQueueAll = function (fn) {
        this.handlers.queueAll.push(fn);
        return this;
    };
    Uploader.prototype.onUpload = function (fn) {
        this.handlers.upload.push(fn);
        return this;
    };
    Uploader.prototype.onProgress = function (fn) {
        this.handlers.progress.push(fn);
        return this;
    };
    Uploader.prototype.onSuccess = function (fn) {
        this.handlers.success.push(fn);
        return this;
    };
    Uploader.prototype.onComplete = function (fn) {
        this.handlers.complete.push(fn);
        return this;
    };
    Uploader.prototype.onError = function (fn) {
        this.handlers.error.push(fn);
        return this;
    };
    return Uploader;
}());
var UploadFile = /** @class */ (function () {
    function UploadFile() {
        this.compressed = false;
        this.progress = 0;
        this.uploaded = false;
        this.success = false;
        this.error = false;
        this.response = null;
        this.submitData = [];
        this.customData = {};
    }
    UploadFile.prototype.setSuccess = function () {
        this.success = true;
        this.error = false;
    };
    UploadFile.prototype.setError = function () {
        this.success = false;
        this.error = true;
    };
    UploadFile.prototype.getFile = function (type) {
        var result;
        if (type === 1) {
            if (this.compressed) {
                result = this.compressedDataUrl;
            }
            else {
                result = this.dataUrl;
            }
        }
        else {
            if (this.compressed) {
                result = this.createBlob(this.compressedDataUrl);
            }
            else {
                result = this.file;
            }
        }
        return result;
    };
    UploadFile.prototype.addSubmitData = function (name, value) {
        if (!(this.submitData instanceof Array)) {
            this.submitData = [];
        }
        this.submitData.push({
            name: name,
            value: value
        });
    };
    UploadFile.prototype.createBlob = function (dataUrl) {
        var arr = dataUrl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1].replace(/\s/g, ''));
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    return UploadFile;
}());
var UploaderDirective = /** @class */ (function () {
    function UploaderDirective(el) {
        var _this = this;
        this.el = el;
        this.el.nativeElement.addEventListener('change', function (event) {
            var ev = event || window.event;
            var target = ev.target || ev.srcElement;
            var files = target.files;
            _this.uploader.trigger('select', [files]);
            _this.queueFiles(files);
        });
    }
    UploaderDirective.prototype.queue = function (uploadFile) {
        this.uploader.queue.push(uploadFile);
        this.uploader.trigger('queue', [uploadFile]);
    };
    UploaderDirective.prototype.triggerQueueAll = function () {
        this.uploader.trigger('queueAll', [this.uploader.queue]);
    };
    UploaderDirective.prototype.queueFiles = function (files) {
        var _this = this;
        if (files.length > this.uploader.maxLength) {
            this.uploader.trigger('overLength', [files.length, this.uploader.maxLength]);
            return;
        }
        var fn = function (index) {
            var file = files[index];
            var uploadFile = new UploadFile();
            uploadFile.fileName = file.name;
            uploadFile.fileType = file.type;
            uploadFile.fileSize = file.size;
            uploadFile.file = file;
            var fileNameSplit = file.name.split('.');
            uploadFile.fileExtension = ('.' + fileNameSplit[fileNameSplit.length - 1]).toLowerCase();
            var check = function () {
                index++;
                if (index < files.length) {
                    fn(index);
                }
                else {
                    _this.triggerQueueAll();
                }
            };
            if (_this.uploader.maxSize && uploadFile.fileSize > _this.uploader.maxSize) {
                _this.uploader.trigger('overSize', [uploadFile.fileSize, _this.uploader.maxSize, uploadFile]);
                check();
                return;
            }
            else if (_this.uploader.maxLength && _this.uploader.queue.length >= _this.uploader.maxLength) {
                _this.uploader.trigger('overLength', [files.length, _this.uploader.maxLength]);
                _this.triggerQueueAll();
                return;
            }
            if (_this.uploader.isCompress) {
                if (uploadFile.fileType.indexOf('image/') >= 0) {
                    _this.uploader.createBase64(file)
                        .then(function (data) {
                        uploadFile.dataUrl = data;
                        var scale = _this.compressScale || 1, quality = _this.compressQuality || 0.7;
                        return _this.uploader.compress(data, scale, quality);
                    })
                        .then(function (dataUrl) {
                        uploadFile.compressed = true;
                        uploadFile.fileSize = _this.uploader.getBase64FileSize(dataUrl);
                        uploadFile.compressedDataUrl = dataUrl;
                        _this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    _this.queue(uploadFile);
                    check();
                }
            }
            else {
                if (_this.uploader.uploadType === 1 || _this.uploader.isPreview) {
                    _this.uploader.createBase64(file)
                        .then(function (data) {
                        uploadFile.fileSize = _this.uploader.getBase64FileSize(data);
                        uploadFile.dataUrl = data;
                        _this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    _this.queue(uploadFile);
                    check();
                }
            }
        };
        fn(0);
    };
    return UploaderDirective;
}());
UploaderDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uploader]'
            },] },
];
UploaderDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
UploaderDirective.propDecorators = {
    "uploader": [{ type: core.Input },],
    "compressScale": [{ type: core.Input },],
    "compressQuality": [{ type: core.Input },],
};
var UploaderModule = /** @class */ (function () {
    function UploaderModule() {
    }
    return UploaderModule;
}());
UploaderModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    UploaderDirective
                ],
                providers: [],
                exports: [
                    UploaderDirective,
                ]
            },] },
];
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    return LayoutModule;
}());
LayoutModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
var NavModule = /** @class */ (function () {
    function NavModule() {
    }
    return NavModule;
}());
NavModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule
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
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    return ModalModule;
}());
ModalModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
var CheckboxModule = /** @class */ (function () {
    function CheckboxModule() {
    }
    return CheckboxModule;
}());
CheckboxModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                declarations: [
                    CheckboxComponent
                ],
                providers: [],
                exports: [
                    common.CommonModule,
                    forms.FormsModule,
                    CheckboxComponent
                ]
            },] },
];
var RadioModule = /** @class */ (function () {
    function RadioModule() {
    }
    return RadioModule;
}());
RadioModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                declarations: [
                    RadioComponent
                ],
                providers: [],
                exports: [
                    common.CommonModule,
                    forms.FormsModule,
                    RadioComponent
                ]
            },] },
];
var ToggleModule = /** @class */ (function () {
    function ToggleModule() {
    }
    return ToggleModule;
}());
ToggleModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                declarations: [
                    ToggleComponent
                ],
                providers: [],
                exports: [
                    common.CommonModule,
                    forms.FormsModule,
                    ToggleComponent
                ]
            },] },
];
var ValidateModule = /** @class */ (function () {
    function ValidateModule() {
    }
    return ValidateModule;
}());
ValidateModule.decorators = [
    { type: core.NgModule, args: [{
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
var FormsModule$1 = /** @class */ (function () {
    function FormsModule$1() {
    }
    return FormsModule$1;
}());
FormsModule$1.decorators = [
    { type: core.NgModule, args: [{
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
var LoaderModule = /** @class */ (function () {
    function LoaderModule() {
    }
    return LoaderModule;
}());
LoaderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
var GalleryModule = /** @class */ (function () {
    function GalleryModule() {
    }
    return GalleryModule;
}());
GalleryModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
var PaginatorModule = /** @class */ (function () {
    function PaginatorModule() {
    }
    return PaginatorModule;
}());
PaginatorModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
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
var QBtnGroupModule = /** @class */ (function () {
    function QBtnGroupModule() {
    }
    return QBtnGroupModule;
}());
QBtnGroupModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                declarations: [
                    QBtnGroupComponent
                ],
                providers: [],
                exports: [
                    common.CommonModule,
                    forms.FormsModule,
                    QBtnGroupComponent
                ]
            },] },
];
var BtnBackModule = /** @class */ (function () {
    function BtnBackModule() {
    }
    return BtnBackModule;
}());
BtnBackModule.decorators = [
    { type: core.NgModule, args: [{
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
var TextMaxLengthModule = /** @class */ (function () {
    function TextMaxLengthModule() {
    }
    return TextMaxLengthModule;
}());
TextMaxLengthModule.decorators = [
    { type: core.NgModule, args: [{
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
var ToggleClassModule = /** @class */ (function () {
    function ToggleClassModule() {
    }
    return ToggleClassModule;
}());
ToggleClassModule.decorators = [
    { type: core.NgModule, args: [{
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
var CommonModule$1 = /** @class */ (function () {
    function CommonModule$1() {
    }
    return CommonModule$1;
}());
CommonModule$1.decorators = [
    { type: core.NgModule, args: [{
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
var DatetimePickerModule = /** @class */ (function () {
    function DatetimePickerModule() {
    }
    return DatetimePickerModule;
}());
DatetimePickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
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
var CurrencyFormatPipe = /** @class */ (function () {
    function CurrencyFormatPipe() {
        this.separateLength = 3;
        this.accuracy = 2;
        this.format = '';
        this.separator = ',';
    }
    CurrencyFormatPipe.prototype.transform = function (value, param) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (!value && value !== 0) {
            return '';
        }
        var sep = this.separator;
        var flag = '';
        var inputStr = value + '';
        flag = (inputStr.indexOf('-') >= 0 ? '-' : inputStr.indexOf('+') >= 0 ? '+' : '');
        inputStr = inputStr.replace(/[^\d\.]/g, '');
        var numRegExp = /^[\-\+]?[0-9]+(\.[0-9]+)?$/, str = inputStr.replace(/\s/g, ''), accuracy = this.accuracy, format = this.format, sepLen = this.separateLength;
        var nums = [];
        var strs = [];
        if (typeof param === 'string') {
            strs.push(param);
        }
        else if (typeof param === 'number') {
            nums.push(param);
        }
        else if (param instanceof Array) {
            try {
                for (var param_1 = __values(param), param_1_1 = param_1.next(); !param_1_1.done; param_1_1 = param_1.next()) {
                    var o = param_1_1.value;
                    if (typeof o === 'string') {
                        strs.push(o);
                    }
                    else if (typeof o === 'number') {
                        nums.push(o);
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (param_1_1 && !param_1_1.done && (_a = param_1.return)) _a.call(param_1);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        if (nums.length > 0) {
            accuracy = nums[0];
        }
        if (nums.length > 1) {
            sepLen = nums[1];
        }
        if (strs.length > 0) {
            format = strs[0];
        }
        if (strs.length > 1) {
            sep = strs[1];
        }
        var result = '';
        if (numRegExp.test(str)) {
            if (sepLen) {
                str = parseFloat(str).toFixed(accuracy) + '';
                var splits = str.split('.');
                var intStr = splits[0];
                var ext = splits.length > 1 ? splits[1] : '';
                if (ext.length < accuracy) {
                    var fillLen = accuracy - ext.length;
                    for (var i = 0; i < fillLen; i++) {
                        ext += '0';
                    }
                }
                var intLen = intStr.length, newIntStr = '';
                if (intLen > sepLen) {
                    for (var i = intLen - sepLen; i > 0 - sepLen; i = i - sepLen) {
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
                result = inputStr;
            }
            if (format) {
                var index = format.indexOf('xx');
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
        var e_14, _a;
    };
    return CurrencyFormatPipe;
}());
CurrencyFormatPipe.decorators = [
    { type: core.Pipe, args: [{ name: 'currencyFormat' },] },
];
var CurrencyFormatModule = /** @class */ (function () {
    function CurrencyFormatModule() {
    }
    return CurrencyFormatModule;
}());
CurrencyFormatModule.decorators = [
    { type: core.NgModule, args: [{
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
var DatePipe = /** @class */ (function () {
    function DatePipe() {
        this.format = 'yyyy-MM-dd';
    }
    DatePipe.prototype.createDate = function (dateStr) {
        var date = new Date(dateStr);
        if (date + '' === 'Invalid Date') {
            date = new Date(dateStr.replace(/-/g, '/').replace(/\.\d+$/, ''));
            if (date + '' === 'Invalid Date') {
                return null;
            }
        }
        return date;
    };
    DatePipe.prototype.transform = function (value, fmt) {
        if (value) {
            var date = void 0;
            if (value instanceof Date) {
                date = value;
            }
            else if (typeof value === 'string') {
                date = this.createDate(value);
            }
            if (!date) {
                return value;
            }
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };
            if (!fmt) {
                fmt = this.format;
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            return fmt;
        }
        else {
            return value;
        }
    };
    return DatePipe;
}());
DatePipe.decorators = [
    { type: core.Pipe, args: [{ name: 'date' },] },
];
var DateFormatModule = /** @class */ (function () {
    function DateFormatModule() {
    }
    return DateFormatModule;
}());
DateFormatModule.decorators = [
    { type: core.NgModule, args: [{
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
var NullReplacePipe = /** @class */ (function () {
    function NullReplacePipe() {
        this.fmt = '--';
    }
    NullReplacePipe.prototype.transform = function (value, fmt) {
        if (value === undefined || value === null || value === '') {
            var result = fmt || this.fmt;
            return result;
        }
        else {
            return value;
        }
    };
    return NullReplacePipe;
}());
NullReplacePipe.decorators = [
    { type: core.Pipe, args: [{ name: 'nullReplace' },] },
];
var NullReplaceModule = /** @class */ (function () {
    function NullReplaceModule() {
    }
    return NullReplaceModule;
}());
NullReplaceModule.decorators = [
    { type: core.NgModule, args: [{
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
var AreaPickerModule = /** @class */ (function () {
    function AreaPickerModule() {
    }
    return AreaPickerModule;
}());
AreaPickerModule.decorators = [
    { type: core.NgModule, args: [{
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
var DropDownModule = /** @class */ (function () {
    function DropDownModule() {
    }
    return DropDownModule;
}());
DropDownModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
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
var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
SliderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
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
var PopService = /** @class */ (function () {
    function PopService() {
        this.animated = true;
        this.eventList = [];
    }
    PopService.prototype.init = function () {
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
    };
    PopService.prototype.show = function () {
        var _this = this;
        this.popWrap = document.createElement('DIV');
        this.popWrap.className = 'pop-wrap' + ' ' + this.type;
        document.body.appendChild(this.popWrap);
        var pop = document.createElement('DIV');
        pop.className = 'pop-main';
        var popHeader = document.createElement('DIV');
        popHeader.className = 'pop-header';
        popHeader.innerHTML = '<div class="alert-title">' + this.title + '</div>';
        this.closeButton = document.createElement('span');
        this.closeButton.className = 'pop-btn-close';
        this.closeButton.innerHTML = '×';
        this.addEvent(this.closeButton, 'click', function () {
            _this.close();
            try {
                for (var _a = __values(_this.closeHandlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var handler = _b.value;
                    handler.apply(_this);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_15) throw e_15.error; }
            }
            var e_15, _c;
        });
        popHeader.appendChild(this.closeButton);
        pop.appendChild(popHeader);
        var popBody = document.createElement('DIV');
        popBody.className = 'pop-body';
        if (this.textAlign === 'center') {
            popBody.className = 'pop-body pop-body-txt-center';
        }
        var popIcon = document.createElement('DIV');
        popIcon.className = 'pop-icon';
        var iconHTML = (this.iconClass !== undefined && this.iconClass !== '') ? '<i class="' + this.iconClass + '"></i>' : '';
        var popText = document.createElement('DIV');
        popText.className = 'pop-text';
        popText.innerHTML = iconHTML + this.text;
        popBody.appendChild(popText);
        pop.appendChild(popBody);
        var popFooter = document.createElement('DIV');
        popFooter.className = 'pop-footer';
        var dottingHTML = '...';
        if (this.showConfirmButton) {
            var btnConfirm_1 = document.createElement('BUTTON');
            var btnConfirmClassList_1 = ['btn', 'btn-' + this.confirmButtonType];
            btnConfirm_1.className = btnConfirmClassList_1.join(' ');
            btnConfirm_1.innerHTML = this.confirmButtonText;
            popFooter.appendChild(btnConfirm_1);
            this.confirmButton = btnConfirm_1;
            this.addEvent(btnConfirm_1, 'click', function () {
                if (_this.confirmed || _this.canceled) {
                    _this.close();
                    return;
                }
                if (_this.closeOnConfirm) {
                    _this.close();
                }
                else if (_this.showLoaderOnConfirm) {
                    btnConfirmClassList_1.push('disabled');
                    btnConfirm_1.className = btnConfirmClassList_1.join(' ');
                    btnConfirm_1.innerHTML = _this.confirmLoaderText + dottingHTML;
                }
                try {
                    for (var _a = __values(_this.confirmHandlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var handler = _b.value;
                        handler.apply(_this);
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
                _this.confirmed = true;
                var e_16, _c;
            });
        }
        if (this.showCancelButton) {
            var btnCancel_1 = document.createElement('BUTTON');
            var btnCancelClassList_1 = ['btn', 'btn-' + this.cancelButtonType];
            btnCancel_1.className = btnCancelClassList_1.join(' ');
            btnCancel_1.innerHTML = this.cancelButtonText;
            popFooter.appendChild(btnCancel_1);
            this.addEvent(btnCancel_1, 'click', function () {
                if (_this.canceled || _this.confirmed) {
                    _this.close();
                    return;
                }
                if (_this.closeOnCancel) {
                    _this.close();
                }
                else if (_this.showLoaderOnCancel) {
                    btnCancelClassList_1.push('disabled');
                    btnCancel_1.className = btnCancelClassList_1.join(' ');
                    btnCancel_1.innerHTML = _this.cancelLoaderText + dottingHTML;
                }
                try {
                    for (var _a = __values(_this.cancelHandlers), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var handler = _b.value;
                        handler.apply(_this);
                    }
                }
                catch (e_17_1) { e_17 = { error: e_17_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_17) throw e_17.error; }
                }
                _this.canceled = true;
                var e_17, _c;
            });
            this.cancelButton = btnCancel_1;
        }
        pop.appendChild(popFooter);
        this.popWrap.appendChild(pop);
        if (this.animated) {
            setTimeout(function () {
                _this.popWrap.className = _this.popWrap.className + ' animated';
            }, 10);
        }
        else {
            this.popWrap.className = this.popWrap.className + ' animated';
        }
    };
    PopService.prototype.close = function () {
        this.removePop();
    };
    PopService.prototype.removePop = function () {
        if (this.popWrap !== null && this.popWrap !== undefined) {
            try {
                document.body.removeChild(this.popWrap);
            }
            catch (err) {
            }
        }
    };
    PopService.prototype.setOptions = function (opt) {
        for (var prop in opt) {
            this[prop] = opt[prop];
        }
    };
    PopService.prototype.getArgs = function (arg) {
        var strs = [], opts = { text: '' };
        if (arguments.length) {
            for (var i = 0, len = arguments.length; i < len; i++) {
                var arg_1 = arguments[i][0];
                if (typeof arg_1 === 'string') {
                    strs.push(arg_1);
                }
                else if (arg_1 && typeof arg_1 === 'object') {
                    for (var o in arg_1) {
                        opts[o + ''] = arg_1[o + ''];
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
    };
    PopService.prototype.confirm = function (text, title, opt) {
        this.init();
        this.type = 'confirm';
        this.showConfirmButton = true;
        this.showCancelButton = true;
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    PopService.prototype.info = function (text, title, opt) {
        this.init();
        this.type = 'info';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    PopService.prototype.error = function (text, title, opt) {
        this.init();
        this.type = 'error';
        this.showConfirmButton = true;
        this.showCancelButton = false;
        this.confirmButtonType = 'danger';
        this.title = '错误';
        var options = this.getArgs(arguments);
        this.setOptions(options);
        this.show();
        return this;
    };
    PopService.prototype.onConfirm = function (handler) {
        this.confirmHandlers.push(handler);
        return this;
    };
    PopService.prototype.onCancel = function (handler) {
        this.cancelHandlers.push(handler);
        return this;
    };
    PopService.prototype.onClose = function (handler) {
        this.closeHandlers.push(handler);
        return this;
    };
    PopService.prototype.clearEvents = function () {
        try {
            for (var i = 0, len = this.eventList.length; i < len; i++) {
                this.eventList[i].target.removeEventListener(this.eventList[i].event, this.eventList[i].handler);
            }
            this.eventList = [];
        }
        catch (err) {
            console.log(err);
        }
    };
    PopService.prototype.addEvent = function (target, event, handler) {
        target.addEventListener(event, handler);
        this.eventList.push({ target: target, handler: handler, event: event });
    };
    return PopService;
}());
var Toaster = /** @class */ (function () {
    function Toaster() {
        this.toasters = [];
    }
    Toaster.prototype.pop = function (options) {
        var _this = this;
        var delay = options.delay || 5000;
        var animated = options.animated !== undefined ? options.animated : true;
        if (this.container === null || this.container === undefined) {
            var container = document.getElementById('toast-container');
            if (container === null) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-top-center';
                document.body.appendChild(container);
            }
            this.container = container;
        }
        var toast = document.createElement('DIV');
        var toastClass = ['toast', 'ng-leave', 'ng-leave-active'];
        var type = 'info';
        if (options.type) {
            var types = ['success', 'error', 'info', 'wait', 'warning'];
            if (types.indexOf(options.type) >= 0) {
                type = options.type;
            }
        }
        toastClass.push('toast-' + type);
        if (animated) {
            toastClass.push('ng-animate');
        }
        toast.className = toastClass.join(' ');
        var closeBtn = document.createElement('BUTTON');
        closeBtn.className = 'toast-close-button';
        closeBtn.innerHTML = '×';
        var message = document.createElement('div');
        message.innerHTML = "<div>" + options.message + "</div>";
        toast.appendChild(closeBtn);
        if (options.title) {
            var title = document.createElement('DIV');
            title.className = 'toast-title';
            title.innerHTML = options.title;
            toast.appendChild(title);
        }
        toast.appendChild(message);
        this.container.insertBefore(toast, this.container.firstChild);
        setTimeout(function () {
            var classList = toast.className.split(/\s+/);
            var clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex >= 0) {
                classList.splice(clsIndex, 1);
                toast.className = classList.join(' ');
            }
        });
        var timer = this.delayCloseTimer(toast, delay);
        closeBtn.addEventListener('click', function () {
            _this.container.removeChild(toast);
            toast = null;
        });
        toast.addEventListener('mouseover', function () {
            clearTimeout(timer);
            timer = null;
        });
        toast.addEventListener('mouseleave', function () {
            timer = _this.delayCloseTimer(toast, delay);
        });
    };
    Toaster.prototype.delayCloseTimer = function (toast, delay) {
        var _this = this;
        return setTimeout(function () {
            var classList = toast.className.split(/\s+/);
            var clsIndex = classList.indexOf('ng-leave-active');
            if (clsIndex < 0) {
                classList.push('ng-leave-active');
                toast.className = classList.join(' ');
            }
            setTimeout(function () {
                _this.container.removeChild(toast);
                toast = null;
            }, 1500);
        }, delay);
    };
    Toaster.prototype.createOptions = function (type, args) {
        var opt = {
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
    };
    Toaster.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('info', args));
    };
    Toaster.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('success', args));
    };
    Toaster.prototype.wait = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('wait', args));
    };
    Toaster.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('warning', args));
    };
    Toaster.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.pop(this.createOptions('error', args));
    };
    return Toaster;
}());

exports.QBtnGroupComponent = QBtnGroupComponent;
exports.PaginatorComponent = PaginatorComponent;
exports.GalleryComponent = GalleryComponent;
exports.SpinnerComponent = SpinnerComponent;
exports.CheckboxComponent = CheckboxComponent;
exports.RadioComponent = RadioComponent;
exports.ToggleComponent = ToggleComponent;
exports.ModalBodyComponent = ModalBodyComponent;
exports.ModalHeaderComponent = ModalHeaderComponent;
exports.ModalFooterComponent = ModalFooterComponent;
exports.ModalComponent = ModalComponent;
exports.RootContainerComponent = RootContainerComponent;
exports.AsideLeftComponent = AsideLeftComponent;
exports.HeaderComponent = HeaderComponent;
exports.HeaderLeftComponent = HeaderLeftComponent;
exports.HeaderRightComponent = HeaderRightComponent;
exports.DeleteWrapComponent = DeleteWrapComponent;
exports.NavWrapComponent = NavWrapComponent;
exports.NavItemComponent = NavItemComponent;
exports.SubNavItemComponent = SubNavItemComponent;
exports.ThirthNavItemComponent = ThirthNavItemComponent;
exports.DatetimePickerComponent = DatetimePickerComponent;
exports.DropDownComponent = DropDownComponent;
exports.SliderComponent = SliderComponent;
exports.ToggleClassDirective = ToggleClassDirective;
exports.BtnBackDirective = BtnBackDirective;
exports.TextMaxLengthDirective = TextMaxLengthDirective;
exports.HTML5ValidateDirective = HTML5ValidateDirective;
exports.AreaPicker = AreaPicker;
exports.AreaPickerDirective = AreaPickerDirective;
exports.CurrencyFormatDirective = CurrencyFormatDirective;
exports.UploaderModule = UploaderModule;
exports.Uploader = Uploader;
exports.UploadFile = UploadFile;
exports.LayoutModule = LayoutModule;
exports.NavModule = NavModule;
exports.ModalModule = ModalModule;
exports.FormsModule = FormsModule$1;
exports.LoaderModule = LoaderModule;
exports.GalleryModule = GalleryModule;
exports.PaginatorModule = PaginatorModule;
exports.CommonModule = CommonModule$1;
exports.DatetimePickerModule = DatetimePickerModule;
exports.CurrencyFormatModule = CurrencyFormatModule;
exports.DateFormatModule = DateFormatModule;
exports.NullReplaceModule = NullReplaceModule;
exports.AreaPickerModule = AreaPickerModule;
exports.DropDownModule = DropDownModule;
exports.SliderModule = SliderModule;
exports.CheckboxModule = CheckboxModule;
exports.RadioModule = RadioModule;
exports.ToggleModule = ToggleModule;
exports.ValidateModule = ValidateModule;
exports.ToggleClassModule = ToggleClassModule;
exports.BtnBackModule = BtnBackModule;
exports.QBtnGroupModule = QBtnGroupModule;
exports.TextMaxLengthModule = TextMaxLengthModule;
exports.CurrencyFormatPipe = CurrencyFormatPipe;
exports.DatePipe = DatePipe;
exports.NullReplacePipe = NullReplacePipe;
exports.PopService = PopService;
exports.Toaster = Toaster;
exports.ɵa = UploaderDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=start.umd.js.map
