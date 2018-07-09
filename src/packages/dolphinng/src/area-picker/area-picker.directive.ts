import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AreaPicker } from './area-picker';
/*@Directive({
  selector: '[areaPicker]'
})*/
@Component({
  selector: '[areaPicker]',
  template: '',
  styleUrls: ['./area-Picker.directive.less']
})
export class AreaPickerDirective implements OnInit, OnDestroy {
  @Input() areaPicker: AreaPicker;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  private handlers: {
    event: string,
    elem: HTMLElement | Document | Window,
    fn: EventListenerOrEventListenerObject
  }[] = [];//事件处理函数，存储临时绑定时间

  private triggerListener: {
    event: string,
    fn?: EventListenerOrEventListenerObject
  } = {
      event: 'focus'
    };

  resizeTimer: any;

  constructor(private elemRef: ElementRef) {

  }

  /**
   * 添加事件
   * @param elem
   * @param event
   * @param fn
   */
  private addEvent(elem: HTMLElement | Document | Window, event: string, fn: EventListenerOrEventListenerObject) {
    elem['addEventListener'](event, fn);
    this.handlers.push({
      elem: elem,
      event: event,
      fn: fn
    });
  }

  /**
   * 移除事件
   * @param elem
   * @param event
   * @param fn
   */
  private removeEvent(elem: HTMLElement | Document | Window, event: string, fn: EventListenerOrEventListenerObject) {
    for (let handler of this.handlers) {
      if (elem === handler.elem && event === handler.event && fn === handler.fn) {
        elem['removeEventListener'](event, fn);
      }
    }
  }

  /**
   * 清空事件
   */
  private clearEvents() {
    for (let handler of this.handlers) {
      handler.elem.removeEventListener(handler.event, handler.fn);
    }
  }

  ngOnInit() {
    this.triggerListener.fn = (ev) => {
      this.addEvent(this.elemRef.nativeElement, 'click', (ev) => {
        ev.stopPropagation();
      });
      let picker = this.areaPicker;
      if (picker.wrap) {
        return;
      }
      picker.createWrap();
      picker.setPosition(this.elemRef.nativeElement);
      picker.createHeader();
      picker.createBody();
      picker.clearBody();
      picker.activate(0);
      picker.init();
      this.addEvent(picker.wrap, 'click', (ev) => {//点击事件
        ev.stopPropagation();
        let target = ev.target || ev.srcElement;
        let type = target['getAttribute']('data-type');
        if (type === 'item') { //点击列表元素
          let dataIndex = target['getAttribute']('data-index');
          let selectedData = picker.items[picker.index].data[dataIndex];
          picker.items[picker.index].elem.innerHTML = picker.getObjByKey(selectedData, picker.items[picker.index].key);//设置top内容
          let nextIndex = picker.index + 1;//下一个激活的下标
          picker.values.splice(picker.index + 1, picker.values.length - (picker.index + 1));//值切割
          picker.values[picker.index] = selectedData;
          let selectedCallback = picker.items[picker.index].selected;
          if (nextIndex < picker.items.length) {//未选择完毕
            picker.clearBody();//清空body里的元素
            picker.activate(nextIndex);//激活下一个
          } else {//触发选择完毕回调
            if (typeof picker.done === 'function') {
              this.ngModelChange.emit(picker.getValuesStr());
              picker.close();//关闭弹出框
              this.clearEvents();//清空（临时）事件
              picker.done(picker.values);
            }
          }
          selectedCallback(selectedData);//触发选择完毕回调
        } else if (type === 'header') {//点击顶部tab
          let index = parseInt(target['getAttribute']('data-index'));
          if (index !== picker.index) {
            if (index < picker.index) {
              picker.activate(index);
              picker.setData(picker.items[index].data);
            } else {
              if (picker.values[index] == picker.items[index].data) {
                picker.activate(index);
                picker.setData(picker.items[index].data);
              }
            }
          }
        }
      });
      //点击空白关闭
      this.addEvent(document, 'click', () => {
        this.areaPicker.close();
        this.clearEvents();
      });

      //窗口大小改变
      this.addEvent(window, 'resize', (ev) => {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
          this.areaPicker.setPosition(this.elemRef.nativeElement);
        }, 10);
      });
    };
    this.elemRef.nativeElement.addEventListener(this.triggerListener.event, this.triggerListener.fn);
  }

  ngOnDestroy() {
    this.areaPicker.close();
    this.elemRef.nativeElement.removeEventListener(this.triggerListener.event, this.triggerListener.fn);
  }
}
