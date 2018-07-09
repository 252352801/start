import { Component,Input,Output,OnInit,OnChanges,SimpleChanges,ElementRef,EventEmitter} from '@angular/core';
@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less']
})
export class PaginatorComponent implements OnInit,OnChanges {
  @Input() count:number = 0;//总记录
  @Input() pageSize:number = 10;//每页大小
  @Output() pageSizeChange:EventEmitter<any> = new EventEmitter();
  @Input() index:number = 0;//当前页
  @Output() indexChange:EventEmitter<any> = new EventEmitter();
  pageCount:number;//总页数
  items:Array<number> = [];//页码元素
  @Input() maximum:number = 5;//最多显示的按钮数
  @Input() changePageSizeAble:boolean = false;//是否可改变每页大小
  @Input() inputAble:boolean = false;//是否可输入
  @Input() ellipsis:boolean = true;//是否省略
  @Input() pageSizeOptions:Array<number> = [10, 30, 50, 100];

  @Input() size:string = '';//控件尺寸
  @Input() showTotal:boolean = false;//显示文字信息
  @Input() styleClass:string;//额外样式类

  inputIndex:number;
  @Output() onChangePage:EventEmitter<any> = new EventEmitter();
  @Output() onChangePageError:EventEmitter<any> = new EventEmitter();
  constructor(private elemRef:ElementRef) {

  }

  ngOnInit() {
    this.create();
    this.initPageSizeOptions();
  }

  ngOnChanges(changes:SimpleChanges) {
     let countChg=changes['count'];
     let pageSizeChg=changes['pageSize'];
     if((countChg&&countChg.currentValue!==countChg.previousValue)||(pageSizeChg&&pageSizeChg.currentValue!==pageSizeChg.previousValue)){
       this.create();
     }
  }
  /**
   * 建立页码元素和页数
   */
  create(){
    this.pageCount = Math.ceil(this.count / this.pageSize);
    let sIndex, eIndex;
    if(this.pageCount<=0){//总条目小于等于0
      sIndex=0;
      eIndex=1;
    }else if (this.index > this.pageCount - 1) {//当前页超出最大页
      this.index = this.pageCount - 1;
      this.indexChange.emit(this.index);
      eIndex = this.index+1;
      sIndex = eIndex - this.maximum > 0 ? eIndex - this.maximum: 0;
    } else {//当前页小于等于最大页
      sIndex = this.index;
      if (this.pageCount- 1 - this.index <this.maximum) {
        sIndex = this.pageCount - this.maximum;
      }
      if (sIndex < 0) {
        sIndex = 0;
      }
      eIndex = (sIndex + this.maximum <= this.pageCount) ? sIndex + this.maximum: this.pageCount;
    }
    this.createItems(sIndex, eIndex);
  }

  /**
   * 初始化每页大小选项
   */
  initPageSizeOptions() {
    if (this.pageSizeOptions.indexOf(this.pageSize) < 0) {
      for (let i = 0, len = this.pageSizeOptions.length; i < len; i++) {
        if (this.pageSize <= this.pageSizeOptions[i]) {
          if(i===0){
            this.pageSizeOptions.unshift(this.pageSize);
          }else{
            this.pageSizeOptions.splice(i, 0, this.pageSize);
          }
          break;
        }
      }
    }
  }

  private createItems(start:number, end:number) {
    if(start<0){
      start=0;
    }
    this.items = [];
    for (let i = start; i < end; i++) {
      this.items.push(i);
    }
  }

  /**
   * 改变页大小
   * @param index
   */
  changePageSize(ev){
    let e=ev||window.event;
    let target=e.target||e.srcElement;
    let newSize=parseInt(target.value);
    this.pageSize=newSize;
    this.pageSizeChange.emit(newSize);
    this.create();
    this.onChangePage.emit(this.index);
  }

  /**
   * 改变页
   * @param index
   */
  changePage(index:number) {
    if (index >= 0 && index < this.pageCount) {
      this.index = index;
      this.indexChange.emit(this.index);
      this.onChangePage.emit(this.index);
      if (this.items.indexOf(this.index) < 0) {//如果跳转的页码不在items(页码按钮集)内
        let sIndex, eIndex;
        if (this.index < this.items[0]) {//items左边
          let a = this.index - this.maximum + 1;
          sIndex = (a > 0 ? a : 0);
        } else if (this.index > this.items[this.items.length - 1]) {//items右边
          sIndex = this.index;
          if(sIndex>this.pageCount-this.maximum){
            sIndex=this.pageCount-this.maximum;
          }
          if(sIndex<0){
            sIndex=0;
          }
        }
        let b = this.pageCount - sIndex;
        eIndex = b > this.maximum ? sIndex + this.maximum : sIndex + b;
        this.createItems(sIndex, eIndex);
      }
    }else{
      let arg=(this.inputIndex!==undefined?this.inputIndex:this.index);
      this.onChangePageError.emit(arg);
    }
  }

  /**
   * 上一页
   */
  prev() {
    if (this.index > 0) {
      this.index--;
      this.changePage(this.index);
    }
  }

  /**
   * 下一页
   */
  next() {
    if (this.index < this.pageCount - 1) {
      this.index++;
      this.changePage(this.index);
    }
  }

  /**
   * 第一页
   */
  first(){
    if (this.index!==0) {
      this.index=0;
      this.changePage(this.index);
    }
  }
  /**
   * 最后一页
   */
  last(){
    if (this.index!==this.pageCount - 1) {
      this.index=this.pageCount - 1;
      this.changePage(this.index);
    }
  }

}

