import { OnInit, OnChanges, SimpleChanges, ElementRef, EventEmitter } from '@angular/core';
export declare class PaginatorComponent implements OnInit, OnChanges {
    private elemRef;
    count: number;
    pageSize: number;
    pageSizeChange: EventEmitter<any>;
    index: number;
    indexChange: EventEmitter<any>;
    pageCount: number;
    items: Array<number>;
    maximum: number;
    changePageSizeAble: boolean;
    inputAble: boolean;
    ellipsis: boolean;
    pageSizeOptions: Array<number>;
    size: string;
    showTotal: boolean;
    styleClass: string;
    inputIndex: number;
    onChangePage: EventEmitter<any>;
    onChangePageError: EventEmitter<any>;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * 建立页码元素和页数
     */
    create(): void;
    /**
     * 初始化每页大小选项
     */
    initPageSizeOptions(): void;
    private createItems(start, end);
    /**
     * 改变页大小
     * @param index
     */
    changePageSize(ev: any): void;
    /**
     * 改变页
     * @param index
     */
    changePage(index: number): void;
    /**
     * 上一页
     */
    prev(): void;
    /**
     * 下一页
     */
    next(): void;
    /**
     * 第一页
     */
    first(): void;
    /**
     * 最后一页
     */
    last(): void;
}
