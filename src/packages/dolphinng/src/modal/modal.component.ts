import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  ContentChild,
  ViewChild
} from '@angular/core';
import {ModalBodyComponent} from './modal-body.component';
import {ModalHeaderComponent} from './modal-header.component';
import {ModalFooterComponent} from './modal-footer.component';
export {ModalBodyComponent};
export {ModalHeaderComponent};
export {ModalFooterComponent};
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit,OnChanges,OnDestroy{
  @Input() visible:boolean;//是否可见
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  @Output() onOpen: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() overflow: boolean = false;//是否溢出屏幕
  @Input() animated: boolean = true;
  @Input() size: string = "md";
  @Input() styleClass: string;
  @Input() fullHeight: boolean|string;
  @Input() disabled:any=false;//是否禁用（有遮罩）
  @Input() width;//宽度
  isRender: boolean = false;//是否渲染
  isShow: boolean = false;//是否显示
  isReady: boolean = false;//是否已就绪
  @Input() outClickClose: boolean = false;//点击外边关闭
  @Input() showCloseButton: boolean = true;

   isTransition:boolean=false;

  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalDialog') modalDialog: ElementRef;
  @ContentChild(ModalHeaderComponent) modalHeader: ModalHeaderComponent;
  @ContentChild(ModalBodyComponent) modalBody: ModalBodyComponent;

  constructor(private elemRef: ElementRef) {

  }

  ngOnInit() {

  }
  ngOnDestroy(){
    this.testAndResetBody();
  }

  /**
   * 背景点击处理
   */
   bgClickAction(ev) {
    let wouldClose = this.outClickClose;
    if (wouldClose) {
      let target = ev.target || ev.srcElement;
      if (target === this.modal.nativeElement) {
        this.close();
      }
    }
  }

  open() {
    this.visible = true;
    this.visibleChange.emit(true);
    this.showModal();
  }

  close():Promise<any>{
    this.visible = false;
    let promise=this.hideModal();
    this.visibleChange.emit(false);
    return promise;
  }

  private showModal() {
    this.isRender = true;
    let orgW=document.body.offsetWidth;//有滚动条时的宽度
    this.addClass(document.body, 'modal-open');
    let curW=document.body.offsetWidth;//无滚动条时的宽度
    if (curW>orgW) {
      document.body.style.paddingRight=(curW-orgW)+'px';//给body设置paddingRight避免页面抖动
    }
    this.initBodyStyle();
    setTimeout(()=> {
      this.isTransition=true;
      this.isShow = true;
      this.onOpen.emit(this.visible);
      setTimeout(()=>{
        this.isReady=true;
        this.modalBody.isReady=true;
      },300)
    });
  }

  private hideModal(callback?:Function):Promise<any>{
    this.testAndResetBody();
    this.isShow = false;
    return new Promise((resolve,reject)=>{
      setTimeout(()=> {
        this.isRender = false;
        if(typeof callback==='function'){
          callback();
        }
        this.isTransition=false;
        resolve(this.visible);
        this.isReady=false;
        this.modalBody.isReady=false;
        this.onClose.emit(this.visible);
      }, 500);
    });
  }

  testAndResetBody(){
    let modals=document.querySelectorAll('.modal');
    if(modals&&modals.length<=1){
      this.removeClass(document.body, 'modal-open');
      document.body.style.paddingRight=null;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    let visibleChg = changes['visible'];
    if (visibleChg) {
      let isVisible = visibleChg.currentValue;
      let prevValue = visibleChg.previousValue;
      if (isVisible !== prevValue) {
        if (isVisible === true) {
          this.showModal();
        } else if (isVisible === false&&prevValue!==undefined) {
          this.hideModal();
        }
      }
    }
  }

  /**
   * 初始化modal-body的高度/限高
   */
  private initBodyStyle() {
    let isOverflow = !!this.overflow;
    let isFullHeight =(this.fullHeight !== undefined && this.fullHeight !== false);
    if (isFullHeight||!isOverflow) {
      setTimeout(()=> {
        let modalBody = this.modalBody.modalBody.nativeElement;//模态框中间部分
        var maxHeight = document.documentElement.clientHeight - 183;//上外边距30+下外边距30+头部51+底部70=181 2像素的调整
        if (isFullHeight) {
          modalBody.style.height = maxHeight + 'px';
          modalBody.style.overflowY = 'auto';
        } else if(!isOverflow){
          modalBody.style.maxHeight = maxHeight + 'px';
          modalBody.style.overflowY = 'auto';
        }
      });
    }
  }

  /**
   * 为元素添加一个类
   * @param elem
   * @param className
   */
  private addClass(elem: HTMLElement, className: string) {
    let classList = elem.className.split(/\s+/);
    if (classList.indexOf(className) < 0) {
      classList.push(className);
      elem.className = classList.join(' ');
    }
  }

  /**
   * 删除某个类
   * @param elem
   * @param className
   */
  private removeClass(elem: HTMLElement, className: string) {
    let classList = elem.className.split(/\s+/);
    let clsIndex = classList.indexOf(className);
    if (clsIndex >= 0) {
      classList.splice(clsIndex, 1);
      elem.className = classList.join(' ');
    }
  }

}

