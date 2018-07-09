import { ElementRef } from '@angular/core';
import { Uploader } from './Uploader';
import { UploadFile } from './UploadFile';
export declare class UploaderDirective {
    private el;
    uploader: Uploader;
    compressScale: number;
    compressQuality: number;
    constructor(el: ElementRef);
    queue(uploadFile: UploadFile): void;
    triggerQueueAll(): void;
    queueFiles(files: File[]): void;
}
