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
  selectedProjectId: any;
  editorConfig = {height:400};
  isShowProjectForm = false;

  constructor(
    private service: KyxtService,

  ){

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

  createProject(): void {
    this.showProjectForm();
    this.selectedProjectId = null;
  }

  showProjectForm(): void {
    this.isShowProjectForm = true;
  }

  hideProjectForm(): void {
    this.isShowProjectForm = false;
  }

  selectProject(project: any): void {
    this.selectedProjectId = project.id;
    this.showProjectForm();
  }

}
