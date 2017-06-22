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
        { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule',data:{title:'操作反馈'} },
        { path: 'components', loadChildren: './components/components.module#ComponentsModule',data:{title:'组件'} },
        { path: 'directives', loadChildren: './directives/directives.module#DirectivesModule',data:{title:'指令'} },
        { path: 'UIKits', loadChildren: './UIKits/UIKits.module#UIKitsModule',data:{title:'UIKits'}},
        { path: 'form', loadChildren: './form/form.module#FormModule',data:{title:'表单'}},
        { path: 'dataTable', loadChildren: './data-table/data-table.module#DataTableModule',data:{title:'dataTable'}}
      ]
    }
];
export const routing = RouterModule.forRoot(routes);
