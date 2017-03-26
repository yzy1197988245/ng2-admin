/**
 * Created by yzy on 2017/3/26.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  templateUrl: './xtxs.html',
  styleUrls: ['./xtxs.scss']
})
export class XtxsComponent implements OnInit{

  projects: Array<any>;

  currentStudent: any;
  currentProject: any;

  @ViewChild('studentDetailModal') studentDetailModal:ModalDirective;

  constructor(
    private service: KyxtService
  ) {

  }

  ngOnInit(): void {
    this.getProjectListWithStudents();
  }

  getProjectListWithStudents(): void {
    this.service.getProjectListWithStudents()
      .then(result => {
        if (result.code == 200) {
          this.projects = result.data;
        }
      });
  }

  operateProjectStudent(project: any, student: any): void {
    this.currentProject = project;
    this.currentStudent = student;
    this.studentDetailModal.show();
  }

  acceptStudent(): void {
    let params = {
      projectId: this.currentProject.id,
      studentId: this.currentStudent.id,
      refused: 0
    }
  }

  refuseStudent(): void {
    let params = {
      projectId: this.currentProject.id,
      studentId: this.currentStudent.id,
      refused: 1
    }
  }
}
