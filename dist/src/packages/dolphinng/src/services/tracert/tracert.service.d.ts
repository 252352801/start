import { Router, ActivatedRoute } from '@angular/router';
export declare class TracertService {
    private router;
    private actRoute;
    path: string;
    searchParams: Object;
    constructor(router: Router, actRoute: ActivatedRoute);
    /**
     * 监听路由变化
     * @param searchParams 搜索参数（只有初始化的参数能被监听到）
     * @param action 监听的回调
     */
    subscribe(searchParams: Object, action?: Function): void;
    /**
     * 导航
     * 将搜索参数写进url参数并跳转，使浏览器生成历史访问记录
     */
    navigate(): void;
}
