import { PipeTransform } from '@angular/core';
export declare class DatePipe implements PipeTransform {
    private format;
    private createDate(dateStr);
    transform(value: any, fmt: string): any;
}
