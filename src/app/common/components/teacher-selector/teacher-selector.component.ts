/**
 * Created by yzy on 2017/2/23.
 */

import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {CommonService} from "../../common.service";
import 'rxjs/add/operator/toPromise';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'teacher-selector',
  templateUrl: './teacher-selector.html',
  styleUrls: ['./teacher-selector.scss']
})
export class TeacherSelectorComponent implements OnInit{

  @Output() teacherSelected = new EventEmitter<any>();

  teachers: Array<any>;
  professionalTitles: Array<any>;

  teacherTotalCount: number = 0;
  currentPage: number = 1;

  paramsForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {

  }

  public ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      name: [''],
      professionalTitle: [0]
    });
    this.getProfessionTitleList();
    this.getTeacherList();
  }

  getProfessionTitleList(): void {
    this.commonService.getTeacherProfessionTitle()
      .then(result => {
        this.professionalTitles = result;
      })
  }

  getTeacherList(): void {
    let data = {
      page: this.currentPage,
      name: this.paramsForm.value.name,
      professionalTitle: this.paramsForm.value.professionalTitle
    };
    this.commonService.getTeacherListWithParams(data)
      .then(result => {
        this.teachers = result.data;
        this.teacherTotalCount = result.total;
      })
  }

  pageChanged(data): void {
    this.currentPage = data.page;
    this.getTeacherList()
  }

  teacherClicked(teacher: any): void {
    this.teacherSelected.emit(teacher);
  }
}
