import {Directive, Input, ElementRef} from '@angular/core';
import {Uploader} from './Uploader';
import {UploadFile} from './UploadFile';
@Directive({
  selector: '[uploader]'
})
export class UploaderDirective {
  @Input() uploader: Uploader;//Uploader实例
  @Input() compressScale: number;//压缩尺寸
  @Input() compressQuality: number;//压缩质量
  constructor(private el: ElementRef) {
    this.el.nativeElement.addEventListener('change', (event: any)=> {
      let ev = event || window.event;
      let target = ev.target || ev.srcElement;
      let files = target.files;
      this.uploader.trigger('select',[files]);
      this.queueFiles(files);
    });
  }

  queue(uploadFile: UploadFile) {
    this.uploader.queue.push(uploadFile);
    this.uploader.trigger('queue', [uploadFile]);
  }

  triggerQueueAll() {
    this.uploader.trigger('queueAll', [this.uploader.queue]);
  }

  queueFiles(files: File[]) {
    if(files.length>this.uploader.maxLength){//超出长度
      this.uploader.trigger('overLength',[files.length,this.uploader.maxLength]);
      return;
    }
    let fn = (index: number)=> {
      let file = files[index];
      let uploadFile = new UploadFile();
      uploadFile.fileName = file.name;
      uploadFile.fileType = file.type;
      uploadFile.fileSize = file.size;
      uploadFile.file = file;
      let fileNameSplit = file.name.split('.');
      uploadFile.fileExtension = ('.' + fileNameSplit[fileNameSplit.length - 1]).toLowerCase();
      let check = ()=> {
        index++;
        if (index < files.length) {
          fn(index);
        } else {
          this.triggerQueueAll();
        }
      };

      //检测合法性
      if (this.uploader.maxSize && uploadFile.fileSize > this.uploader.maxSize) {//超过大小
        this.uploader.trigger('overSize', [uploadFile.fileSize,this.uploader.maxSize,uploadFile]);
        check();
        return;
      } else if (this.uploader.maxLength && this.uploader.queue.length >= this.uploader.maxLength) {//超过数量
        this.uploader.trigger('overLength', [files.length,this.uploader.maxLength]);
        this.triggerQueueAll();
        return;
      }
      if (this.uploader.isCompress) {//压缩
        if (uploadFile.fileType.indexOf('image/') >= 0) {//图片
          this.uploader.createBase64(file)
            .then((data)=> {
              uploadFile.dataUrl = data;
              let scale = this.compressScale || 1,
                quality = this.compressQuality || 0.7;
              return this.uploader.compress(data, scale, quality);
            })
            .then((dataUrl)=> {
              uploadFile.compressed = true;
              uploadFile.fileSize = this.uploader.getBase64FileSize(dataUrl);
              uploadFile.compressedDataUrl = dataUrl;
              //queue
              this.queue(uploadFile);
              check();
            });
        } else {
          /*this.uploader.createBase64(file)
            .then((data)=> {
              uploadFile.dataUrl = data;
              this.queue(uploadFile);
              check();
            });*/
          //queue
          this.queue(uploadFile);
          check();
        }
      } else {//不压缩
        if (this.uploader.uploadType === 1 || this.uploader.isPreview) {
          this.uploader.createBase64(file)
            .then((data)=> {
              uploadFile.fileSize = this.uploader.getBase64FileSize(data);
              uploadFile.dataUrl = data;
              //queue
              this.queue(uploadFile);
              check();
            });
        } else {
          this.queue(uploadFile);
          check();
        }
      }
    };
    fn(0);
  }
}
