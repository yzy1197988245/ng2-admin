/**
 * Created by yzy on 2017/3/13.
 */


import {Component} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {NotificationsService} from "angular2-notifications";
import {DataService} from "../../../../app.data";
@Component({
  templateUrl: './teacher.html',
  styleUrls: ['./teacher.scss']
})
export class TeacherComponent {
  students: Array<any>;
  totalCount: number = 0;
  currentPage: number = 1;
  maxSize = 10;

  searchParamsForm: FormGroup;
  schoolId: AbstractControl;
  specialtyId: AbstractControl;
  grade: AbstractControl;
  classId: AbstractControl;

  constructor(
    private service: AdminService,
    private notificationsService: NotificationsService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.searchParamsForm = formBuilder.group({
      'studentNumber': [''],
      'name': [''],
      'schoolId': [0],
      'specialtyId': [0],
      'grade': [0],
      'classId': [0],
    });
    this.schoolId = this.searchParamsForm.controls['schoolId'];
    this.specialtyId = this.searchParamsForm.controls['specialtyId'];
    this.grade = this.searchParamsForm.controls['grade'];
    this.classId = this.searchParamsForm.controls['classId'];
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
    this.grade.setValue(0);
    this.classId.setValue(0);
  }

  specialtyChanged(): void {
    this.grade.setValue(0);
    this.classId.setValue(0);
  }

  gradeChanged(): void {
    this.classId.setValue(0);
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    // let params = this.searchParamsForm.value;
    // params.page = this.currentPage;
    // this.service.adminGetStudentListWithParams(params)
    //   .then(result => {
    //     this.students = result.data;
    //     this.totalCount = result.total;
    //   })
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
    // let params = {
    //   fileId: fileId
    // };
    // this.service.adminImportStudentFromFile(params)
    //   .then(result => {
    //     this.notificationsService.success('成功', result.message);
    //   })
  }

  adminCreateStudent(student: any): void {
    // this.service.adminCreateStudent(student)
    //   .then(result => {
    //     if (result.code == 200) {
    //       this.notificationsService.success('成功', result.message);
    //     } else {
    //       this.notificationsService.alert('失败', result.message);
    //     }
    //   })
  }
}
