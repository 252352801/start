export declare class AreaPicker {
    init: Function;
    items: {
        label?: string;
        elem?: HTMLElement;
        key: string;
        data: any[];
        selected: Function;
    }[];
    done: Function;
    values: any[];
    index: number;
    wrap: HTMLElement;
    header: HTMLElement;
    body: HTMLElement;
    isShowLoader: boolean;
    constructor();
    /**
     * 创建最外层元素
     */
    createWrap(): void;
    /**
     * 创建顶部
     */
    createHeader(): void;
    /**
     * 创建body（选择区）
     */
    createBody(): void;
    /**
     * 设置数据
     * @param data 新的数据
     * @param index 当前激活的item
     */
    setData(data: any[], index?: number): void;
    /**
     * 清空指定items下标的数据
     * @param index
     */
    clearData(index?: number): void;
    /**
     * 清空body内容
     */
    clearBody(): void;
    /**
     * 激活item
     * @param index
     */
    activate(index: number): void;
    /**
     * 设置body里的内容（供选择的元素）
     * @param index
     */
    setBodyContent(index?: number): void;
    /**
     * 定位
     * @param refElem
     */
    setPosition(refElem: HTMLElement): void;
    /**
     * 关闭弹出框
     */
    close(): void;
    /**
     * 通过key字符串获取指定对象的数据
     * @param data
     * @param keyStr  key/key.key.....
     * @returns any
     */
    getObjByKey(data: any, keyStr: string): any;
    /**
     * 获取values中key指定的值拼接的字符串
     * @returns string
     */
    getValuesStr(): string;
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
