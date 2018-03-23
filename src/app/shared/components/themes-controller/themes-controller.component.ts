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
    this.init();
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnDestroy(){
    window.removeEventListener('click',this.outClickHandler);
  }
  init() {
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
  changeTab(index:number){
    this.tabIndex=index;
  }

  toggleVisible(){
    this.visible=!this.visible;
  }

  setSkin(val:string){
    if(val) {
      this.themesSvc.setSkin(val);
    }else{
      this.themesSvc.clearSkin();
    }
    if(val==='black'){
      this.themesSvc.themes.headerLeft='black';//black
      this.themesSvc.themes.headerRight='black';//black
      this.themesSvc.themes.asideLeft='black';//black
    }else if(val==='dol'){
      this.themesSvc.themes.headerLeft='';
      this.themesSvc.themes.headerRight='';
      this.themesSvc.themes.asideLeft='cerulean-outline';
    }else{
      this.themesSvc.themes.headerLeft='';//black
      this.themesSvc.themes.headerRight='';//black
      this.themesSvc.themes.asideLeft='';//black
    }
  }
}
