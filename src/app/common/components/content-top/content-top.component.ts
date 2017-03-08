/**
 * Created by yzy on 2017/1/1.
 */

import {Component, Input} from "@angular/core";
@Component({
  selector: 'content-top',
  template: require('./content-top.html'),
  styles: [require('./content-top.scss')]
})
export class ContentTopComponent {
  @Input()
  title: string = '';

  goBack(): void {

  }
}
