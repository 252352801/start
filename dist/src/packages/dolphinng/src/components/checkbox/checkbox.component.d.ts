import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class CheckboxComponent implements OnInit {
    private elemRef;
    value: boolean;
    valueChange: EventEmitter<any>;
    size: string;
    display: string;
    disabled: any;
    innerStyle: string;
    customBackground: string;
    styleClass: string;
    name: string;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    changeAction(ev: any): void;
}
