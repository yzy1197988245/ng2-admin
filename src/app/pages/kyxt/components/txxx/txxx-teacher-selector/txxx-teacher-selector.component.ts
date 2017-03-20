/**
 * Created by yzy on 2017/3/20.
 */

import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {KyxtService} from "../../../kyxt.service";
import {DataService} from "../../../../../app.data";

@Component({
  selector: 'txxx-teacher-selector',
  templateUrl: './txxx-teacher-selector.html',
  styleUrls: ['./txxx-teacher-selector.scss']
})
export class TxxxTeacherSelectorComponent {
  @Output() teacherSelected = new EventEmitter<any>();

  teachers: Array<any>;
  professionalTitles: Array<any>;

  teacherTotalCount = 0;
  currentPage = 1;
  maxSize = 10;

  paramsForm: FormGroup;
  specialtyId: AbstractControl;

  constructor(
    public dataService: DataService,
    public commonService: KyxtService,
    public formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      name: '',
      schoolId: [0],
      specialtyId: [0],
      professionalTitleId: [0],
    });
    this.specialtyId = this.paramsForm.controls['specialtyId'];
    this.getTeacherList();
  }

  getTeacherList(): void {
    let data = this.paramsForm.value;
    data.page = this.currentPage;
    this.commonService.getTxxxTeachersWithParams(data)
      .then(result => {
        this.teachers = result.data;
        this.teacherTotalCount = result.total;
      })
  }

  pageChanged(data): void {
    this.currentPage = data.page;
    this.getTeacherList()
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  teacherClicked(teacher: any): void {
    this.teacherSelected.emit(teacher);
  }
}
