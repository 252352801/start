import { PipeTransform } from '@angular/core';
export declare class CurrencyFormatPipe implements PipeTransform {
    private separateLength;
    private accuracy;
    private format;
    private separator;
    transform(value: any, param?: any): any;
}
