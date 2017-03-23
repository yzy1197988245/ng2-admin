/**
 * Created by yzy on 2017/2/23.
 */

import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {CommonService} from "../../common.service";
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {DataService} from "../../../app.data";
@Component({
  selector: 'student-selector',
  templateUrl: './student-selector.html',
  styleUrls: ['./student-selector.scss']
})
export class StudentSelectorComponent implements OnInit{

  paramsForm: FormGroup;
  specialtyId: AbstractControl;

  studentList: Array<any>;

  currentPage: number = 1;
  totalCount: number = 0;
  maxSize = 8;

  @Input() @Output() selectedStudents: Array<any> = [];

  constructor(
    private service: CommonService,
    private formBuilder: FormBuilder,
    public dataService: DataService
  ) {
    this.paramsForm = formBuilder.group({
      studentNumber: [''],
      name: [''],
      schoolId: ['0'],
      specialtyId: ['0']
    });
    this.specialtyId = this.paramsForm.controls['specialtyId'];
  }

  public ngOnInit(): void {
    this.getStudentList();
  }

  public getStudentList(): void {
    let params = this.paramsForm.value;
    params.page = this.currentPage;
    this.service.getStudentListWithParams(params)
      .then(result => {
        this.totalCount = result.total;
        this.studentList = result.data;
      })
  }

  isSelected(student: any): number {
    if (isNullOrUndefined(student))
      return -1;
    for (let i = 0; i < this.selectedStudents.length; i++) {
      if (this.selectedStudents[i].id == student.id)
        return i;
    }
    return -1;
  }

  studentClicked(student: any): void {
    let index = this.isSelected(student);
    if (index == -1) {
      this.selectedStudents.push(student);
    } else {
      this.unSelectStudent(student);
    }
  }

  unSelectStudent(student: any): void {
    let index = this.isSelected(student);
    this.selectedStudents.splice(index, 1);
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getStudentList();
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }
}
