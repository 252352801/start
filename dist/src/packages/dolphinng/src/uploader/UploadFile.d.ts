export declare class UploadFile {
    file: File;
    name: string;
    fileName: string;
    fileExtension: string;
    fileType: string;
    fileSize: number;
    dataUrl: string;
    compressedDataUrl: string;
    valid: boolean;
    compressed: boolean;
    progress: number;
    uploaded: boolean;
    success: boolean;
    error: boolean;
    response: any;
    customData: any;
    submitData: {
        name: string;
        value: any;
    }[];
    xhr: XMLHttpRequest;
    constructor();
    setSuccess(): void;
    setError(): void;
    /**
     * 获取(要提交)的文件
     * @param type 0:Filed/Blob对象 1:Base64数据
     */
    getFile(type?: number): any;
    addSubmitData(name: string, value: any): void;
    /**
     * 创建Blob存储文件数据
     * @param dataUrl
     */
    private createBlob(dataUrl);
}
