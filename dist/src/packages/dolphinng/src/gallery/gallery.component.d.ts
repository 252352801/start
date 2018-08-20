import { ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class GalleryComponent implements OnInit, OnDestroy {
    private eleRef;
    data: any[];
    dataProps: string[];
    size: any;
    title: string;
    isAnimation: boolean;
    isHeader: boolean;
    isToolsBar: boolean;
    isBtnDownload: boolean;
    change: EventEmitter<any>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    galleryBody: ElementRef;
    isFullScreen: boolean;
    images: {
        url: string;
        scale: number;
        rotate: number;
        left: number;
        top: number;
    }[];
    render: boolean;
    visible: boolean;
    ready: boolean;
    width: any;
    height: any;
    left: number | string;
    top: number | string;
    tempLeft: number | string;
    tempTop: number | string;
    thumbScrollWidth: number;
    private transitionTime;
    activeIndex: number;
    transition: string;
    isThumbOverflow: boolean;
    isEventSource: boolean;
    isShowBtns: boolean;
    isSupportCssObjectFit: boolean;
    private resizeCheckTimer;
    private thumbSlideTimer;
    private resizeHandler;
    private windowClickHandler;
    private keydownHandler;
    private mouseWheelHandler;
    private isPressing;
    private tween;
    private bodyPadR;
    private mousePosition;
    private mouseClickedPoint;
    isShowScaleInfo: boolean;
    private hideScaleInfoTimer;
    constructor(eleRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 鼠标在图片上按下时
     * @param ev
     */
    onMouseDownImg(ev: MouseEvent): void;
    /**
     * 鼠标弹起
     * @param ev
     */
    onMouseUpImg(ev: MouseEvent): void;
    /**
     * 鼠标在图片上移动
     * @param ev
     */
    onMouseMoveImg(ev: MouseEvent): void;
    /**
     * 禁止事件冒泡
     * @param ev
     */
    stopPropagation(ev: MouseEvent): void;
    /**
     * 清除事件
     */
    removeEvents(): void;
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
    /**
     * 改变显示图片后滑动（如果需要）缩略图
     * @param direction
     */
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
    private show();
    /**
     * 监听窗口事件
     */
    private addWindowListeners();
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
    /**
     * 最外层容器点击处理
     * @param ev
     */
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
     */
    toggleShowTools(): void;
    /**
     * 放大
     * @param val
     */
    enlarge(val: number): void;
    /**
     * 缩小
     * @param val
     */
    reduce(val: number): void;
    /**
     * 显示缩放比例信息
     */
    private showScaleInfo();
    /**
     * 旋转
     */
    rotate(): void;
    /**
     * 下载
     */
    download(): void;
    /**
     * 隐藏document.body的滚动条（如果有的话）
     */
    private hideBodyScrollBar();
    /**
     * 重新显示document.body的滚动条（如果有的话）
     */
    private reShowBodyScrollBar();
}
