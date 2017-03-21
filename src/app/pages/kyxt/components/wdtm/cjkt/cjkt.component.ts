/**
 * Created by yzy on 2017/1/2.
 */

import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {KyxtService} from "../../../kyxt.service";

import '../../../editor.loader';
import 'ckeditor'
import {isNullOrUndefined} from "util";

@Component({
  selector: 'project-form',
  templateUrl: 'cjkt.html'
})
export class CjktComponent implements OnInit{

  _projectId: number;

  @Input() set projectId(projectId) {
    this._projectId = projectId;
    this.getTeacherProjectDetail();
  }

  interests: Array<any> = [];
  selectedInterests: Array<any> = [];
  formGroup: FormGroup;

  editorConfig = {
    height: '400',
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationsService: NotificationsService,
  ) {
    this.formGroup = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  getTeacherProjectDetail(): void {
    if (!isNullOrUndefined(this._projectId)) {
      this.service.getTeacherProjectDetail({
        projectId: this._projectId
      }).then(result => {
        if (result.code == 200) {
          let projectDetail = result.data;
          this.formGroup.setValue({
            title: projectDetail.title,
            description: projectDetail.description
          });
          this.selectedInterests = projectDetail.interests;
        } else {
          this.notificationsService.error('错误', result.message);
        }
      })
    }
  }

  commit(): void {
    let value = this.formGroup.value;
    let interests = [];
    for (let interest of this.selectedInterests) {
      interests.push(interest.id);
    }
    let params = {
      projectId: this._projectId,
      title: value.title,
      description: value.description.replace('\n', '<br>'),
      interests: interests
    };
    if (this.formGroup.valid) {
      this.service.createOrUpdateProject(params)
        .then(result => {
          if (result.code == 200) {
            this.notificationsService.success('成功', result.message);
          } else {
            this.notificationsService.error('失败', result.message);
          }
        });
    }
  }

  deleteProject(): void {
    if (!isNullOrUndefined(this._projectId)) {
      this.service.deleteProject({
        projectId: this._projectId
      }).then(result => {
        if (result.code == 200) {
          this.notificationsService.success('成功', result.message);
        } else {
          this.notificationsService.error('失败', result.message);
        }
      })
    }
  }
}
