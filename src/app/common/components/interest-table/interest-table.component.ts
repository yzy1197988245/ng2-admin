/**
 * Created by yzy on 2017/3/20.
 */

import {Component, Input} from "@angular/core";
@Component({
  selector: 'interest-table',
  templateUrl: './interest-table.html'
})
export class InterestTableComponent {
  @Input() interests: Array<any>;
}
