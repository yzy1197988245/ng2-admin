/**
 * Created by yzy on 2017/1/1.
 */

import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KyxtService} from "../../kyxt.service";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications";

import '../../editor.loader';
import 'ckeditor';

@Component({
  templateUrl: 'zntm.html'
})
export class ZntmComponent implements OnInit{

  selectedTeachers: Array<any> = [];
  selectedStudents: Array<any> = [];

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
  }

  public buildForm(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  public commit(): void {
    let value = this.formGroup.value;
    if (value.title == '') {
      this.notificationsService.error('错误', '请输入标题');
      return;
    }
    if (this.selectedTeachers.length < 1) {
      this.notificationsService.error('错误', '请选择指导老师');
      return;
    }
    if (this.selectedStudents.length < 2) {
      this.notificationsService.error('错误', '组员至少为两个人');
      return;
    }
    let members = [];
    for (let student of this.selectedStudents) {
      members.push(student.id);
    }

    let instructor = this.selectedTeachers[0];
    let teachers = [];
    for (let i = 1; i < this.selectedTeachers.length; i++) {
      teachers.push(this.selectedTeachers[i].id);
    }
    this.notificationsService.info('第一指导老师为', instructor.name);
    let data = {
      title: value.title,
      instructor: instructor.id,
      description: value.description.replace('\n', ''),
      members: members,
      teachers: teachers
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
