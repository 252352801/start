/**
 * nx-select
 * @author Qingyu Wei
 */
import {
	Component,
	OnChanges,
	AfterContentInit,
	AfterContentChecked,
	SimpleChanges,
	Input,
	ElementRef,
	ViewChild,
	ContentChild,
} from '@angular/core';

@Component({
	selector: 'nx-select',
	templateUrl: 'select.component.html',
	styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnChanges, AfterContentInit, AfterContentChecked {

	visible = false;
	private initializedStyle=false;
	@Input() value: any;//select的值
	@Input() options: any[];//select选项的数据
	@Input() valueKey: string;//value在options元素上的key
	@Input() textKey: string;//显示文字在options元素上的key
	@Input() styleClass: string;//添加的css class
	text: string = '';
	@ViewChild('body') body: ElementRef;
	constructor(
		private elemRef: ElementRef
	) {

	}

	ngOnChanges(changes: SimpleChanges) {
		let valChg = changes['value'];
		if (valChg) {
			this.text = this.matchText(valChg.currentValue, this.options);
		}
	}
	ngAfterContentInit() {
		this.visible = true;
		this.setDefaultStyle();
	}
	ngAfterContentChecked() {
		this.setDefaultStyle();
	}

	private setDefaultStyle() {
		if(!this.initializedStyle&&this.body){
			const select = this.elemRef.nativeElement.querySelector('select');
			if (select) {
				//lineHeight
				const elem = this.body.nativeElement;
				const rect = elem.getBoundingClientRect();
				this.body.nativeElement.style.lineHeight = rect.bottom - rect.top - 2 + "px";
				//paddingRight
				const padLeft = this.getCss(select, 'paddingLeft');
				if (padLeft) {
					elem.style.paddingLeft = padLeft;
				}
				this.initializedStyle=true;
			}
		}
	}

	/**
	 * 获取元素生效的css属性值
	 * @param elem 
	 * @param attr 
	 */
	private getCss(elem: any, attr: string): string {
		if (elem && typeof elem === 'object' && attr && typeof attr === 'string') {
			if (typeof document.defaultView.getComputedStyle == 'function') {
				if (attr === 'float') {//float的特殊处理
					attr = 'cssFloat';
				}
				return document.defaultView.getComputedStyle(elem, null)[attr];
			} else if (elem.currentStyle && typeof elem.currentStyle === 'object') {
				if (attr === 'float') {//float的特殊处理
					attr = 'styleFloat';
				}
				return elem.currentStyle[attr];
			}
		}
	}

	/**
	 * 匹配文字
	 * @param val 
	 * @param options 
	 */
	matchText(val: any, options: any[]): string {
		let text = '';
		if (options instanceof Array) {
			if (this.valueKey && typeof this.valueKey == 'string') {
				if (this.textKey && typeof this.textKey == 'string') {
					for (let o of options) {
						if (o && typeof o == 'object' && val === o[this.valueKey]) {
							text = o[this.textKey];
						}
					}
				}
			}
		}
		return text;
	}

}




