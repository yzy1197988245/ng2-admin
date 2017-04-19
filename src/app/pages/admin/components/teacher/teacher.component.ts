/**
 * Created by yzy on 2017/3/13.
 */


import {Component} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {DataService} from "../../../../app.data";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  templateUrl: './teacher.html',
  styleUrls: ['./teacher.scss']
})
export class TeacherComponent {
  teachers: Array<any>;
  totalCount: number = 0;
  currentPage: number = 1;
  maxSize = 10;

  searchParamsForm: FormGroup;
  schoolId: AbstractControl;
  specialtyId: AbstractControl;

  constructor(
    private service: AdminService,
    private notificationsService: NotificationsService,
    public dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.searchParamsForm = formBuilder.group({
      'teacherNumber': [''],
      'name': [''],
      'schoolId': [0],
      'specialtyId': [0],
      'professionalTitleId': [0]
    });
    this.schoolId = this.searchParamsForm.controls['schoolId'];
    this.specialtyId = this.searchParamsForm.controls['specialtyId'];
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  ngOnInit(): void {
    this.getTeacherList();
  }

  getTeacherList(): void {
    let params = this.searchParamsForm.value;
    params.page = this.currentPage;
    this.service.adminGetTeacherListWithParams(params)
      .then(result => {
        this.teachers = result.data;
        this.totalCount = result.total;
      });
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getTeacherList();
  }

  uploadFile(files: Array<any>): void {
    let data = new FormData();
    for (let file of files) {
      data.append(file.name, file);
    }
    this.service.uploadFile(data)
      .then(result => {
        if (result.code == 200) {
          this.adminImportTeacherFromFile(result.data[0]);
        }
      });
  }

  adminImportTeacherFromFile(fileId: number): void {
    let params = {
      fileId: fileId
    };
    this.service.adminImportTeacherFromFile(params)
      .then(result => {
        this.notificationsService.success('成功', result.message);
      });
  }

  adminCreateTeacher(teacher: any): void {
    this.service.adminCreateTeacher(teacher)
      .then(result => {
        if (result.code == 200) {
          this.notificationsService.success('成功', result.message);
        } else {
          this.notificationsService.alert('失败', result.message);
        }
      });
  }
}
