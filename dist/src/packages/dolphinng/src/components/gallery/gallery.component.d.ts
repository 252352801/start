import { ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class GalleryComponent implements OnInit, OnDestroy {
    private eleRef;
    data: any[];
    dataProps: string[];
    size: any;
    change: EventEmitter<any>;
    title: string;
    isFullScreen: boolean;
    images: string[];
    render: boolean;
    visible: boolean;
    ready: boolean;
    left: number | string;
    top: number | string;
    tempLeft: number | string;
    tempTop: number | string;
    thumbScrollWidth: number;
    private transitionTime;
    activeIndex: number;
    isThumbOverflow: boolean;
    isEventSource: boolean;
    isShowTools: boolean;
    isSupportCssObjectFit: boolean;
    private resizeCheckTimer;
    private thumbSlideTimer;
    private resizeHandler;
    private windowClickHandler;
    private keydownHandler;
    private tween;
    constructor(eleRef: ElementRef);
    removeEvents(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 检查是否溢出
     */
    private checkIsThumbOverflow();
    /**
     * 初始化图片数据
     * @param data
     * @param props
     */
    private initImages(data, props);
    slideThumbAfterChange(direction: number): void;
    /**
     * 缩略图滚动
     * @param elem
     * @param direction
     */
    slideThumb(elem: HTMLElement, direction: number): void;
    /**
     * 滚动
     * @param elem 滚动的元素
     * @param val  滚动值
     */
    slide(elem: HTMLElement, val: number): void;
    /**
     * 通过属性名获取值
     * @param obj
     * @param pros
     * @returns any
     */
    private getValueByProps(obj, pros);
    /**
     * 打开
     */
    open(...args: any[]): void;
    /**
     * 根据尺寸设置位置
     */
    private setPositionAccordingSize();
    /**
     * 关闭
     */
    close(): void;
    /**
     * 全屏切换
     */
    toggleFullScreen(): void;
    /**
     * 点击空白处
     */
    whiteSpaceClickAction(): void;
    wrapClickAction(ev: Event): void;
    /**
     * 上一张
     */
    prev(): void;
    /**
     * 下一张
     */
    next(): void;
    /**
     * 激活指定图片到当前窗口
     * @param index
     */
    activate(index: number): void;
    /**
     * 获取鼠标位置
     * @param e
     * @returns <{left: number; top: number}>
     */
    private getMousePosition(e);
    /**
     * 显示/隐藏工具
     * @param ev
     */
    toggleShowTools(ev: Event): void;
}
