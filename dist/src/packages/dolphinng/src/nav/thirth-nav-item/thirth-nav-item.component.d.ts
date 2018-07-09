import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
export declare class ThirthNavItemComponent {
    private elemRef;
    private router;
    text: string;
    link: string;
    icon: string;
    disabled: any;
    constructor(elemRef: ElementRef, router: Router);
    isActive(): boolean;
}
