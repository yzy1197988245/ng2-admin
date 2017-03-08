/**
 * Created by yzy on 2017/2/23.
 */

import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CommonService} from "../../common.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {isNullOrUndefined} from "util";
@Component({
  selector: 'student-selector',
  templateUrl: './student-selector.html',
  styleUrls: ['./student-selector.scss']
})
export class StudentSelectorComponent implements OnInit{

  @Output() studentsSelected = new EventEmitter<Array<any>>();

  paramsForm: FormGroup;

  studentList: Array<any>;
  currentPage: number = 1;
  totalCount: number = 0;

  selectedStudents: Array<any> = [];

  constructor(
    private service: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.paramsForm = formBuilder.group({
      studentNumber: [''],
      name: ['']
    });
  }

  public ngOnInit(): void {
    this.getStudentList();
  }

  public getStudentList(): void {
    let params = {
      page: this.currentPage,
      studentNumber: this.paramsForm.value.studentNumber,
      name: this.paramsForm.value.name
    };
    this.service.getStudentListWithParams(params)
      .then(result => {
        this.totalCount = result.total;
        this.studentList = result.data;
      })
  }

  isSelected(student: any): boolean {
    if (isNullOrUndefined(student))
      return false;
    for (let studentTemp of this.selectedStudents) {
      if (student.id == studentTemp.id)
        return true;
    }
    return false;
  }

  studentClicked(student: any): void {
    if (!this.isSelected(student)) {
      if (this.selectedStudents.length < 4) {
        this.selectedStudents.push(student);
      }
    } else {
      this.unSelectStudent(student);
    }
  }

  unSelectStudent(student: any): void {
    let index = this.selectedStudents.indexOf(student);
    this.selectedStudents.splice(index, 1);
  }

  commit(): void {
    this.studentsSelected.emit(this.selectedStudents);
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getStudentList();
  }
}
