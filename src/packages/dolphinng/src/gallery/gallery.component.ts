import { Component, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];//图片数据源
  @Input() dataProps: string[] = [];//表示图片地址的访问属性  如[a,b,c]表示.a.b.c
  @Input() size: any = '';//尺寸  xs md lg  默认全屏
  @Input() title: string = '';//标题
  @Input() isAnimation: boolean = true;//是否有动画
  @Input() isHeader: boolean = false;//是否显示头部
  @Input() isToolsBar: boolean = false;//是否显示（底部）工具栏
  @Input() isBtnDownload: boolean = false;//是否显示下载按钮

  @Output() change: EventEmitter<any> = new EventEmitter();//index change(将废弃)
  @Output() onChange: EventEmitter<any> = new EventEmitter();//index change
  @Output() onClose: EventEmitter<any> = new EventEmitter();//关闭
  @ViewChild('galleryBody') galleryBody: ElementRef;//组件内容区
  isFullScreen: boolean = false;//是否全屏
  images: {//格式化后的图片数据
    url: string;//地址
    scale: number;//缩放比例
    rotate: number;//旋转角度
    left: number,//左偏移
    top: number//右偏移
  }[] = [];//图片属性
  render: boolean = false;//是否渲染
  visible: boolean = false;//是否显示
  ready: boolean = false;//是否已就绪

  @Input() width: any = null;
  @Input() height: any = null;
  left: number | string = 0;//当前left
  top: number | string = 0;//当前top
  /**宽度 */
  styleWidth: any;
  /**高度 */
  styleHeight: any;
  tempLeft: number | string = 0;//临时left 用于全屏/非全屏切换
  tempTop: number | string = 0;//临时top
  thumbScrollWidth: number = 0;//临时滚动宽度
  private transitionTime: number = 300;//过渡时间ms

  activeIndex: number = 0;//当前图片index

  transition: string = '';//'all '+transitionTime+'ms'+' ease-in-out'
  isThumbOverflow: boolean = false;//是否缩略图溢出
  isEventSource: boolean = false;//是否有事件源
  isShowBtns: boolean = false;//是否显示工具栏

  isSupportCssObjectFit: boolean = false;//是否支持css object-fit属性

  private resizeCheckTimer: any; //检测窗口改变的timer(=SetTimeout(...))
  private thumbSlideTimer: any;//缩略图滚动的timer
  private resizeHandler: any;//窗口大小改变处理函数
  private windowClickHandler: any;//窗口点击处理函数
  private keydownHandler: any;//按键处理
  private mouseWheelHandler: any;//鼠标滚动处理

  private isPressing = false;//是否在按着鼠标
  private tween = {//tween部分函数
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  };
  private bodyPadR = 0;//body paddingRight
  private mousePosition = {//鼠标在
    x: 0,
    y: 0
  };
  private mouseClickedPoint = {//鼠标按下去时的位置
    x: 0,
    y: 0
  };
  isShowScaleInfo = false;//是否显示缩放比例信息
  private hideScaleInfoTimer: any = 0;//隐藏缩放比例信息的timer
  constructor(private eleRef: ElementRef) {
    //窗口大小改变
    this.resizeHandler = () => {
      clearTimeout(this.resizeCheckTimer);
      this.resizeCheckTimer = setTimeout(() => {
        this.checkIsThumbOverflow();
      }, 300);
    };
    //窗口点击
    this.windowClickHandler = (ev: MouseEvent) => {
      if (!this.size && !this.isShowBtns) {
        this.close();
      }
    };
    //按下键盘
    this.keydownHandler = (ev: KeyboardEvent) => {
      if (this.images.length > 1) {
        const kc = ev.keyCode;
        if (kc === 37 || kc === 38) {
          this.prev();
          this.slideThumbAfterChange(0);
        } else if (kc === 39 || kc === 40) {
          this.next();
          this.slideThumbAfterChange(1);
        }
      }
    };
    //鼠标滚动
    this.mouseWheelHandler = (ev: any) => {
      let e = ev || window.event;
      if (this.visible) {
        //
        let mouseX = e['clientX'] || e['pageX'];
        let mouseY = e['clientY'] || e['pageY'];
        let gbody = this.galleryBody;
        if (gbody && gbody.nativeElement) {
          let rect = gbody.nativeElement.getBoundingClientRect();
          if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
            if (e['wheelDelta'] < 0 || e['detail'] < 0) {//向下滚动 --缩小
              this.reduce(0.1);
            } else if (e['wheelDelta'] > 0 || e['detail'] > 0) {//向上滚动 --放大
              this.enlarge(0.1);
            }
          }
        }
      }
    };

  }

  ngOnInit() {
    let elem = document.createElement('IMG');
    if (elem.style['objectFit'] !== undefined) {
      this.isSupportCssObjectFit = true;
    }
    elem = null;
  }

  ngOnDestroy() {
    this.removeEvents();
  }

  /**
   * 鼠标在图片上按下时
   * @param ev 
   */
  onMouseDownImg(ev: MouseEvent) {
    ev.preventDefault();
    let p = this.getMousePosition(ev);
    this.mousePosition.x = p.left;
    this.mousePosition.y = p.top;
    this.mouseClickedPoint.x = p.left;
    this.mouseClickedPoint.y = p.top;
    this.isPressing = true;
  }

  /**
   * 鼠标弹起
   * @param ev 
   */
  onMouseUpImg(ev: MouseEvent) {
    ev.stopPropagation();
    let p = this.getMousePosition(ev);
    if (p.left == this.mouseClickedPoint.x && p.top == this.mouseClickedPoint.y) {
      this.toggleShowTools();
    }
    this.isPressing = false;
  }

  /**
   * 鼠标在图片上移动
   * @param ev 
   */
  onMouseMoveImg(ev: MouseEvent) {
    ev.preventDefault();
    if (this.isPressing) {//如果同时在按着鼠标(拖拽)
      let p = this.getMousePosition(ev);
      let img = this.images[this.activeIndex];
      let x = 2 * (p.left - this.mousePosition.x) + img.left;
      let y = 2 * (p.top - this.mousePosition.y) + img.top;
      if (img.rotate % 360 == 90) {
        x = 2 * (p.top - this.mousePosition.y) + img.left;
        y = -2 * (p.left - this.mousePosition.x) + img.top;
      } else if (img.rotate % 360 == 180) {
        x = -2 * (p.left - this.mousePosition.x) + img.left;
        y = -2 * (p.top - this.mousePosition.y) + img.top;
      } else if (img.rotate % 360 == 270) {
        x = -2 * (p.top - this.mousePosition.y) + img.left;
        y = 2 * (p.left - this.mousePosition.x) + img.top;
      }
      img.left = x;
      img.top = y;
      this.mousePosition.x = p.left;
      this.mousePosition.y = p.top;
    }
  }

  /**
   * 禁止事件冒泡
   * @param ev 
   */
  stopPropagation(ev: MouseEvent) {
    ev.stopPropagation();
  }

  /**
   * 清除事件
   */
  removeEvents() {
    //取消监听
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('click', this.windowClickHandler);
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('mousewheel', this.mouseWheelHandler);
    window.removeEventListener('DOMMouseScroll', this.mouseWheelHandler);
  }

  /**
   * 检查是否溢出
   */
  private checkIsThumbOverflow() {
    let elem = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
    let check = () => {
      if (this.images.length > 1) {
        if (elem && elem['offsetWidth'] > 0) {
          this.isThumbOverflow = elem && (elem.scrollWidth > elem.clientWidth);
          if (this.isThumbOverflow) {
            let galleryThumbScroll = this.eleRef.nativeElement.querySelector('.gallery-thumb-scroll');
            let thumbSliders = galleryThumbScroll.querySelectorAll('.gallery-thumb-slider');
            if (thumbSliders.length > 0) {
              this.thumbScrollWidth = thumbSliders[0]['offsetWidth'] * thumbSliders.length;
              if (this.thumbScrollWidth < elem.scrollWidth) {
                this.isThumbOverflow = false;
              }
            }
          }
        } else {
          setTimeout(check, 10);
        }
      }
    };
    check();
  }


  /**
   * 初始化图片数据
   * @param data
   * @param props
   */
  private initImages(data: any[], props: string[]) {
    this.images = [];
    if (data.length > 0) {
      let images = [];
      for (let o of data) {
        let url = '';
        if (props.length > 0) {
          url = this.getValueByProps(o, props);
        } else if (typeof o == 'string') {
          url = o;
        }
        images.push({
          url: url,
          scale: 1,
          rotate: 0,
          left: 0,
          top: 0
        });
      }
      this.images = images;
    }
  }

  /**
   * 改变显示图片后滑动（如果需要）缩略图
   * @param direction 
   */
  slideThumbAfterChange(direction: number) {
    clearTimeout(this.thumbSlideTimer);
    this.thumbSlideTimer = setTimeout(() => {
      let sliderWrap = this.eleRef.nativeElement.querySelector('.gallery-thumb-sliders');
      if (sliderWrap) {
        let perW = sliderWrap.offsetWidth;
        let scrollL = sliderWrap.scrollLeft;
        let sliderW = sliderWrap.clientWidth;
        if (direction === 0) {
          let refValue = (this.activeIndex) * perW;
          if (scrollL > refValue) {
            this.slide(sliderWrap, refValue - scrollL);
          }
        } else if (direction === 1) {
          let validScrollLeft = perW * (this.activeIndex + 1) - sliderW;
          if (validScrollLeft > scrollL) {
            this.slide(sliderWrap, validScrollLeft - scrollL);
          }
        }
      }
    });
  }

  /**
   * 缩略图滚动
   * @param elem
   * @param direction
   */
  slideThumb(elem: HTMLElement, direction: number) {
    var val = 0;
    var thumbItem = elem.querySelector('.gallery-thumb-slider');
    var thumbItemWidth = thumbItem['offsetWidth'];
    if (direction == 0) {
      val = -elem.clientWidth;
    } else {
      val = Math.floor(elem.clientWidth / thumbItemWidth) * thumbItemWidth;
    }
    var canScrollVal = elem.scrollWidth - elem.scrollLeft;
    if (val > canScrollVal) {
      val = Math.floor((canScrollVal) / thumbItemWidth) * thumbItemWidth;
    }
    this.slide(elem, val);
  }

  /**
   * 滚动
   * @param elem 滚动的元素
   * @param val  滚动值
   */
  slide(elem: HTMLElement, val: number) {
    var scrollLen = val;
    {
      var fps = 60;//帧数
      var run_time = 300;//执行时间
      var t_o = 1000 / fps;//每改变一次的时间间隔
      var t = 0;//开始时间
      var b = elem.scrollLeft;//初始值
      var c = scrollLen;//变化量
      var d = run_time / t_o;//次数
      var animate = this.tween.easeInOut;//选择算法
    }

    var timer = setInterval(function () {
      var newVal = Math.ceil(animate(t, b, c, d));
      elem.scrollLeft = newVal;
      if (t < d) {
        t++;
      } else {
        clearInterval(timer);
      }
    }, t_o);
  }

  /**
   * 通过属性名获取值
   * @param obj
   * @param pros
   * @returns any
   */
  private getValueByProps(obj: Object, pros: string[]): any {
    let result = obj;
    for (let prop of pros) {
      if (typeof result === 'object') {
        result = result[prop];
      }
    }
    return result;
  }

  /**
   * 打开
   */
  open(...args) {
    this.hideBodyScrollBar();
    this.render = true;
    this.isShowBtns = true;
    this.isFullScreen = false;
    this.isPressing = false;
    let dataIndex = 0;//索引
    let ev;//事件源

    let paramStrArr = [];//字符串数组参数容器
    let imgSrc = '';
    if (args && args.length > 0) {//参数处理
      for (let i in args) {
        if (args[i] instanceof MouseEvent) {//匹配事件源
          ev = args[i];
        }
        if (typeof args[i] === 'number') {//匹配index
          dataIndex = args[i];
        }
        if (args[i] instanceof Array) {//匹配
          paramStrArr.push(args[i]);
        }
        if (typeof args[i] === 'string') {//匹配单个图片地址或title
          if (!imgSrc) {//第一个字符串作为单个图片的地址
            imgSrc = args[i];
          } else {//n+1(n=0,1,2..)第2个以及之后的字符串作为title
            this.title = args[i];//title
          }
        }
      }
    }
    let dataObj = this.data;
    let dataProps = this.dataProps;
    if (imgSrc !== '') {
      dataObj = [imgSrc];
      dataProps = [];
      dataIndex = 0;
    } else {
      if (paramStrArr.length > 0) {
        dataObj = paramStrArr[0];
      }
      if (paramStrArr.length > 1) {
        dataProps = paramStrArr[1];
      }
    }
    this.initImages(dataObj, dataProps);
    let maxIndex = dataObj.length - 1;
    this.activate(dataIndex > maxIndex ? maxIndex : dataIndex);
    if (ev) {//根据事件源获取鼠标点击位置，从而从该位置弹出
      this.isEventSource = true;
      let pos = this.getMousePosition(ev),
        scrollElem = document.documentElement || document.body,
        scrollLeft = scrollElem.scrollLeft,
        scrollTop = scrollElem.scrollTop;
      this.tempLeft = (pos.left - scrollLeft) + 'px';
      this.tempTop = (pos.top - scrollTop) + 'px';
      this.left = this.tempLeft;
      this.top = this.tempTop;
    } else {
      this.isEventSource = false;
      this.tempLeft = '0';
      this.tempTop = '0';
    }
    let isAnimation = ((this.isAnimation + '') != 'false');
    {//就绪
      let delay = isAnimation ? this.transitionTime : 0;
      setTimeout(() => {
        this.ready = true;//就绪
        this.checkIsThumbOverflow();//检查是否溢出
      }, delay);
    }
    {//动画
      if ((this.isAnimation + '') != 'false') {
        setTimeout(() => {
          if (this.isEventSource) {
            this.transition = 'all ' + this.transitionTime + 'ms' + ' ease-in-out';
          } else {
            this.transition = 'opacity ' + this.transitionTime + 'ms' + ' ease-in-out';
          }
          this.show();
        }, 100);
      } else {
        this.show();
      }
    }

    this.addWindowListeners();
  }

  private show() {
    setTimeout(() => {//显示
      this.visible = true;
      this.setPositionAccordingSize();
    });
  }

  /**
   * 监听窗口事件
   */
  private addWindowListeners() {
    //监听窗口大小变化
    window.addEventListener('resize', this.resizeHandler);
    //点击窗口空白处
    setTimeout(() => {
      window.addEventListener('click', this.windowClickHandler);
    });
    //键盘控制
    setTimeout(() => {
      window.addEventListener('keydown', this.keydownHandler);
    });
    //
    setTimeout(() => {
      window.addEventListener('mousewheel', this.mouseWheelHandler);
      window.addEventListener('DOMMouseScroll', this.mouseWheelHandler);
    })
  }

  /**
   * 根据尺寸设置位置
   */
  private setPositionAccordingSize() {
    if (this.size == 'lg') {
      this.left = '10%';
      this.top = '10%';
    } else if (this.size == 'md') {
      this.left = '20%';
      this.top = '20%';
    } else if (this.size == 'sm') {
      this.left = '30%';
      this.top = '30%';
    } else if (this.size == 'xs') {
      this.left = '37.5%';
      this.top = '37.5%';
    } else {
      this.left = '0';
      this.top = '0';
    }
    let bodyW = document.body.clientWidth;
    let bodyH = document.body.clientHeight;
    let w = parseFloat(this.width),
      h = parseFloat(this.height);
    if (w > bodyW) {
      w = bodyW;
    }
    if (h > bodyH) {
      h = bodyH;
    }
    this.styleWidth = w + 'px';
    this.styleHeight = h + 'px';
    if (w) {
      this.left = 'calc(50% - ' + w / 2 + 'px)';
    }
    if (h) {
      this.top = 'calc(50% - ' + h / 2 + 'px)';
    }

  }

  /**
   * 关闭
   */
  close() {
    this.reShowBodyScrollBar();
    this.visible = false;
    if (this.isEventSource) {
      this.left = this.tempLeft;
      this.top = this.tempTop;
      this.styleWidth = 0;
      this.styleHeight = 0;
    }
    this.ready = false;
    setTimeout(() => {
      this.render = false;
      this.transition = '';
    }, this.transitionTime);
    this.removeEvents();
    this.onClose.emit();
  }

  /**
   * 全屏切换
   */
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  /**
   * 点击空白处
   */
  whiteSpaceClickAction() {
    if (!this.size) {
      this.close();
    }
  }

  /**
   * 最外层容器点击处理
   * @param ev 
   */
  wrapClickAction(ev: Event) {
    if (this.size) {
      ev.stopPropagation();
    }
  }


  /**
   * 上一张
   */
  prev() {
    if (this.activeIndex > 0) {
      this.activate(this.activeIndex - 1);
    }
  }

  /**
   * 下一张
   */
  next() {
    if (this.activeIndex < this.images.length - 1) {
      this.activate(this.activeIndex + 1);
    }
  }

  /**
   * 激活指定图片到当前窗口
   * @param index
   */
  activate(index: number) {
    this.activeIndex = index;
    this.change.emit(this.activeIndex);
    this.onChange.emit(this.activeIndex);
  }

  /**
   * 获取鼠标位置
   * @param e
   * @returns <{left: number; top: number}>
   */
  private getMousePosition(e: MouseEvent): { left: number, top: number } {
    var m_x = e.pageX || (e.clientX +
      (document.documentElement.scrollLeft
        || document.body.scrollLeft));
    var m_y = e.pageY || (e.clientY +
      (document.documentElement.scrollTop
        || document.body.scrollTop));
    return { left: m_x, top: m_y };
  }


  /**
   * 显示/隐藏工具
   */
  toggleShowTools() {
    this.isShowBtns = !this.isShowBtns;
  }

  /**
   * 放大
   * @param val 
   */
  enlarge(val: number) {
    let img = this.images[this.activeIndex];
    let scale = img.scale;
    scale += val;
    img.scale = scale;
    this.showScaleInfo();
  }
  /**
   * 缩小
   * @param val 
   */
  reduce(val: number) {
    let img = this.images[this.activeIndex];
    let scale = img.scale;
    if (scale > 0.1) {
      scale -= val;
    }
    img.scale = scale;
    this.showScaleInfo();
  }

  /**
   * 显示缩放比例信息
   */
  private showScaleInfo() {
    this.isShowScaleInfo = true;
    clearTimeout(this.hideScaleInfoTimer);
    this.hideScaleInfoTimer = setTimeout(() => {
      this.isShowScaleInfo = false;
    }, 1000);
  }

  /**
   * 旋转
   */
  rotate() {
    let img = this.images[this.activeIndex];
    img.scale = 1;
    img.left = 0;
    img.top = 0;
    let rotate = img.rotate;
    rotate += 90;
    img.rotate = rotate;
  }

  /**
   * 下载
   */
  download() {
    let url = this.images[this.activeIndex].url;
    const iframe = document.createElement('IFRAME');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.setAttribute('src', url);
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }

  /**
   * 隐藏document.body的滚动条（如果有的话）
   */
  private hideBodyScrollBar() {
    let orgW = document.body.offsetWidth;//有滚动条时的宽度
    document.body.style.overflowY = 'hidden';
    let curW = document.body.offsetWidth;//无滚动条时的宽度
    let padR = document.body.style.paddingRight.replace('px', '');
    if (padR) {
      this.bodyPadR = parseFloat(padR);
    }
    if (curW > orgW) {
      document.body.style.paddingRight = this.bodyPadR + (curW - orgW) + 'px';//给body设置paddingRight避免页面抖动
    }
  }

  /**
   * 重新显示document.body的滚动条（如果有的话）
   */
  private reShowBodyScrollBar() {
    document.body.style.overflowY = null;
    document.body.style.paddingRight = (this.bodyPadR ? this.bodyPadR + 'px' : null);
  }
}
