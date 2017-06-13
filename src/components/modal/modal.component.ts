import { Component,Input,Output,EventEmitter,SimpleChanges,OnInit,OnChanges,ElementRef} from '@angular/core';
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements  OnInit,OnChanges{
  @Input() visible:boolean=false;//是否可见
 // @Output('visible') visibleChange:EventEmitter<any>=new EventEmitter();//是否溢出屏幕
  @Output() visibleChange:EventEmitter<any>=new EventEmitter();
  @Input() overflow:boolean=false;//是否溢出屏幕
  @Input() animated:boolean=true;
  @Input() size:string="md";
  isRender:boolean=false;//是否渲染
  isShow:boolean=false;//是否显示
  outClickClose:boolean=true;//点击外边关闭
  @Input() showCloseButton:boolean=true;
  constructor(private elemRef:ElementRef){

  }
  ngOnInit(){

  }

  /**
   * 背景点击处理
   */
  private bgClickAction(ev){
    let wouldClose=this.outClickClose;
    if(wouldClose){
      let target=ev.target||ev.srcElement;
      if(target===this.elemRef.nativeElement.querySelector('.modal')){
        this.visibleChange.emit(false);
      }
    }
  }
  private close(){
    this.visibleChange.emit(false);
  }
  ngOnChanges(changes:SimpleChanges) {
    let isVisible=changes['visible'].currentValue;
    if(isVisible===true){
      this.isRender=true;
      this.addClass(document.body,'modal-open');
      setTimeout(()=>{
        this.isShow=true;
      },100);
      this.initBodyStyle();
    }else if(isVisible===false){
      this.isShow=false;
      setTimeout(()=>{
        this.isRender=false;
        this.removeClass(document.body,'modal-open');
      },500);
    }
  }

  /**
   * 初始化modal-body的高度/限高
   */
  private initBodyStyle(){
    let isOverflow=!!this.overflow;
    if (!isOverflow) {//弹出框限制高度
      setTimeout(()=>{
        let modalBody:HTMLElement = this.elemRef.nativeElement.querySelector('.modal-body');//模态框中间部分
        var maxHeight = document.documentElement.clientHeight - 183;//上外边距30+下外边距30+头部51+底部70=181 2像素的调整
        modalBody.style.maxHeight = maxHeight + 'px';
        modalBody.style.overflowY = 'auto';
      });
    }
  }
  /**
   * 为元素添加一个类
   * @param elem
   * @param className
   */
  private addClass(elem:HTMLElement,className:string){
    let classList=elem.className.split(/\s+/);
    if(classList.indexOf(className)<0){
      classList.push(className);
      elem.className=classList.join(' ');
    }
  }
  /**
   * 删除某个类
   * @param elem
   * @param className
   */
  private removeClass(elem:HTMLElement,className:string){
    let classList=elem.className.split(/\s+/);
    let clsIndex=classList.indexOf(className);
    if(clsIndex>=0){
      classList.splice(clsIndex,1);
      elem.className=classList.join(' ');
    }
  }

}

@Component({
  selector: 'modal-header',
  template: `
    <div class="modal-header" [ngClass]="{'modal-header-reduce':showCloseButton}">
        <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./modal.component.less']
})
export class ModalHeaderComponent extends ModalComponent{

}

@Component({
  selector: 'modal-body',
  template: `
    <div class="modal-body">
        <ng-content></ng-content>
    </div>
  `
})
export class ModalBodyComponent {
  constructor(){
  }
}


@Component({
  selector: 'modal-footer',
  template: `
    <div class="modal-footer" >
        <ng-content></ng-content>
    </div>
  `
})
export class ModalFooterComponent {
  constructor(){
  }
}
