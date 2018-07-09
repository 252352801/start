import { RouterModule, Routes,Data} from '@angular/router';
import {AppComponent} from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';
const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full',data:{title:'登录'} },
    { path: 'signin',  component: SigninComponent,data:{title:'登录'}},
    { path: '',  component: IndexComponent,data:{title:'首页'},
      children:[
        { path: 'about', loadChildren: './about/about.module#AboutModule',data:{title:'关于'} },
        { path: 'services', loadChildren: './services/services.module#ServicesModule',data:{title:'服务'} },
        { path: 'components', loadChildren: './components/components.module#ComponentsModule',data:{title:'组件'} },
        { path: 'directives', loadChildren: './directives/directives.module#DirectivesModule',data:{title:'指令'} },
        { path: 'pipes', loadChildren: './pipes/pipes.module#PipesModule',data:{title:'管道'} },
        { path: 'UIKits', loadChildren: './UIKits/UIKits.module#UIKitsModule',data:{title:'UIKits'}},
        { path: 'form', loadChildren: './form/form.module#FormModule',data:{title:'表单'}},
        { path: 'dataTable', loadChildren: './data-table/data-table.module#DataTableModule',data:{title:'dataTable'}},
        { path: 'themes', loadChildren: './themes/themes.module#ThemesModule',data:{title:'主题'}},
        { path: 'charts', loadChildren: './charts/charts.module#ChartsModule',data:{title:'图表'}}
      ]
    }
];
export const routing = RouterModule.forRoot(routes);
