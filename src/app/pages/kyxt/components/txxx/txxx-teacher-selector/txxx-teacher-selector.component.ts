/**
 * Created by yzy on 2017/3/20.
 */

import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
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
  maxSize = 0;

  paramsForm: FormGroup;

  constructor(
    public dataService: DataService,
    public commonService: KyxtService,
    public formBuilder: FormBuilder
  ) {

  }

  public ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      name: [''],
      professionalTitle: [0]
    });
    this.getTeacherList();
  }

  getTeacherList(): void {
    let data = {
      page: this.currentPage,
      name: this.paramsForm.value.name,
      professionalTitle: this.paramsForm.value.professionalTitle
    };
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

  teacherClicked(teacher: any): void {
    this.teacherSelected.emit(teacher);
  }
}
