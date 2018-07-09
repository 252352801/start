import { UploadFile } from './UploadFile';
export declare class Uploader {
    url: string;
    headers: any;
    method: string;
    uploadType: number;
    queue: UploadFile[];
    isPreview: boolean;
    isCompress: boolean;
    maxSize: number;
    maxLength: number;
    customData: any;
    name: string;
    isUploading: boolean;
    handlers: {
        select: Function[];
        queue: Function[];
        queueAll: Function[];
        upload: Function[];
        progress: Function[];
        success: Function[];
        overSize: Function[];
        overLength: Function[];
        error: Function[];
        complete: Function[];
    };
    constructor();
    /**
     * 触发
     */
    trigger(handler: string, params?: any[]): void;
    /**
     * 上传
     */
    upload(): void;
    compress(src: string, scale: number, quality: number): Promise<string>;
    /**
     * base64转换
     * @param file
     */
    createBase64(file: File): Promise<string>;
    /**
     * 获取base64数据的文件长度
     * @param base64Str
     * @returns number
     */
    getBase64FileSize(base64Str: string): number;
    /**
     * 获取base64数据的data
     * @param base64Str
     * @returns number
     */
    getBase64FileData(base64Str: string): string;
    /**
     * 选中
     * @param fn
     */
    onSelect(fn: Function): this;
    /**
     * 超过大小
     * @param fn
     * @returns Uploader
     */
    onOverSize(fn: Function): this;
    /**
     * 超过数量
     * @param fn
     * @returns Uploader
     */
    onOverLength(fn: Function): this;
    /**
     * 单个文件入列
     * @param fn
     */
    onQueue(fn: Function): this;
    /**
     * 全部文件入列
     * @param fn
     */
    onQueueAll(fn: Function): this;
    /**
     * 上传
     * @param fn
     */
    onUpload(fn: Function): this;
    /**
     * 上传中
     * @param fn
     */
    onProgress(fn: Function): this;
    /**
     * 上传成功
     * @param fn
     */
    onSuccess(fn: Function): this;
    onComplete(fn: Function): this;
    /**
     * 上传失败
     * @param fn
     */
    onError(fn: Function): this;
}
