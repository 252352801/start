/**
 * nx-select
 * @author Qingyu Wei
 */
import { OnChanges, AfterContentInit, AfterContentChecked, SimpleChanges, ElementRef } from '@angular/core';
export declare class SelectComponent implements OnChanges, AfterContentInit, AfterContentChecked {
    private elemRef;
    visible: boolean;
    private initializedStyle;
    value: any;
    options: any[];
    valueKey: string;
    textKey: string;
    styleClass: string;
    text: string;
    body: ElementRef;
    constructor(elemRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    private setDefaultStyle();
    /**
     * 获取元素生效的css属性值
     * @param elem
     * @param attr
     */
    private getCss(elem, attr);
    /**
     * 匹配文字
     * @param val
     * @param options
     */
    matchText(val: any, options: any[]): string;
}
