export interface ToasterOptions {
    type?: string;
    title?: string;
    message: string;
    delay?: number;
    animated?: boolean;
}
export declare class Toaster {
    private container;
    private toasters;
    constructor();
    /**
     * 弹出
     * @param options
       */
    pop(options: ToasterOptions): void;
    private delayCloseTimer(toast, delay);
    /**
     * 建立参数
     * @param arguments
     * @param type
     * @returns ToasterOptions
     */
    private createOptions(type, args);
    info(...args: any[]): void;
    success(...args: any[]): void;
    wait(...args: any[]): void;
    warning(...args: any[]): void;
    error(...args: any[]): void;
}
