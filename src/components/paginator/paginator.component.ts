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
  pageCount:number;//总页数
  items:Array<number> = [];//页码元素
  @Output() indexChange:EventEmitter<any> = new EventEmitter();
  @Input() maximum:number = 5;//最多显示的按钮数
  @Input() changePageSizeAble:boolean = false;//是否可改变每页大小
  @Input() inputAble:boolean = true;//是否可输入
  @Input() ellipsis:boolean = true;//是否省略
  @Input() pageSizeOptions:Array<number> = [5, 10, 25, 50, 100];

  @Input() size:string = '';//控件尺寸
  @Input() showTotal:boolean = false;//显示文字信息

  inputIndex:number;
  @Output() onChangePage:EventEmitter<any> = new EventEmitter();
  @Output() onChangePageError:EventEmitter<any> = new EventEmitter();
  constructor(private elemRef:ElementRef) {

  }

  ngOnInit() {
    this.create(this.index, this.count, this.pageSize);
    this.initPageSizeOptions();
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(111);
    /*let countChg=changes['count'];
     let pageSizeChg=changes['pageSize'];
     if((countChg.currentValue!==countChg.previousValue)||(pageSizeChg.currentValue!==pageSizeChg.previousValue)){
     this.create(this.index,countChg.currentValue,pageSizeChg.currentValue);
     }*/
  }

  /**
   * 初始化每页大小选项
   */
  initPageSizeOptions() {
    if (this.pageSizeOptions.indexOf(this.pageSize) < 0) {
      for (let i = 0, len = this.pageSizeOptions.length; i < len; i++) {
        if (this.pageSize <= this.pageSizeOptions[i]) {
          this.pageSizeOptions.splice(i - 1, 0, this.pageSize);
          break;
        }
      }
    }
  }

  changPageSize() {
    this.pageSizeChange.emit(this.pageSize);
    this.pageCount = Math.ceil(this.count / this.pageSize);
    let sIndex, eIndex;
    if (this.index > this.pageCount - 1) {
      this.index = this.pageCount - 1;
      this.indexChange.emit(this.index);
      eIndex = this.index+1;
      sIndex = eIndex - this.maximum > 0 ? eIndex - this.maximum: 0;
      console.log('dayu ');
    } else {
      sIndex = this.index;
      if (this.pageCount - this.index - 1 > this.maximum) {
        sIndex = this.index;
      } else {
        sIndex = this.pageCount - this.maximum;
        if (sIndex < 0) {
          sIndex = 0;
        }
      }
      eIndex = (sIndex + this.maximum <= this.pageCount) ? sIndex + this.maximum: this.pageCount;
    }
    this.createItems(sIndex, eIndex);
  }

  /**
   * 建立页码元素和页数
   * @param index
   * @param count
   * @param pageSize
   */
  private create(index:number, count:number, pageSize:number) {
    if (count >= 0 && pageSize > 0) {
      this.items = [];
      let pageCount = Math.ceil(count / pageSize);
      this.pageCount = pageCount;
      let sIndex = index;
      let eIndex = (pageCount - sIndex) > this.maximum ? this.maximum : (pageCount - sIndex);
      this.createItems(sIndex, eIndex);
    }
  }

  private createItems(start:number, end:number) {
    this.items = [];
    for (let i = start; i < end; i++) {
      this.items.push(i);
    }
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
      if (this.items.indexOf(this.index) < 0) {
        let sIndex, eIndex;
        if (this.index < this.items[0]) {
          let a = this.index - this.maximum + 1;
          sIndex = (a > 0 ? a : 0);
        } else if (this.index > this.items[this.items.length - 1]) {
          sIndex = this.index;
        }
        let b = this.pageCount - sIndex;
        eIndex = b > this.maximum ? sIndex + this.maximum : sIndex + b;
        this.createItems(sIndex, eIndex);
      }
    }else{
      this.onChangePageError.emit(this.inputIndex);
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

}

