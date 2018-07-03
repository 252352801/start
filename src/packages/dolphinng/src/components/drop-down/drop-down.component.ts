/**
 * 展开/收起
 * @author Jianhang Yu
 */
import {
	Component
} from '@angular/core';
import { SlideDownComponent } from '../slide-down/slide-down.component';
@Component({
	selector: 'drop-down',
	templateUrl: '../slide-down/slide-down.component.html',
	styleUrls: ['../slide-down/slide-down.component.less']
})
export class DropDownComponent extends SlideDownComponent {

}

//获取的高度
