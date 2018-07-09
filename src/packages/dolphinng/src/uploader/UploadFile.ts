export class UploadFile {
  file: File;//原始文件对象
  name: string;//上传时name
  fileName: string;//文件名
  fileExtension: string;//后缀名
  fileType: string;//类型
  fileSize: number;//大小
  dataUrl: string;//文件的base64数据
  compressedDataUrl: string;//压缩后的文件数据

  valid:boolean;//是否是有效的文件

  compressed: boolean;//是否被压缩过

  progress: number;//上传进度
  uploaded: boolean;//是否已上传
  success: boolean;//是否上传成功
  error: boolean;//是否上传错误
  response: any;//上传返回结果

  customData: any;//用于存储自定义数据
  submitData: {name: string,value: any}[];//上传时候的数据

  xhr:XMLHttpRequest;//上传文件的XMLHttpRequest对象
  constructor(){
    this.compressed=false;
    this.progress=0;
    this.uploaded=false;
    this.success=false;
    this.error=false;
    this.response=null;
    this.submitData=[];
    this.customData={};//默认空对象
  }

  setSuccess() {
    this.success = true;
    this.error = false;
  }

  setError() {
    this.success = false;
    this.error = true;
  }

  /**
   * 获取(要提交)的文件
   * @param type 0:Filed/Blob对象 1:Base64数据
   */
  getFile(type?:number):any{
    let result;
    if(type===1){
      if(this.compressed){
        result=this.compressedDataUrl;
      }else{
        result=this.dataUrl;
      }
    }else{//0和默认
      if(this.compressed){
        result=this.createBlob(this.compressedDataUrl);
      }else{
        result=this.file;
      }
    }
    return result;
  }

  addSubmitData(name:string,value:any){
    if(!(this.submitData instanceof Array)){
      this.submitData=[];
    }
    this.submitData.push({
      name:name,
      value:value
    });
  }
  /**
   * 创建Blob存储文件数据
   * @param dataUrl
   */
  private createBlob(dataUrl: string): Blob {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1].replace(/\s/g, ''));
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});//值，类型
  }
}
