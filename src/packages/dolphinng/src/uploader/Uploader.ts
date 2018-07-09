import {UploadFile} from './UploadFile'
export class Uploader {
  url: string;//上传地址
  headers: any;//上传头部
  method: string;//请求方法
  uploadType: number;//上传方式 0:流式上传 1:base64上传
  queue: UploadFile[];//上传队列
  isPreview: boolean;//是否预览
  isCompress: boolean;//是否压缩
  maxSize:number;//最大文件大小（单个文件）
  maxLength:number;//最大数量
  customData:any;////用于存储自定义数据
  name: string;//上传时name
  isUploading:boolean=false;//是否在上传
  handlers: {//处理函数
    select: Function[],//选择文件时
    queue: Function[],//单个文件入列时
    queueAll:Function[],//多个文件入列时
   // remove: Function[],//删除时
    upload: Function[],//上传时
    progress: Function[],//上传中
    success: Function[],//单个文件上传成功时
    overSize:Function[],//超出大小时
    overLength:Function[],//超出数量时
    error: Function[],//上传失败时
    complete:Function[]//所有文件上传后
  };

  constructor(){
    this.url='';
    this.name='';
    this.headers={};
    this.method='post';
    this.uploadType=0;
    this.queue=[];
    this.isPreview=true;
    this.isCompress=false;
    this.handlers={
      select: [],
      queue: [],
      queueAll:[],
  //    remove: [],
      upload:[],
      progress:[],
      success:[],
      overSize:[],
      overLength:[],
      error: [],
      complete:[]
    };
    this.customData={};//默认空对象
  }

  /**
   * 触发
   */
  trigger(handler:string,params?:any[]){
    let handlers=this.handlers[handler];
    if(handlers){
      for(let fn of handlers){
        if(params){
          fn.apply(this,params);
        }else{
          fn.apply(this);
        }
      }
    }
  }

  /**
   * 上传
   */
  upload() {
    let createData = (index: number): any=> {
      if (this.uploadType === 0) {
        let uploadFile = this.queue[index];
        let fd = new FormData();
        if (uploadFile.submitData && uploadFile.submitData instanceof Array) {
          for (let o of uploadFile.submitData) {
            fd.append(o.name, o.value);
          }
        } else {
          fd.append(uploadFile.name || this.name, uploadFile.getFile(0));
        }
        return fd;
      } else if (this.uploadType === 1) {

      }
    };
    let submit = (index: number, data: any)=> {
      let next = ()=> {
        index++;
        if (index < this.queue.length) {
          submit(index, createData(index));
        }else{
          this.isUploading=false;
          this.trigger('complete',[this]);
        }

      };
      let uploadFile = this.queue[index];
      if (uploadFile.uploaded) {
        next();
        return;
      }
      let xhr = new XMLHttpRequest();
      uploadFile.xhr=xhr;
      xhr.open(this.method.toLowerCase(), this.url);
      for (let o in this.headers) {//设置header
        xhr.setRequestHeader(o + '', this.headers[o + '']);
      }
      //侦查当前附件上传情况
      xhr.upload.onprogress = (evt)=> {
        let loaded = evt.loaded;
        let total = evt.total;
        let percent = Math.floor(100 * loaded / total);//已经上传的百分比
        uploadFile.progress = percent;
        this.trigger('progress',[percent,uploadFile,this,index]);//触发
      };
      xhr.onload = ()=> {
        uploadFile.uploaded = true;
        uploadFile.response = xhr.responseText;
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)) {
          uploadFile.setError();
          this.trigger('error',[uploadFile,this,index]);//触发
        } else {
          this.trigger('success',[uploadFile,this,index]);//触发
        }
        next();
      };
      xhr.onerror=(evt)=> {
        uploadFile.setError();
      };
      xhr.send(data);
    };
    this.trigger('upload',[this]);//触发
    this.isUploading=true;
    submit(0, createData(0));
  }

  compress(src:string, scale:number, quality:number): Promise<string> {
    return new Promise((resolve, reject)=> {
      if (quality < 0 || quality > 1) {
        quality = 1;
      }
      var localImg = new Image();
      localImg.src = src;
      localImg.onload = function (e) {
        var that = localImg;
        // 默认按比例压缩
        var comScale=parseFloat(scale+'');
        var w = that.width * comScale,
          h = that.height * comScale;
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w+'';
        var anh = document.createAttribute("height");
        anh.nodeValue = h+'';
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', parseFloat(quality+''));
        // 回调函数返回base64的值
        resolve(base64);
      };
      localImg.onerror = function () {
        reject(src);
      };
    });
  }

  /**
   * base64转换
   * @param file
   */
  createBase64(file: File): Promise<string> {
    return new Promise((resolve, reject)=> {
      let reader = new FileReader();
      // 读取File对象的数据
      reader.readAsDataURL(file);
      // 绑定load事件
      reader.onload = function (e) {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(file);
      };
    });
  }

  /**
   * 获取base64数据的文件长度
   * @param base64Str
   * @returns number
   */
  getBase64FileSize(base64Str: string): number {
    let splitStr = base64Str.split(',');
    let str = splitStr[splitStr.length - 1].replace(/=/g, '');
    let strLength = str.length;
    return Math.round(strLength - (strLength / 8) * 2);
  }

  /**
   * 获取base64数据的data
   * @param base64Str
   * @returns number
   */
  getBase64FileData(base64Str: string): string {
    let splitStr = base64Str.split(',');
    return splitStr[splitStr.length - 1];
  }



  /*----------------------------------------生命周期------------------------------------------*/

  /**
   * 选中
   * @param fn
   */
  onSelect(fn: Function) {
    this.handlers.select.push(fn);
    return this;
  }

  /**
   * 超过大小
   * @param fn
   * @returns Uploader
   */
  onOverSize(fn: Function){
    this.handlers.overSize.push(fn);
    return this;
  }

  /**
   * 超过数量
   * @param fn
   * @returns Uploader
   */
  onOverLength(fn: Function){
    this.handlers.overLength.push(fn);
    return this;
  }

  /**
   * 单个文件入列
   * @param fn
   */
  onQueue(fn: Function) {
    this.handlers.queue.push(fn);
    return this;
  }

  /**
   * 全部文件入列
   * @param fn
   */
  onQueueAll(fn: Function) {
    this.handlers.queueAll.push(fn);
    return this;
  }


  /**
   * 上传
   * @param fn
   */
  onUpload(fn: Function) {
    this.handlers.upload.push(fn);
    return this;
  }

  /**
   * 上传中
   * @param fn
   */
  onProgress(fn: Function) {
    this.handlers.progress.push(fn);
    return this;
  }

  /**
   * 上传成功
   * @param fn
   */
  onSuccess(fn: Function) {
    this.handlers.success.push(fn);
    return this;
  }


  onComplete(fn: Function) {
    this.handlers.complete.push(fn);
    return this;
  }

  /**
   * 上传失败
   * @param fn
   */
  onError(fn: Function) {
    this.handlers.error.push(fn);
    return this;
  }

}
