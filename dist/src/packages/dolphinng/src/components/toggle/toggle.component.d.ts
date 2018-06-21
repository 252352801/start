import { OnInit, ElementRef, EventEmitter } from '@angular/core';
export declare class ToggleComponent implements OnInit {
    private elemRef;
    value: any;
    valueChange: EventEmitter<any>;
    size: string;
    display: string;
    disabled: string;
    type: string;
    styleClass: string;
    auto: boolean;
    action: EventEmitter<any>;
    name: string;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    toggleCheck(ev: any): void;
    toggle(ev: any): void;
}
