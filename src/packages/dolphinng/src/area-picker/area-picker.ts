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
  /**层级 */
  zIndex: number;
  constructor() {
  }

  /**
   * 创建最外层元素
   */
  createWrap() {
    let wrap = document.createElement('DIV');
    wrap.className = 'areaPicker';
    if (this.zIndex || this.zIndex == 0) {
      wrap.style.zIndex = this.zIndex + '';
    }
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