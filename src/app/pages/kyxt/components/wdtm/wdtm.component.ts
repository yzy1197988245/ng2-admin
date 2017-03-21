/**
 * Created by yzy on 2017/1/1.
 */

import {Component, AfterViewInit, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {isNullOrUndefined} from "util";
@Component({
  templateUrl: 'wdtm.html',
  styleUrls: ['wdtm.scss'],
})
export class WdtmComponent implements OnInit{

  projects: Array<any> = [];
  projectDetail: any;
  selectedProject: any;

  projectForm: FormGroup;
  editorConfig = {height:400};

  selectedInterests: Array<any> = [];

  constructor(
    private service: KyxtService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService
  ){
    this.projectForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeacherProjectList();
  }

  getTeacherProjectList(): void {
    this.service.getTeacherProjectList()
      .then(result => {
        if (result.code == 200)
          this.projects = result.data;
      })
  }

  getTeacherProjectDetail(): void {
      if (!isNullOrUndefined(this.selectedProject)) {
        this.service.getTeacherProjectDetail({
          projectId: this.selectedProject.id
        }).then(result => {
          if (result.code == 200) {
            this.projectDetail = result.data;
            this.projectForm.setValue({
              title: this.projectDetail.title,
              description: this.projectDetail.description
            });
            this.selectedInterests = this.projectDetail.interests;
          } else {
            this.notificationsService.error('错误', result.message);
          }
        })
      }
  }

  selectProject(project: any): void {
    this.selectedProject = project;
    this.getTeacherProjectDetail();
  }

  isSelected(project: any): boolean {
    if (isNullOrUndefined(this.selectedProject))
      return false;
    return this.selectedProject.id == project.id;
  }

  commit(): void {
    let value = this.projectForm.value;
    let interests = [];
    for (let interest of this.selectedInterests) {
      interests.push(interest.id);
    }
    let params = {
      projectId: this.selectedProject.id,
      title: value.title,
      description: value.description.replace('\n', '<br>'),
      interests: interests
    };
    if (this.projectForm.valid) {
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
    if (!isNullOrUndefined(this.selectedProject)) {
      this.service.deleteProject({
        projectId: this.selectedProject.id
      }).then(result => {
        if (result.code == 200) {
          this.selectedProject = null;
          this.projectDetail = null;
          this.getTeacherProjectList();
          this.notificationsService.success('成功', result.message);
        } else {
          this.notificationsService.error('失败', result.message);
        }
      })
    }
  }
}
