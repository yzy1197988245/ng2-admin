/**
 * Created by yzy on 2017/2/6.
 */

import {Component} from "@angular/core";
import {AdminService} from "../../admin.service";
@Component({
  template: require('./student.html'),
  styles: [require('./student.scss')]
})
export class StudentComponent {
  public constructor(
    private service: AdminService
  ) {

  }
}
