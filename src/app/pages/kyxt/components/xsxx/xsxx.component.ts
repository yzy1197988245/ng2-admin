/**
 * Created by yzy on 2017/1/7.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications";
@Component({
  templateUrl: 'xsxx.html',
  styleUrls: ['xsxx.scss']
})
export class XsxxComponent implements OnInit{
  studentList: Array<any>;
  selectedStudent: any;
  secondStudent: any;
  studentDetail: any;

  public constructor(
    private service: KyxtService,
    private notificationsService: NotificationsService
  ) {

  }

  public ngOnInit(): void {
    this.getStudentList();
  }

  public getStudentList(): void {
    this.service.getStudentWithOrder()
      .then(result => {
        this.studentList = result;
      });
  }

  public getStudentDetail(): void {
    if (!isNullOrUndefined(this.selectedStudent)) {
      this.service.getStudentDetail(this.selectedStudent)
        .then(result => {
          this.studentDetail = result;
        })
    }
  }

  public selectStudent(student: any): void {
    this.selectedStudent = student;
    this.getStudentDetail();
  }

  public selectStudent2(student: any): void {
    this.secondStudent = student;
  }

  public isSelected(student: any): boolean {
    if (this.selectedStudent != null) {
      return this.selectedStudent.id == student.id;
    }
    return false;
  }

  public isSelected2(student: any): boolean {
    if (this.secondStudent != null) {
      return this.secondStudent.id == student.id;
    }
    return false;
  }

  public reorderStudentList(first: boolean = false): void {
    if (first) {
      this.selectedStudent.order = this.studentList[0].order / 2;
      this.studentList.sort(function (a, b) {
        return a.order - b.order;
      });
      return;
    }
    if (this.secondStudent != null) {
      let index = 0;
      for (let i = 0; i < this.studentList.length; i++) {
        if (this.studentList[i].order == this.secondStudent.order) {
          index = i;
          break;
        }
      }
      if (index == this.studentList.length - 1) {
        this.selectedStudent.order = this.secondStudent.order + 1;
      } else {
        this.selectedStudent.order = (this.secondStudent.order + this.studentList[index + 1].order) / 2
      }
      this.studentList.sort(function (a, b) {
        return a.order - b.order;
      });
    }
    this.secondStudent = null;
  }

  public commitOrder() {
    let data = [];
    for (let i = 0; i < this.studentList.length; i++) {
      data[i] = this.studentList[i].id;
    }
    this.service.updateStudentOrder(data)
      .then(result => {
        this.notificationsService.success('成功', '提交成功!');
      })
  }
}
