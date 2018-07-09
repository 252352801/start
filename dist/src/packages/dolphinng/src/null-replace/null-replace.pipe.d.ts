import { PipeTransform } from '@angular/core';
export declare class NullReplacePipe implements PipeTransform {
    private fmt;
    transform(value: any, fmt: string): any;
}
