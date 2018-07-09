import { ElementRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class DatetimePickerComponent implements OnInit, OnDestroy {
    private elemRef;
    value: string;
    valueChange: EventEmitter<string>;
    format: string;
    max: string;
    min: string;
    start: string;
    end: string;
    trigger: string;
    zIndex: string | number;
    isCalendar: boolean;
    direction: string;
    complete: EventEmitter<any>;
    popover: ElementRef;
    datetimePicker: ElementRef;
    private inputElem;
    visible: boolean;
    ready: boolean;
    date: Date;
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPickSeconds: boolean;
    isPickMinutes: boolean;
    isPickHours: boolean;
    isPickingTime: boolean;
    private calendars;
    yearOptions: number[];
    monthOptions: number[];
    hoursOptions: number[];
    minutesOrSecondsOptions: number[];
    dayOptions: {
        date: Date;
        isCurrent: boolean;
        disabled: boolean;
        text: number | string;
    }[][];
    minError: boolean;
    maxError: boolean;
    left: number;
    top: number;
    handlers: {
        elem: HTMLElement | HTMLInputElement | Document;
        event: string;
        fn: EventListener;
    }[];
    constructor(elemRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * 初始化
     */
    init(): void;
    /**
     * 检测format以确定是否选择时、分、秒
     */
    testFormat(): void;
    /**
     * 创建“年”选项
     */
    createYearOptions(): void;
    /**
     * 创建“月”选项
     */
    createMonthOptions(): void;
    /**
     * 创建“天”选项
     */
    createDayOptions(): void;
    addEvent(elem: HTMLElement | HTMLInputElement | Document, event: string, fn: EventListener): void;
    /**
     * 通过format查找字符串str里相应的字符
     * @param str
     * @param format
     * @param condiction
     * @param len
     * @returns string
     */
    searchStrByFormat(str: string, format: string, condiction: string, len: number | number[]): string;
    createDateWidthFormat(dateStr: string, format: string): Date;
    /**
     * 日期是否大于
     * @param date1
     * @param date2
     * @returns Boolean
     */
    isDateTimeGreaterThan(date1: Date, date2: Date): Boolean;
    /**
     * 建立新的时间对象
     * @param dateStr
     * @returns Date
     */
    createDate(dateStr?: string): Date;
    /**
     * 设置初始日期
     */
    setOrgDate(): void;
    /**
     * 设置日期的年份
     * @param year
     */
    setDateFullYear(year?: number): void;
    /**
     * 设置日期的月份
     * @param month
     */
    setDateMonth(month?: number): void;
    /**
     * 设置年月日时分秒的值
     * @param date
     */
    setValues(date?: Date): void;
    stopPropagation(ev: Event): void;
    /**
     * 根据input相对屏幕位置设置弹出框位置
     */
    setPosition(): void;
    /**
     * 选择天
     */
    pickDay(day: {
        date: Date;
        isCurrent: boolean;
        disabled: boolean;
        text: number | string;
    }): void;
    /**
     * 上月
     */
    prevMonth(): void;
    /**
     * 下一月
     */
    nextMonth(): void;
    /**
     * 获取最小日期
     * @returns Date
     */
    getMinDate(): Date;
    /**
     * 获取最大日期
     * @returns Date
     */
    getMaxDate(): Date;
    /**
     * 输入时最大值检测
     * @param ev
     * @param max
     */
    maxInputTest(ev: Event, max: number): void;
    /**
     * 输入是否符合要求
     * @param str
     * @param format
     * @returns boolean
     */
    isFormat(str: string, format: string): boolean;
    /**
     * 清空
     */
    clear(): void;
    /**
     * 现在
     */
    now(): void;
    /**
     * 清除错误
     */
    clearErrors(): void;
    /**
     * 输出
     */
    output(): boolean;
    /**
     * 关闭
     */
    close(): void;
}
