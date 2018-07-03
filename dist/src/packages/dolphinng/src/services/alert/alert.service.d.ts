export interface AlertOptions {
    title?: string;
    text: string;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonType?: string;
    cancelButtonType?: string;
    textAlign?: string;
    iconClass?: string;
    closeOnConfirm?: boolean;
    closeOnCancel?: boolean;
    showLoaderOnConfirm?: boolean;
    showLoaderOnCancel?: boolean;
    confirmLoaderText?: string;
    cancelLoaderText?: string;
}
export declare class AlertService {
    private type;
    private title;
    private text;
    private confirmButtonText;
    private cancelButtonText;
    private showConfirmButton;
    private showCancelButton;
    private confirmButtonType;
    private cancelButtonType;
    private closeOnConfirm;
    private closeOnCancel;
    private showLoaderOnConfirm;
    private showLoaderOnCancel;
    private confirmLoaderText;
    private cancelLoaderText;
    private textAlign;
    private iconClass;
    private confirmed;
    private canceled;
    private animated;
    private confirmHandlers;
    private cancelHandlers;
    private closeHandlers;
    private popWrap;
    private confirmButton;
    private cancelButton;
    private closeButton;
    private eventList;
    constructor();
    /**
     * 初始化
     */
    private init();
    /**
     * 显示
     */
    private show();
    /**
     * 关闭
     */
    close(): void;
    /**
     * 移除
     */
    private removePop();
    /**
     * 设置参数
     * @param opt
       */
    private setOptions(opt);
    private getArgs(arg);
    /**
     * 打开确认框
     * @param text
     * @param title
     * @param opt
     * @returns AlertService
     */
    confirm(text?: any, title?: any, opt?: AlertOptions): AlertService;
    /**
     * 打开消息框
     * @param text
     * @param title
     * @param opt
     * @returns AlertService
     */
    info(text?: any, title?: any, opt?: AlertOptions): AlertService;
    /**
     * 打开错误消息框
     * @param text
     * @param title
     * @param opt
     * @returns AlertService
     */
    error(text?: any, title?: any, opt?: AlertOptions): AlertService;
    /**
     * 添加确认处理
     * @param handler 处理函数
       */
    onConfirm(handler: Function): this;
    /**
     * 添加取消处理
     * @param handler 处理函数
       */
    onCancel(handler: Function): this;
    /**
     * 添加关闭处理
     * @param handler 处理函数
       */
    onClose(handler: Function): this;
    /**
     * 清楚所有元素上绑定的事件
     */
    private clearEvents();
    /**
     * 给元素添加事件
     * @param target 元素
     * @param event 事件名
     * @param handler 处理函数
     */
    private addEvent(target, event, handler);
}
