import { Component} from '@angular/core';
import { PopService} from '../../../services/pop/pop.service';
@Component({
    selector: 'pop-demo',
    templateUrl: './pop-demo.component.html',
    styleUrls: ['./pop-demo.component.less'],
})
export class PopDemoComponent {

  constructor(private pop:PopService){
  }
  info(){
    console.log('info');
    this.pop.info({
      title:'系统提示',
      text:'这是一个消息提示！',
      textAlign:'center'
    });
  }
  confirm(){
    this.pop.confirm({
      title:'操作确认',
      text:'确定要这么做吗？'
    }).onConfirm(()=>{
      alert('你选择了确定按钮');
    }).onCancel(()=>{
      alert('你选择了取消按钮');
    }).onClose(()=>{
      alert('你选择了关闭');
    });
  }
  error(){
    this.pop.error({
      title:'错误提示',
      text:'对象未定义'
    })
  }
  loader(){
    this.pop.confirm({
      title:'操作确认',
      text:'确定要这么做吗？',
      closeOnConfirm:false,
      showLoaderOnConfirm:true,
      confirmLoaderText:'正在提交'
    })
  }
}
