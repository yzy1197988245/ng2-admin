/**
 * Created by yzy on 2017/1/1.
 */

import {Component, Input} from "@angular/core";
@Component({
  selector: 'content-top',
  templateUrl: './content-top.html',
  styleUrls: ['./content-top.scss']
})
export class ContentTopComponent {
  @Input()
  title: string = '';

  goBack(): void {

  }
}
