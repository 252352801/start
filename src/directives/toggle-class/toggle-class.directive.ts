import {Directive,OnInit,ElementRef,Input,OnDestroy} from '@angular/core';

@Directive({
  selector: '[toggle-class]'
})
export class ToggleClassDirective implements OnInit{
    @Input('toggle-class') toggleClass:string;
    @Input('out-remove') outRemove:string;
    private count:number=0;
    private triggerEvent:string;//触发的事件名；
    private toggleClassList:Array<string>;//变换的类名列表

    private tempWindowEvent:{event:string,handler:any};
    constructor(private elemRef:ElementRef){
        this.triggerEvent='click';
        this.tempWindowEvent={
          event:this.triggerEvent,
          handler:null
        };
    }
    ngOnInit(){
      this.toggleClassList=this.getToggleClassList();
      this.elemRef.nativeElement.addEventListener(this.triggerEvent,(ev)=> {
        ev.stopPropagation();
        setTimeout(()=>{
          let curClassList=this.getClassList(this.elemRef.nativeElement);
          let curOnlyClass=this.getOnlyClass(curClassList,this.toggleClassList);
          let toggleOnlyClass=this.getOnlyClass(this.toggleClassList,curClassList);
          let newClassList=curOnlyClass.concat(toggleOnlyClass);
          this.elemRef.nativeElement.className=newClassList.join(' ');

          if(!(this.outRemove===undefined||this.outRemove==='false')) {
            let finalClassList = this.getClassList(this.elemRef.nativeElement);
            let commonClassList = this.getCommonClass(finalClassList, this.toggleClassList);
            if (commonClassList.length) {
              this.addOutClickRemoveListener();
            }
          }
        });
      });
    }

  ngOnDestroy(){
    this.removeOutClickRemoveListener();
  }
  private addOutClickRemoveListener(){
    let handler=(ev)=>{
      let curClassList = this.getClassList(this.elemRef.nativeElement);
      let curOnlyClass = this.getOnlyClass(curClassList, this.toggleClassList);
      this.elemRef.nativeElement.className = curOnlyClass.join(' ');
      this.removeOutClickRemoveListener();
    };
    window.addEventListener(this.triggerEvent,handler);
    this.tempWindowEvent.event=this.triggerEvent;
    this.tempWindowEvent.handler=handler;
  }
  private removeOutClickRemoveListener(){
      if(this.tempWindowEvent!==undefined){
        window.removeEventListener(this.tempWindowEvent.event,this.tempWindowEvent.handler);
      }
  }
  /**
   * 获取元素类名列表
   * @param elem
   * @returns {string[]}
     */
    private getClassList(elem:HTMLElement):Array<string>{
        return this.uniqueArray(elem.className.split(/\s+/));
    }

  /**
   * 获取需要切换的类名列表
   * @returns {any}
     */
    private getToggleClassList():Array<string>{
      let nullRegExp=/^\s+$/;
      if(!nullRegExp.test(this.toggleClass)) {
        return this.uniqueArray(this.toggleClass.split(/\s+/));
      }
      return [];
    }

  /**
   * 找出仅在数组A中存在，B中不存在的类
   * @param arrA
   * @param arrB
   * @returns {Array}
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
   * @returns {Array}
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
   * @returns {Array}
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

