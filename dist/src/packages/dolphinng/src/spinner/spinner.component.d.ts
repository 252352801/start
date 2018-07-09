import { OnInit, ElementRef } from '@angular/core';
export declare class SpinnerComponent implements OnInit {
    private elemRef;
    type: string;
    size: string;
    isDark: boolean;
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
}
