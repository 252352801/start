import { ElementRef, OnInit, OnChanges, OnDestroy, SimpleChanges, EventEmitter } from '@angular/core';
export declare class SliderComponent implements OnInit, OnChanges, OnDestroy {
    private eleRef;
    value: any;
    valueChange: EventEmitter<any>;
    size: any;
    min: number;
    max: number;
    decimal: number;
    isValueBackground: boolean;
    complete: EventEmitter<any>;
    private mouseMoveHandler;
    isPressing: boolean;
    left: any;
    slider: ElementRef;
    sliderThumb: ElementRef;
    constructor(eleRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    thumbPress(): void;
    setNewValueByMousePosition(ev: MouseEvent): void;
    private setLeftByValue(val);
    private parseDecimal(val);
}
