/**
 * 展开/收起
 * @author Jianhang Yu
 */
import {
	Component,
	OnInit,
	Input,
	ViewChild,
	ElementRef
	 } from '@angular/core';

@Component({
	selector: 'drop-down',
	templateUrl: 'drop-down.component.html',
	styleUrls:['./drop-down.component.less']
})
export class DropDownComponent implements OnInit {
	//真正控制内容的显示隐藏
	visible:boolean
	//为了消除ngif造成的闪动，引入opacity
	cssOpen:boolean
	isTransition:boolean=false;
	//设置动画时间
	@Input() animateTime:number=0.3;

	@ViewChild('wrap') wrap:ElementRef;
	@ViewChild('content') content:ElementRef;

  constructor(){
  }
	@Input() set show(value:boolean){

		//传入的值为true，内容显示
		//先获取实际内容的高度
		let height;
		if (value) {
      this.wrap.nativeElement.style.overflow='hidden';
      this.cssOpen=true
			this.visible=value
			setTimeout(()=>{
        height=this.content.nativeElement.offsetHeight
				this.wrap.nativeElement.style.height=0
        this.isTransition=true;
				setTimeout(()=>{
          this.cssOpen=false
          setTimeout(()=>{
            this.wrap.nativeElement.style.height=height+"px"
            setTimeout(()=>{
              this.wrap.nativeElement.style.overflow=null;
            },this.animateTime*1000)
          })
				})
			})

		}else{
			this.wrap.nativeElement.style.height=0
      this.wrap.nativeElement.style.overflow='hidden';
			setTimeout(()=>{
        this.wrap.nativeElement.style.overflow=null;
				this.wrap.nativeElement.style.height=null
        this.isTransition=false;
				this.visible=value
			},this.animateTime*1000)
		}
	}


	ngOnInit() {

	}

	open(){
    if(!this.visible){
      this.show=true
    }
	}

	close(){
    if(this.visible){
      this.show=false
    }
	}
	toggle(){
		this.show=!this.visible;
  }


}




//获取的高度
