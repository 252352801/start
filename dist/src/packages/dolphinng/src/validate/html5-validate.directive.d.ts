import { OnInit, ElementRef } from '@angular/core';
export declare class HTML5ValidateDirective implements OnInit {
    private elemRef;
    HTML5Validate: any;
    visible: boolean;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    createCustomValidity(): string;
    private initValidateRules();
}
