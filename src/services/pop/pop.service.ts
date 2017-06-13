
export class PopService{
  private type:string;
  private title:string;
  private text:string;
  private confirmButtonText:string;
  private cancelButtonText:string;
  private showConfirmButton:boolean;
  private showCancelButton:boolean;
  private confirmButtonType:string;
  private cancelButtonType:string;
  private closeOnConfirm:boolean;
  private closeOnCancel:boolean;
  private showLoaderOnConfirm:boolean;
  private showLoaderOnCancel:boolean;
  private confirmLoaderText:string;
  private cancelLoaderText:string;
  private textAlign:string;
  private iconClass:string;

  private confirmed:boolean;
  private canceled:boolean;
  private animated:boolean=true;
  private confirmHandlers:Array<Function>;
  private cancelHandlers:Array<Function>;
  private closeHandlers:Array<Function>;

  private popWrap:HTMLElement;//根元素
  private confirmButton:HTMLElement;
  private cancelButton:HTMLElement;
  private closeButton:HTMLElement;

  private eventList:Array<{target:HTMLElement,event:string,handler:EventListener}>=[];
  constructor(){
  }
  /**
   * 初始化
   */
  private init(){
    this.removePop();
    this.clearEvents();
    this.type='info';
    this.title='提示';
    this.text='';
    this.confirmButtonText='确定';
    this.cancelButtonText='取消';
    this.showConfirmButton=true;
    this.showCancelButton=false;
    this.confirmButtonType='info';
    this.textAlign='left';
    this.cancelButtonType='default';
    this.closeOnConfirm=true;
    this.closeOnCancel=true;
    this.showLoaderOnConfirm=false;
    this.showLoaderOnCancel=false;
    this.confirmLoaderText=this.confirmButtonText;
    this.cancelLoaderText=this.cancelButtonText;

    this.confirmed=false;
    this.canceled=false;

    this.confirmHandlers=[];
    this.cancelHandlers=[];
    this.closeHandlers=[];
    this.confirmButton=null;
    this.cancelButton=null;
    this.closeButton=null;
    this.popWrap=null;
  }

  /**
   * 显示
   */
  private show(){
    //蒙层
      this.popWrap=document.createElement('DIV');
      this.popWrap.className='pop-wrap';
      document.body.appendChild(this.popWrap);
  //内容块
      let pop=document.createElement('DIV');
      pop.className='pop-main';
  //pop头部
      let popHeader=document.createElement('DIV');
      popHeader.className='pop-header';
      popHeader.innerHTML='<div class="alert-title">'+this.title+'</div>';
      this.closeButton=document.createElement('span');
      this.closeButton.className='pop-btn-close';
      this.closeButton.innerHTML='×';
      this.addEvent(this.closeButton, 'click', ()=> {
          for (let handler of this.closeHandlers) {
            handler.apply(this);
          }
        this.close();
      });
      popHeader.appendChild(this.closeButton);
      pop.appendChild(popHeader);
//pop body
      let popBody=document.createElement('DIV');
      popBody.className='pop-body';
      if(this.textAlign==='center'){
        popBody.className='pop-body pop-body-txt-center';
      }
      let popText=document.createElement('DIV');
      popText.className='pop-text';
      let iconHTML=(this.iconClass!==undefined&&this.iconClass!=='')?'<i class="'+this.iconClass+'"></i>':'';
      popText.innerHTML=iconHTML+this.text;
      popBody.appendChild(popText);
      pop.appendChild(popBody);
// pop footer
      let popFooter=document.createElement('DIV');
      popFooter.className='pop-footer';
      let dottingHTML='<i class="dotting"></i>';//loader
      if(this.showConfirmButton){//确定按钮
          let btnConfirm=document.createElement('BUTTON');
          let btnConfirmClassList=['btn','btn-'+this.confirmButtonType];
          btnConfirm.className=btnConfirmClassList.join(' ');
          btnConfirm.innerHTML=this.confirmButtonText;
          popFooter.appendChild(btnConfirm);
          this.confirmButton=btnConfirm;
          this.addEvent(btnConfirm,'click',()=> {
            if(this.confirmed||this.canceled){
              this.close();
              return;
            }
            for(let handler of this.confirmHandlers){
                  handler.apply(this);
            }
            if(this.closeOnConfirm) {
                this.close();
            }else if(this.showLoaderOnConfirm){
              console.log('loader');
              btnConfirmClassList.push('disabled');
              btnConfirm.className=btnConfirmClassList.join(' ');
              btnConfirm.innerHTML=this.confirmLoaderText+dottingHTML;
            }
            this.confirmed=true;
          });
      }
      if(this.showCancelButton){//取消按钮
        let btnCancel=document.createElement('BUTTON');
        let btnCancelClassList=['btn','btn-'+this.cancelButtonType];
        btnCancel.className=btnCancelClassList.join(' ');
        btnCancel.innerHTML=this.cancelButtonText;
        popFooter.appendChild(btnCancel);
        this.addEvent(btnCancel, 'click', ()=> {
          if(this.canceled||this.confirmed){
            this.close();
            return;
          }
          for (let handler of this.cancelHandlers) {
            handler.apply(this);
          }
          if(this.closeOnCancel) {
            this.close();
          }else if(this.showLoaderOnCancel){
            btnCancelClassList.push('disabled');
            btnCancel.className=btnCancelClassList.join(' ');
            btnCancel.innerHTML=this.cancelLoaderText+dottingHTML;
          }
          this.canceled=true;
        });
        this.cancelButton=btnCancel;
      }
      pop.appendChild(popFooter);
      this.popWrap.appendChild(pop);
     if(this.animated){
       setTimeout(()=>{
         this.popWrap.className=this.popWrap.className+' animated';
       });
     }else{
       this.popWrap.className=this.popWrap.className+' animated';
     }
  }

  /**
   * 关闭
   */
  close(){
    this.removePop();
  }

  /**
   * 移除
   */
  private removePop(){
    if(this.popWrap!==null&&this.popWrap!==undefined) {
      try {
        document.body.removeChild(this.popWrap);
      }catch(err){
        //ignore
      }
    }
  }

  /**
   * 设置参数
   * @param opt
     */
  private setOptions(opt:{
    title?:string,
    text:string,
    showConfirmButton?:boolean,
    showCancelButton?:boolean,
    confirmButtonText?:string,
    cancelButtonText?:string,
    confirmButtonType?:string,
    cancelButtonType?:string,
    textAlign?:string,
    iconClass?:string,
    closeOnConfirm?:boolean,
    closeOnCancel?:boolean,
    showLoaderOnConfirm?:boolean,
    showLoaderOnCancel?:boolean
    confirmLoaderText?:string
    cancelLoaderText?:string
  }){
    for(let prop in opt){
        this[prop]=opt[prop];
    }
 /*   if(opt.showConfirmButton!==undefined) {
      this.showConfirmButton = opt.showConfirmButton;
    }
    if(opt.showCancelButton!==undefined) {
      this.showCancelButton = opt.showCancelButton;
    }
    if(opt.confirmButtonText!==undefined){
      this.confirmButtonText=opt.confirmButtonText;
    }
    if(opt.cancelButtonText!==undefined){
      this.cancelButtonText=opt.cancelButtonText;
    }
    if(opt.confirmButtonType!==undefined){
      this.confirmButtonType=opt.confirmButtonType;
    }
    if(opt.cancelButtonType!==undefined){
      this.cancelButtonType=opt.cancelButtonType;
    }
    if(opt.textAlign!==undefined){
      this.textAlign=opt.textAlign;
    }
    if(opt.iconClass!==undefined){
      this.iconClass=opt.iconClass;
    }
    if(opt.closeOnConfirm!==undefined){
      this.closeOnConfirm=opt.closeOnConfirm;
    }
    if(opt.closeOnCancel!==undefined){
      this.closeOnCancel=opt.closeOnCancel;
    }
    if(opt.showLoaderOnConfirm!==undefined){
      this.showLoaderOnConfirm=opt.showLoaderOnConfirm;
    }
    if(opt.showLoaderOnCancel!==undefined){
      this.showLoaderOnCancel=opt.showLoaderOnCancel;
    }*/
  }
  /**
   *打开确认框
   * @param opt
     */
  confirm(opt:any){
    this.init();
    this.type='confirm';
    this.showConfirmButton=true;
    this.showCancelButton=true;
    this.setOptions(opt);
    this.show();
    return this;
  }

  /**
   * 打开消息框
   * @param msg
   * @param opt
     */
  info(opt:{
    title?:string,
    text:string,
    showConfirmButton?:boolean,
    confirmButtonText?:string,
    confirmButtonType?:string,
    textAlign?:string,
    iconClass?:string,
    closeOnConfirm?:boolean,
  }){
    this.init();
    this.type='info';
    this.showConfirmButton=true;
    this.showCancelButton=false;
    this.setOptions(opt);
    this.show();
    return this;
  }
  error(opt?:any){
    this.init();
    this.type='error';
    this.showConfirmButton=true;
    this.showCancelButton=false;
    this.confirmButtonType='danger';
    this.title='错误';
    this.setOptions(opt)
    this.show();
    return this;
  }

  /**
   * 添加确认处理
   * @param handler 处理函数
     */
  onConfirm(handler:Function){
    this.confirmHandlers.push(handler);
    return this;
  }

  /**
   * 添加取消处理
   * @param handler 处理函数
     */
  onCancel(handler:Function){
    this.cancelHandlers.push(handler);
    return this;
  }

  /**
   * 添加关闭处理
   * @param handler 处理函数
     */
  onClose(handler:Function){
    this.closeHandlers.push(handler);
    return this;
  }

  /**
   * 清楚所有元素上绑定的事件
   */
  private clearEvents(){
    try {
      for (let i = 0, len = this.eventList.length; i < len; i++) {
        this.eventList[i].target.removeEventListener(this.eventList[i].event, this.eventList[i].handler);
      }
      this.eventList = [];
    }catch(err){
      console.log(err);
    }
  }
  /**
   * 给元素添加事件
   * @param target 元素
   * @param event 事件名
   * @param handler 处理函数
   */
  private addEvent(target:HTMLElement,event:string,handler:EventListener){
    target.addEventListener(event,handler);
    this.eventList.push({target:target,handler:handler,event:event});
  }
}
