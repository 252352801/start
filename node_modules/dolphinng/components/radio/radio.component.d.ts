import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class RadioComponent implements OnInit {
    private elemRef;
    name: string;
    display: string;
    disabled: string;
    size: string;
    value: any;
    key: any;
    styleClass: string;
    customBackground: string;
    keyChange: EventEmitter<any>;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    toggleCheck(ev: any): void;
    changeValue(ev: any): void;
}
