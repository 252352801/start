import { OnInit, EventEmitter } from '@angular/core';
export declare class SwitchComponent implements OnInit {
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
    constructor();
    ngOnInit(): void;
    toggleCheck(ev: any): void;
    toggle(ev: any): void;
}
