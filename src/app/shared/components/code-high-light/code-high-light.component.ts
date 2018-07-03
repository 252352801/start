import { Component, OnInit, ElementRef, Input, ViewChild, ContentChild, AfterContentInit } from '@angular/core';
declare const Prism:any;
@Component({
  selector: 'code-high-light',
  templateUrl: './code-high-light.component.html',
  styleUrls: ['./code-high-light.component.less']
})
export class CodeHighLightComponent implements OnInit, AfterContentInit {
  @Input() language: string;
  @Input() codeSrc: string;
  @Input() maxHeight: any;
  @ViewChild('codeElemRef') codeElemRef: ElementRef;
  constructor(private elemRef: ElementRef) {

  }

  ngOnInit() {
    //异步请求代码
    if (this.codeSrc) {
      let codeElem = this.codeElemRef.nativeElement;
      codeElem.className = 'language-' + this.language;
      codeElem.textContent = 'Loading…';
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.codeSrc, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status < 400 && xhr.responseText) {
            codeElem.textContent = xhr.responseText;
            if (Prism && typeof Prism == 'object' && typeof Prism.highlightElement == 'function') {
              let fn = Prism.highlightElement
              fn(codeElem);
            }
          }
          else if (xhr.status >= 400) {
            codeElem.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
          }
          else {
            codeElem.textContent = '✖ Error: File does not exist or is empty';
          }
        }
      };
      xhr.send(null);
    }
  }
  ngAfterContentInit() {
  }
}
