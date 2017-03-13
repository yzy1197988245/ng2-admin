/**
 * Created by yzy on 2017/2/6.
 */

import {Component} from "@angular/core";
import {AdminService} from "../../admin.service";
@Component({
  templateUrl: './student.html',
  styleUrls: ['./student.scss']
})
export class StudentComponent {

  students: Array<any>;

  public constructor(
    private service: AdminService
  ) {

  }
}
