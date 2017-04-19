/**
 * Created by yzy on 2017/1/1.
 */

import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KyxtService} from "../../kyxt.service";
import {isNullOrUndefined} from "util";

import '../../editor.loader';
import 'ckeditor';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../../app.data";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  templateUrl: 'zntm.html'
})
export class ZntmComponent implements OnInit{

  selectedTeachers: Array<any> = [];
  selectedStudents: Array<any> = [];
  projectId;

  formGroup: FormGroup;
  editorConfig = {
    height: '400'
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationsService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService
  ){
    this.projectId = activatedRoute.snapshot.params['projectId'];
  }

  public ngOnInit(): void {
    this.buildForm();
    this.getProject();
  }

  public getProject(): void {
    if (!isNullOrUndefined(this.projectId)) {
      this.service.getStudentCreateProjectBaseInfo({projectId:this.projectId})
      .then(result => {
        if (result.code == 200) {
          let data = result.data;
          this.formGroup.reset({
            title: data.title,
            description: data.description,
            projectSource: data.projectSource,
            projectProperty: data.projectProperty
          });
          this.selectedTeachers = data.teachers;
          this.selectedStudents = data.students;
        } else {
          this.notificationsService.error('错误', result.message);
        }
      })
    }
  }

  public buildForm(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectSource: [0, Validators.required],
      projectProperty: [0, Validators.required]
    })
  }

  public commit(): void {
    let value = this.formGroup.value;
    if (value.title == '') {
      this.notificationsService.error('错误', '请输入标题');
      return;
    }
    if (value.projectSource == 0) {
      this.notificationsService.error('错误', '请选择课题来源');
      return;
    }
    if (value.projectProperty == 0) {
      this.notificationsService.error('错误', '请选择课题性质');
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
      projectId: this.projectId,
      title: value.title,
      instructor: instructor.id,
      description: value.description.replace('\n', ''),
      members: members,
      teachers: teachers,
      projectSource: value.projectSource,
      projectProperty: value.projectProperty
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

  back(): void {
      this.router.navigate(['pages', 'kyxt', 'zntmgl']);
  }
}
