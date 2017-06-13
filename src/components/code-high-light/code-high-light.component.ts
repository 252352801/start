import { Component,OnInit,ElementRef,Input} from '@angular/core';
@Component({
  selector: 'code-high-light',
  templateUrl: './code-high-light.component.html',
  styleUrls: ['./code-high-light.component.less']
})
export class CodeHighLightComponent implements  OnInit {
  @Input() language:string;
  constructor(private elemRef:ElementRef) {

  }

  ngOnInit() {
    /*console.log(Prism);
    console.log(Prism.highlight);
    let codeElem=this.elemRef.nativeElement.querySelector('code');
   // let text=codeElem.innerHTML;
    codeElem.className='language-html';
    codeElem.textContent='&lt;h1 class="test"&gt;1&lt;/h1&gt;';
    let fn=Prism.highlightElement;
    fn(codeElem);*/


    //异步请求代码
    /*var src ='modules/feedback/pop-demo/pop-demo.component.html';
    var language;
    language = 'html';
    var code = this.elemRef.nativeElement.querySelector('code');
    code.className = 'language-' + language;
    code.textContent = 'Loading…';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {

        if (xhr.status < 400 && xhr.responseText) {
          code.textContent = xhr.responseText;
          let fn=PrismPlugin['prism'].highlightElement
          fn(code);
        }
        else if (xhr.status >= 400) {
          code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
        }
        else {
          code.textContent = '✖ Error: File does not exist or is empty';
        }
      }
    };

    xhr.send(null);*/
  }
}
