import { OnInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { AreaPicker } from './area-picker';
export declare class AreaPickerDirective implements OnInit, OnDestroy {
    private elemRef;
    areaPicker: AreaPicker;
    ngModelChange: EventEmitter<any>;
    private handlers;
    private triggerListener;
    resizeTimer: any;
    constructor(elemRef: ElementRef);
    /**
     * 添加事件
     * @param elem
     * @param event
     * @param fn
     */
    private addEvent(elem, event, fn);
    /**
     * 移除事件
     * @param elem
     * @param event
     * @param fn
     */
    private removeEvent(elem, event, fn);
    /**
     * 清空事件
     */
    private clearEvents();
    ngOnInit(): void;
    ngOnDestroy(): void;
}
