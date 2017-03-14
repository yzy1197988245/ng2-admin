/**
 * Created by yzy on 2017/2/6.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {NotificationsService} from "angular2-notifications";
import {DataService} from "../../../../app.data";
@Component({
  templateUrl: './student.html',
  styleUrls: ['./student.scss']
})
export class StudentComponent implements OnInit{

  students: Array<any>;
  totalCount: number = 0;
  currentPage: number = 1;
  maxSize = 10;

  constructor(
    private service: AdminService,
    private notificationsService: NotificationsService,
    private dataService: DataService
  ) {

  }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    let params = {
      page: this.currentPage
    };
    this.service.adminGetStudentListWithParams(params)
      .then(result => {
        this.students = result.data;
        this.totalCount = result.total;
      })
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getStudentList();
  }

  uploadFile(files: Array<any>): void {
    let data = new FormData();
    for (let file of files) {
      data.append(file.name, file);
    }
    this.service.uploadFile(data)
      .then(result => {
        if (result.code == 200) {
          this.adminImportStudentFromFile(result.data[0]);
        }
      })
  }

  adminImportStudentFromFile(fileId: number): void {
    let params = {
      fileId: fileId
    };
    this.service.adminImportStudentFromFile(params)
      .then(result => {
        this.notificationsService.success('成功', result.message);
      })
  }

  adminCreateStudent(student: any): void {
    this.service.adminCreateStudent(student)
      .then(result => {
        if (result.code == 200) {
          this.notificationsService.success('成功', result.message);
        } else {
          this.notificationsService.alert('失败', result.message);
        }
      })
  }
}
