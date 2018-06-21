import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class RadioComponent implements OnInit {
    private elemRef;
    key: any;
    keyChange: EventEmitter<any>;
    value: any;
    size: string;
    display: string;
    disabled: string;
    customBackground: string;
    styleClass: string;
    name: string;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    toggleCheck(ev: any): void;
    changeValue(ev: any): void;
}
