/**
 * Created by yzy on 2017/3/20.
 */


import {Component, Input} from "@angular/core";
@Component({
  selector: 'student-table',
  templateUrl: './student-table.html'
})
export class StudentTableComponent {
  @Input() students: Array<any>;
}
