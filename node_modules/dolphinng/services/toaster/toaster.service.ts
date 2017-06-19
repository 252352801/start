interface  ToasterOptions{
  type?:string;
  title?:string;
  message:string;
  delay?:number;
  animated?:boolean;
}

export class Toaster{
  private container:HTMLElement;
  private toasters:Array<Toaster>=[];
  constructor(){

  }

  /**
   * 弹出
   * @param options
     */
  pop(options:ToasterOptions){
    let delay=options.delay||5000;//延迟关闭的时间
    let animated=options.animated!==undefined?options.animated:true;//是否加入动画
    if(this.container===null||this.container===undefined){
      let container=document.getElementById('toast-container');
      if(container===null){
        container=document.createElement('div');
        container.id='toast-container';
        container.className='toast-top-right';
        document.body.appendChild(container);
      }
      this.container=container;
    }

    let toast=document.createElement('DIV');
    let toastClass=['toast','ng-leave' ,'ng-leave-active'];
    let type='info';
    if(options.type){
      let types=['success','error','info','wait','warning'];
      if(types.indexOf(options.type)>=0){
        type=options.type;
      }
    }
    toastClass.push('toast-'+type);
    if(animated){
      toastClass.push('ng-animate');
    }
    toast.className=toastClass.join(' ');
    let closeBtn=document.createElement('BUTTON');
    closeBtn.className='toast-close-button';
    closeBtn.innerHTML='×';
    let message=document.createElement('div');
    message.innerHTML=`<div>`+options.message+`</div>`;
    toast.appendChild(closeBtn);
    if(options.title){
      let title=document.createElement('DIV');
      title.className='toast-title';
      title.innerHTML=options.title;
      toast.appendChild(title);
    }
    toast.appendChild(message);
    this.container.insertBefore(toast,this.container.firstChild);

    setTimeout(()=>{
       let classList=toast.className.split(/\s+/);
       let clsIndex=classList.indexOf('ng-leave-active');
      if(clsIndex>=0){
        classList.splice(clsIndex,1);
        toast.className=classList.join(' ');
      }
    });
    let timer=this.delayCloseTimer(toast,delay);
    closeBtn.addEventListener('click',()=>{
      this.container.removeChild(toast);
      toast=null;
    });
    toast.addEventListener('mouseover',()=>{
      clearTimeout(timer);
      timer=null;
    });
    toast.addEventListener('mouseleave',()=>{
      timer=this.delayCloseTimer(toast,delay);
    });
  }

  private delayCloseTimer(toast:HTMLElement,delay:number){
    return setTimeout(()=>{
      let classList=toast.className.split(/\s+/);
      let clsIndex=classList.indexOf('ng-leave-active');
      if(clsIndex<0){
        classList.push('ng-leave-active');
        toast.className=classList.join(' ');
      }
      setTimeout(()=>{
        this.container.removeChild(toast);
        toast=null;
      },1500);
    },delay);
  }
  info(title:string,message:string){
      this.pop({
        type:'info',
        title:title,
        message:message
      });
  }
  success(title:string,message:string){
    this.pop({
      type:'success',
      title:title,
      message:message
    });
  }
  wait(title:string,message:string){
    this.pop({
      type:'wait',
      title:title,
      message:message
    });
  }
  warning(title:string,message:string){
    this.pop({
      type:'warning',
      title:title,
      message:message
    });
  }
  error(title:string,message:string){
    this.pop({
      type:'error',
      title:title,
      message:message
    });
  }
}
