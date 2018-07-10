import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Injectable()
/**
 * 可跟踪的路由
 */
export class TracertService {
    path: string;
    searchParams: Object;
    constructor(
        private router: Router,
        private actRoute: ActivatedRoute,
    ) {

    }


    /**
     * 监听路由变化
     * @param searchParams 搜索参数（只有初始化的参数能被监听到）
     * @param action 监听的回调
     */
    subscribe(searchParams: Object, action?: Function) {
        this.searchParams = searchParams;
        this.actRoute.params.subscribe((params: Params) => {
            let url_params = params;
            for (let key in this.searchParams) {
                if (typeof this.searchParams[key] === 'string' && url_params[key]) {
                    this.searchParams[key] = url_params[key] + '';
                } else if (typeof this.searchParams[key] === 'number' && url_params[key] !== undefined) {
                    this.searchParams[key] = parseFloat(url_params[key]);
                }
            }
            if (typeof action === 'function') {
                action();
            }
        });
    }

    /**
     * 导航
     * 将搜索参数写进url参数并跳转，使浏览器生成历史访问记录
     */
    navigate() {
        let path = this.router.url.split(';')[0];
        let searchParams: Object = {};
        for (let key in this.searchParams) {
            if (typeof this.searchParams[key] === 'string' && this.searchParams[key]) {
                searchParams[key] = this.searchParams[key];
            } else if (typeof this.searchParams[key] === 'number' && (this.searchParams[key] || this.searchParams[key] === 0)) {
                searchParams[key] = this.searchParams[key];
            }
        }
        this.router.navigate([path, searchParams]);
    }
}