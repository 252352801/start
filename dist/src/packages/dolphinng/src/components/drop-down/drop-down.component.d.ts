/**
 * 展开/收起
 * @author Jianhang Yu
 */
import { OnInit, ElementRef } from '@angular/core';
export declare class DropDownComponent implements OnInit {
    visible: boolean;
    cssOpen: boolean;
    isTransition: boolean;
    animateTime: number;
    wrap: ElementRef;
    content: ElementRef;
    constructor();
    show: boolean;
    ngOnInit(): void;
    open(): void;
    close(): void;
    toggle(): void;
}
