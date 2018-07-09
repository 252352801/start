import { EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy, ElementRef } from '@angular/core';
import { ModalBodyComponent } from './modal-body.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalFooterComponent } from './modal-footer.component';
export { ModalBodyComponent };
export { ModalHeaderComponent };
export { ModalFooterComponent };
export declare class ModalComponent implements OnInit, OnChanges, OnDestroy {
    private elemRef;
    visible: boolean;
    visibleChange: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    onClose: EventEmitter<any>;
    overflow: boolean;
    animated: boolean;
    size: string;
    styleClass: string;
    fullHeight: boolean | string;
    disabled: any;
    width: any;
    isRender: boolean;
    isShow: boolean;
    isReady: boolean;
    outClickClose: boolean;
    showCloseButton: boolean;
    isTransition: boolean;
    modal: ElementRef;
    modalDialog: ElementRef;
    modalHeader: ModalHeaderComponent;
    modalBody: ModalBodyComponent;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 背景点击处理
     */
    bgClickAction(ev: any): void;
    open(): void;
    close(): Promise<any>;
    private showModal();
    private hideModal(callback?);
    testAndResetBody(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * 初始化modal-body的高度/限高
     */
    private initBodyStyle();
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    private addClass(elem, className);
    /**
     * 删除某个类
     * @param elem
     * @param className
     */
    private removeClass(elem, className);
}
