/**
 * Created by yzy on 2017/1/2.
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KyxtService} from "../../../kyxt.service";

import '../../../editor.loader';
import 'ckeditor'
import {isNullOrUndefined} from "util";
import {DataService} from "../../../../../app.data";
import {NotificationsService} from "angular2-notifications/dist";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TxxxInterestSelectorComponent} from "../../txxx/txxx-interest-selector/txxx-interest-selector.component";

@Component({
  selector: 'project-form',
  templateUrl: 'cjkt.html'
})
export class CjktComponent implements OnInit{

  @Input() projectId: number;
  @Output() projectChanged = new EventEmitter<any>();

  interests: Array<any> = [];
  selectedInterests: Array<any> = [];
  selectedTeachers: Array<any> = [];
  formGroup: FormGroup;

  projectDetail: any;

  editorConfig = {
    height: '400',
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationsService: NotificationsService,
    public dataService: DataService,
    private modalService: NgbModal
  ) {
    this.formGroup = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      memberCount: [2, Validators.required],
      projectSource: [0, Validators.required],
      projectProperty: [0, Validators.required]
    });
  }

  selectInterest(): void {
    this.modalService.open(TxxxInterestSelectorComponent);
  }

  selectTeacher(): void {

  }

  ngOnInit(): void {
    this.getTeacherProjectDetail();
  }

  getTeacherProjectDetail(): void {
    if (!isNullOrUndefined(this.projectId)) {
      this.service.getTeacherProjectDetail({
        projectId: this.projectId
      }).then(result => {
        if (result.code == 200) {
          this.projectDetail = result.data;
          this.resetForm();
        } else {
          this.notificationsService.error('错误', result.message);
        }
      })
    }
  }

  resetForm(): void {
    if (isNullOrUndefined(this.projectDetail)) {
      this.selectedTeachers = [];
      this.selectedInterests = [];
      this.formGroup.reset({
        title: '',
        description: '',
        memberCount: 2,
        projectSource: 0,
        projectProperty: 0
      })
    } else {
      this.selectedTeachers = this.projectDetail.teachers;
      this.selectedInterests = this.projectDetail.interests;
      this.formGroup.reset({
        title: this.projectDetail.title,
        description: this.projectDetail.description,
        memberCount: this.projectDetail.memberCount,
        projectSource: this.projectDetail.projectSource,
        projectProperty: this.projectDetail.projectProperty
      })
    }
  }

  commit(): void {
    let value = this.formGroup.value;
    if (value.memberCount < 2) {
      this.notificationsService.error('错误', '每组最少两人');
      return;
    }
    if (value.projectSource == 0) {
      this.notificationsService.error('错误', '请选择项目来源');
      return;
    }
    if (value.projectProperty == 0) {
      this.notificationsService.error('错误', '请选择项目性质');
      return;
    }
    let interests = [];
    for (let interest of this.selectedInterests) {
      interests.push(interest.id);
    }
    let teachers = [];
    for (let teacher of this.selectedTeachers) {
      teachers.push(teacher.id);
    }
    let params = {
      projectId: this.projectId,
      title: value.title,
      description: value.description.replace('\n', ''),
      interests: interests,
      teachers: teachers,
      memberCount: value.memberCount,
      projectSource: value.projectSource,
      projectProperty: value.projectProperty
    };
    if (this.formGroup.valid) {
      this.service.createOrUpdateProject(params)
        .then(result => {
          if (result.code == 200) {
            this.notificationsService.success('成功', result.message);
            this.projectChanged.emit('update');
          } else {
            this.notificationsService.error('失败', result.message);
          }
        });
    }
  }

  deleteProject(): void {
    if (!isNullOrUndefined(this.projectId)) {
      this.service.deleteProject({
        projectId: this.projectId
      }).then(result => {
        if (result.code == 200) {
          this.notificationsService.success('成功', result.message);
          this.projectChanged.emit('delete');
        } else {
          this.notificationsService.error('失败', result.message);
        }
      })
    }
  }
}
