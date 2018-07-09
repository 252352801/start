import { OnInit, ElementRef } from '@angular/core';
export declare class ToggleClassDirective implements OnInit {
    private elemRef;
    toggleClass: string;
    revokable: string;
    target: string;
    targetClass: string;
    keep: boolean;
    private triggerEvent;
    private toggleClassList;
    private targetToggleClassList;
    private targetElem;
    private orgClassName;
    private orgTargetClassName;
    private tempWindowEvent;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    /**
     * 切换元素类名
     * @param elem
     * @param toggleClass
       */
    changeElemClass(elem: any, toggleClass: Array<string>): void;
    ngOnDestroy(): void;
    /**
     * 添加点击外边重置class的事件
     */
    private addOutClickResetListener();
    /**
     * 移除window上的浏览器事件
     */
    private removeOutClickResetListener();
    /**
     * 获取元素类名列表
     * @param elem
     * @returns Array<string>
       */
    private getClassList(elem);
    /**
     * 获取需要切换的类名列表
     * @returns any
       */
    private getToggleClassList(inputClass);
    /**
     * 找出仅在数组A中存在，B中不存在的类
     * @param arrA
     * @param arrB
     * @returns Array
       */
    private getOnlyClass(arrA, arrB);
    /**
     * 获取两个数组共有的类名
     * @param arrA
     * @param arrB
     * @returns Array
       */
    private getCommonClass(arrA, arrB);
    /**
     * 去重
     * @param array
     * @returns Array
       */
    private uniqueArray(array);
}
