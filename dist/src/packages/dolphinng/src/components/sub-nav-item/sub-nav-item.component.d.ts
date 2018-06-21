import { OnInit, ElementRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ThirthNavItemComponent } from '../thirth-nav-item/thirth-nav-item.component';
export declare class SubNavItemComponent implements OnInit, AfterViewInit {
    private elemRef;
    private router;
    private actRoute;
    private componentFactoryResolver;
    text: string;
    link: string;
    icon: string;
    disabled: any;
    hasChild: boolean;
    routeLink: string;
    childrenHost: ViewContainerRef;
    thirthNavItems: ThirthNavItemComponent[];
    constructor(elemRef: ElementRef, router: Router, actRoute: ActivatedRoute, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    isActive(): boolean;
    private openWrap(elem);
    private closeWrap(elem);
    ngAfterViewInit(): void;
    isAsideFolded(): boolean;
    /**
     * 元素是否包含某个类
     * @param elem
     * @param className
     * @returns boolean
     */
    private hasClass(elem, className);
    /**
     * 为元素添加一个类
     * @param elem
     * @param className
     */
    private addClass(elem, className);
    /**
     * 删除某个类
     * @param elem
     * @param className
     */
    private removeClass(elem, className);
    inserThirthNavItem(options: {
        text: string;
        icon?: string;
        link?: string;
    }): ThirthNavItemComponent;
}
