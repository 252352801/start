import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
export class AreaPicker {
  init: Function;
  items: {
    label?: string,
    elem?: HTMLElement,
    key: string,
    data: any[],
    selected: Function
  }[];
  done: Function;//选择完毕的回调
  values: any[] = [];//结果
  index: number = 0;//激活的item
  wrap: HTMLElement;
  header: HTMLElement;
  body: HTMLElement;
  isShowLoader: boolean = false;//是否显示loader
  constructor() {
  }

  /**
   * 创建最外层元素
   */
  createWrap() {
    let wrap = document.createElement('DIV');
    wrap.className = 'areaPicker';
    //定位
    this.setPosition(wrap);
    this.wrap = wrap;
    document.body.appendChild(this.wrap);
    setTimeout(() => {
      this.wrap.style.transition = 'opacity .3s ease-out';
      this.wrap.style.opacity = '1';
    });
  }

  /**
   * 创建顶部
   */
  createHeader() {
    let header = document.createElement('DIV');
    header.className = 'areaPicker-header';
    for (let i = 0, len = this.items.length; i < len; i++) {
      let item = document.createElement('DIV');
      item.className = 'areaPicker-header-item';
      item.innerHTML = this.items[i].label;
      item.setAttribute('data-index', i + '');
      item.setAttribute('data-type', 'header');
      this.items[i].elem = item;
      header.appendChild(item);
    }
    this.header = header;
    this.wrap.appendChild(this.header);
  }

  /**
   * 创建body（选择区）
   */
  createBody() {
    let body = document.createElement('DIV');
    body.className = 'areaPicker-body';
    this.body = body;
    this.wrap.appendChild(this.body);
  }

  /**
   * 设置数据
   * @param data 新的数据
   * @param index 当前激活的item
   */
  setData(data: any[], index?: number) {
    let i = (index !== undefined ? index : this.index);
    this.items[i].data = data;
    this.setBodyContent();
  }

  /**
   * 清空指定items下标的数据
   * @param index
   */
  clearData(index?: number) {
    let i = (index !== undefined ? index : this.index);
    this.items[i].data = [];
  }

  /**
   * 清空body内容
   */
  clearBody() {
    this.body.innerHTML = this.isShowLoader ? '<span class="areaPicker-loader">加载中...</span>' : '';
  }

  /**
   * 激活item
   * @param index
   */
  activate(index: number) {
    for (let i = 0, len = this.items.length; i < len; i++) {
      this.removeClass(this.items[i].elem, 'active');
      if (i >= index) {
        this.items[i].elem.innerHTML = this.items[i].label;
      }
    }
    this.addClass(this.items[index].elem, 'active');
    this.index = index;
  }

  /**
   * 设置body里的内容（供选择的元素）
   * @param index
   */
  setBodyContent(index?: number) {
    this.body.innerHTML = '';
    let act_index = index || this.index;
    for (let i = 0, len = this.items[act_index].data.length; i < len; i++) {
      let o = this.items[act_index].data[i];
      let btn = document.createElement('SPAN');
      btn.className = 'areaPicker-item';
      btn.setAttribute('data-index', i + '');
      btn.setAttribute('data-type', 'item');
      btn.innerHTML = this.getObjByKey(o, this.items[act_index].key);
      this.body.appendChild(btn);
    }
  }

  /**
   * 定位
   * @param refElem
   */
  setPosition(refElem: HTMLElement) {
    let el = this.wrap;
    if (el) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      let offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
      var pos = refElem.getBoundingClientRect();
      el.style.position = 'absolute';
      el.style.minWidth = (pos.right - pos.left) + 'px';
      if (document.body.clientHeight - pos.bottom < this.wrap.offsetHeight) {
        if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') < 0) {
          this.addClass(this.wrap, 'areaPicker-top');
        }
        el.style.left = (pos.left + scrollLeft) + 'px';
        //el.style.top = (pos.top-this.wrap.offsetHeight+scrollTop)+ 'px';
        el.style.bottom = (offsetHeight - pos.top - scrollTop) + 'px';

      } else {
        if (this.wrap.className.split(/\s+/).indexOf('areaPicker-top') >= 0) {
          this.removeClass(this.wrap, 'areaPicker-top');
        }
        el.style.left = (pos.left + scrollLeft) + 'px';
        el.style.top = (pos.bottom + scrollTop) + 'px';
      }
    }
  }

  /**
   * 关闭弹出框
   */
  close() {
    if (this.wrap) {
      document.body.removeChild(this.wrap);
      this.wrap = null;
    }
  }

  /**
   * 通过key字符串获取指定对象的数据
   * @param data
   * @param keyStr  key/key.key.....
   * @returns any
   */
  getObjByKey(data: any, keyStr: string): any {
    if (data && typeof data === 'object') {
      let keys = keyStr.split('.');
      let obj = data;
      while (keys.length) {
        obj = obj[keys.shift()];
      }
      return obj;
    } else {
      return data;
    }
  }

  /**
   * 获取values中key指定的值拼接的字符串
   * @returns string
   */
  getValuesStr(): string {
    let str = '';
    for (let i = 0, len = this.values.length; i < len; i++) {
      str += this.getObjByKey(this.values[i], this.items[i].key);
    }
    return str;
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

/*@Directive({
  selector: '[areaPicker]'
})*/
@Component({
  selector: '[areaPicker]',
  template: '',
  styleUrls: ['./areaPicker.directive.less']
})
export class AreaPickerDirective implements OnInit, OnDestroy {
  @Input() areaPicker: any;
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
