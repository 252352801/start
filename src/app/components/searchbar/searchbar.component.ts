import {Component, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.less'],
})
export class SearchbarComponent implements OnInit,OnDestroy,OnChanges {
  @Input() maxHeight:any = 200;


  @Input() keyword:any;
  @Input() dropDownAble:boolean=true;
  @Output() keywordChange:EventEmitter<any> = new EventEmitter();
  @Output() choose:EventEmitter<any> = new EventEmitter();
  dropDown:boolean = false;
  hasOption:boolean = false;

  closeHandler:any;

  constructor() {
  }

  ngOnInit() {
    this.closeHandler = ()=> {
      console.log('close');
      this.hideOptions();
    };
    document.body.addEventListener('click', this.closeHandler);
  }

  ngOnChanges(changes:SimpleChanges) {

  }

  emitChange(ev){
    let target:any=ev.target||ev.srcElement;
    let newVal=target.value;
    console.log(ev);
    this.keywordChange.emit(newVal);
  }
  ngOnDestroy() {
    document.body.removeEventListener('click', this.closeHandler);
    this.closeHandler = null;
  }

  dropDownOptions() {
    this.dropDown = true;
  }

  hideOptions() {
    this.dropDown = false;
  }

  stopPropagation(ev) {
    ev.stopPropagation();
  }


  selectData(data) {
    this.choose.emit(data);
  }

  test(){
    console.log('tpl');
  }

  onScroll(ev) {
    let target:any = ev.target || ev.srcElement;

    target.scrollLocked = true;
    let height = target.clientHeight,
      scrollTop = target.scrollTop,
      scrollHeight = target.scrollHeight;
    if (scrollTop >= scrollHeight - height) {

      target.scrollEnd = true;
      console.log('滚动到底部了');

      delete target.scrollEnd;

    }

  }
}

