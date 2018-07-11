import {Component,OnInit,OnChanges,OnDestroy, SimpleChanges,ViewChild,ElementRef} from '@angular/core';
import {ThemesService} from '../../../core/services/themes/themes.service';
@Component({
  selector: 'themes-controller',
  templateUrl: './themes-controller.component.html',
  styleUrls: ['./themes-controller.component.less']
})
export class ThemesControllerComponent implements OnInit,OnChanges,OnDestroy {

  visible:boolean=false;

  tabIndex:number=0;

  private outClickHandler:EventListenerOrEventListenerObject;//点击外部触发的事件
  @ViewChild('wrap') wrap:ElementRef;
  constructor(
    public themesSvc: ThemesService
  ) {
  }

  ngOnInit() {
    this.outClickHandler=(ev)=>{
      this.visible=false;
    };
    window.addEventListener('click',this.outClickHandler);
    if(this.wrap&&this.wrap.nativeElement){
      this.wrap.nativeElement.addEventListener('click',(ev)=>{
        ev.stopPropagation();
      });
    }
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnDestroy(){
    window.removeEventListener('click',this.outClickHandler);
  }
  changeTab(index:number){
    this.tabIndex=index;
  }

  toggleVisible(){
    this.visible=!this.visible;
  }

  setSkin(val:string){
    this.themesSvc.setSkin(val);
  }
}
