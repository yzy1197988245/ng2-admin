/**
 * Created by yzy on 2017/2/6.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
@Component({
  templateUrl: './student.html',
  styleUrls: ['./student.scss']
})
export class StudentComponent implements OnInit{

  students: Array<any>;
  totalCount: number = 0;
  currentPage: number = 1;

  constructor(
    private service: AdminService
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
}
