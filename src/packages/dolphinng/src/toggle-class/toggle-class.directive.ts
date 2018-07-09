import {Directive,OnInit,ElementRef,Input,OnDestroy} from '@angular/core';

@Directive({
  selector: '[toggleClass]'
})
export class ToggleClassDirective implements OnInit{
    @Input() toggleClass:string;
    @Input('opt-revokable') revokable:string;//是否在点击外边的时候撤销
    @Input('opt-target') target:string;//关联的elem的ID
    @Input('opt-targetClass') targetClass:string;//关联的elem要切换的类名
    @Input('opt-keep') keep:boolean=false;
    private triggerEvent:string;//触发的事件名；
    private toggleClassList:Array<string>;//变换的类名列表
    private targetToggleClassList:Array<string>;//关联elem变换的类名列表

    private targetElem:any;//关联的目标元素
    private orgClassName:string;
    private orgTargetClassName:string;
    private tempWindowEvent:{event:string,handler:any};
    constructor(private elemRef:ElementRef){
        this.triggerEvent='click';
        this.tempWindowEvent={
          event:this.triggerEvent,
          handler:null
        };
    }
    ngOnInit(){
      this.orgClassName=this.elemRef.nativeElement.className;
      this.toggleClassList=this.getToggleClassList(this.toggleClass);
      if(this.target){
        this.targetElem=document.getElementById(this.target);
        this.targetElem&&(this.orgTargetClassName=this.targetElem.className);
        let targetToggleClass=this.targetClass||this.toggleClass;
        this.targetToggleClassList=this.getToggleClassList(targetToggleClass);
      }
      this.elemRef.nativeElement.addEventListener(this.triggerEvent,(ev)=> {
        ev.stopPropagation();
        setTimeout(()=>{
          if(this.keep){
            let classList=this.uniqueArray((this.orgClassName+' '+this.toggleClass).split(/\s+/));
            this.elemRef.nativeElement.className=classList.join(' ');
            if(this.target) {
              let targetClassList = this.uniqueArray((this.orgTargetClassName + ' ' + this.targetClass).split(/\s+/));
              this.targetElem.className = targetClassList.join(' ');
            }
          }else{
            this.changeElemClass(this.elemRef.nativeElement,this.toggleClassList);
            if(this.target){
              this.targetElem&&this.changeElemClass(this.targetElem,this.targetToggleClassList);
            }
          }
          if(!(this.revokable===undefined||this.revokable==='false')) {
            let finalClassList = this.getClassList(this.elemRef.nativeElement);
            let commonClassList = this.getCommonClass(finalClassList, this.toggleClassList);
            if (commonClassList.length) {
              this.addOutClickResetListener();
            }
          }
        });
      });
    }

  /**
   * 切换元素类名
   * @param elem
   * @param toggleClass
     */
  changeElemClass(elem:any,toggleClass:Array<string>){
    let curClassList=this.getClassList(elem);//当前class列表
    let curOnlyClass=this.getOnlyClass(curClassList,toggleClass);//仅当前元素有的class列表
    let toggleOnlyClass=this.getOnlyClass(toggleClass,curClassList);//仅输入参数有的class列表
    let newClassList=curOnlyClass.concat(toggleOnlyClass);
    elem.className=newClassList.join(' ');
  }

  ngOnDestroy(){
    this.removeOutClickResetListener();
    this.targetElem=null;
  }

  /**
   * 添加点击外边重置class的事件
   */
  private addOutClickResetListener(){
    let handler=(ev)=>{
      this.elemRef.nativeElement.className=this.orgClassName;
      if(this.target) {
        this.targetElem.className = this.orgTargetClassName;
      }
      this.removeOutClickResetListener();
    };
    window.addEventListener(this.triggerEvent,handler);
    this.tempWindowEvent.event=this.triggerEvent;
    this.tempWindowEvent.handler=handler;
  }

  /**
   * 移除window上的浏览器事件
   */
  private removeOutClickResetListener(){
      if(this.tempWindowEvent!==undefined){
        window.removeEventListener(this.tempWindowEvent.event,this.tempWindowEvent.handler);
      }
  }


  /**
   * 获取元素类名列表
   * @param elem
   * @returns Array<string>
     */
    private getClassList(elem:HTMLElement):Array<string>{
        return this.uniqueArray(elem.className.split(/\s+/));
    }

  /**
   * 获取需要切换的类名列表
   * @returns any
     */
    private getToggleClassList(inputClass:string):Array<string>{
      let nullRegExp=/^\s+$/;
      if(!nullRegExp.test(inputClass)) {
        return this.uniqueArray(inputClass.split(/\s+/));
      }
      return [];
    }

  /**
   * 找出仅在数组A中存在，B中不存在的类
   * @param arrA
   * @param arrB
   * @returns Array
     */
    private getOnlyClass(arrA:Array<any>,arrB:Array<any>):Array<string>{
      let result=[];
      for(let item of arrA){
        if(arrB.indexOf(item)<0){
          result.push(item);
        }
      }
      return result;
    }

  /**
   * 获取两个数组共有的类名
   * @param arrA
   * @param arrB
   * @returns Array
     */
    private getCommonClass(arrA:Array<any>,arrB:Array<any>):Array<string>{
      let result=[];
      for(let item of arrB){
        if(arrA.indexOf(item)>=0){
          result.push(item);
        }
      }
      return result;
    }

  /**
   * 去重
   * @param array
   * @returns Array
     */
    private uniqueArray(array:Array<any>):Array<any>{
        let newArr=[];
        for(let item of array){
          if(newArr.indexOf(item)<0){
              newArr.push(item);
          }
        }
        return newArr;
    }

}

