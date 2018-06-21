import {NgModule} from '@angular/core';
import {NullReplacePipe} from '../../pipes/nullReplace/nullReplace.pipe';
@NgModule({
  imports:[
  ],
  declarations: [
    NullReplacePipe
  ],
  providers: [],
  exports: [
    NullReplacePipe
  ]
})
export class NullReplaceModule {
}
