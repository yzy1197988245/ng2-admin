/**
 * Created by yzy on 2017/1/1.
 */

import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KyxtService} from "../../kyxt.service";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications";

window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.0/standard/';

@Component({
  templateUrl: 'zntm.html'
})
export class ZntmComponent implements OnInit{

  selectedTeacher: any;
  selectedStudents: Array<any> = [];
  fileId: any;

  formGroup: FormGroup;
  editorConfig = {
    height: '400'
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationsService: NotificationsService
  ){

  }

  public ngOnInit(): void {
    this.buildForm();
    this.service.getStudentCreateProjectBaseInfo()
      .then(result => {
        let formValue = {
          title: result.data.title,
          description: result.data.description
        };
        this.formGroup.setValue(formValue);
        this.selectedTeacher = result.data.instructor;
        this.selectedStudents = result.data.members;
      })
  }

  public buildForm(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  canCommit(): boolean {
      return this.formGroup.valid && !isNullOrUndefined(this.selectedTeacher) && this.selectedStudents.length == 4;
  }

  public commit(): void {
    if (this.canCommit()) {
      let value = this.formGroup.value;
      let members = [];
      for (let student of this.selectedStudents) {
        members.push(student.id);
      }
      let data = {
        title: value.title,
        instructor: this.selectedTeacher.id,
        description: value.description.replace('\n', '<br>'),
        members: members
      };
      this.service.studentCreateProject(data)
        .then(result => {
          console.log(result);
          if (result.code == 100) {
            this.notificationsService.error('错误', result.message);
          } else {
            this.notificationsService.success('成功', result.message);
          }
        })
    }
  }

  teacherSelected(teacher: any): void {
    this.selectedTeacher = teacher;
  }

  studentsSelected(students: Array<any>): void {
    this.selectedStudents = students;
  }
}
