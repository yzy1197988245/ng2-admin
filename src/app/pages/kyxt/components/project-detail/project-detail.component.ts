/**
 * Created by yzy on 2017/3/21.
 */

import {Component, Input} from "@angular/core";

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.scss']
})
export class ProjectDetailComponent {
  @Input() project: any;
}
