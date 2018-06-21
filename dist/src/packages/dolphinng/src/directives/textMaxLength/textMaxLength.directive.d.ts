import { OnInit, ElementRef } from '@angular/core';
export declare class TextMaxLengthDirective implements OnInit {
    private elemRef;
    textMaxLength: any;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
}
