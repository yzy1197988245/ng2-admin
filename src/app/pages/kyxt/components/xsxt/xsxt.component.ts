/**
 * Created by yzy on 2017/1/2.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {NotificationsService} from "angular2-notifications";
import {isNullOrUndefined} from "util";
@Component({
  templateUrl: 'xsxt.html',
  styleUrls: ['xsxt.scss']
})
export class XsxtComponent implements OnInit{

  projectList: Array<any>;
  selectedProject: any;
  selectedProjects: Array<any> = [];
  projectDetail: any = {};

  constructor(
    private service: KyxtService,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.getProjectList();
    this.getSelectedProjects();
  }

  getProjectList(): void {
    this.service.getStudentProjectList()
      .then(result => {
        this.projectList = result;
        this.projectList.sort((a, b) => {
          return a.selected_count - b.selected_count;
        })
      });
  }

  getProjectDetail(): void {
    if (!isNullOrUndefined(this.selectedProject)) {
      this.service.getProjectDetail({
        projectId: this.selectedProject.id
      }).then(result => {
        this.projectDetail = result.data;
      })
    }
  }

  getSelectedProjects(): void {
    this.service.getStudentSelectedProjects()
      .then(result => {
        this.selectedProjects = result;
        this.selectedProjects.sort((a, b) => {
          return a.order - b.order;
        })
      })
  }

  selectProject(project: any): void {
    this.selectedProject = project;
    this.getProjectDetail();
  }

  isSelected(project: any): boolean {
    if (this.selectedProject != null)
      return project.id == this.selectedProject.id;
    else
      return false;
  }

  isSelected2(project: any): boolean {
    for (let project2 of this.selectedProjects) {
      if (project.id == project2.id)
        return true;
    }
    return false;
  }

  studentSelectProject(order: number): void {
    if (this.selectedProject != null) {
      let data = {
        projectId: this.selectedProject.id,
        order: order
      };
      this.service.studentSelectProject(data)
        .then(result => {
          if (result.code == 200) {
            this.notificationsService.success('成功', result.message);
            this.getSelectedProjects();
          } else {
            this.notificationsService.error('失败', result.message);
          }
        })
    }
  }

  studentDeselectProject(): void {
    if (this.selectedProject != null) {
      let data = {
        projectId: this.selectedProject.id
      };
      this.service.studentDeselectProject(data)
        .then(result => {
          if (result.code == 200) {
            this.notificationsService.success('成功', result.message);
            this.getSelectedProjects();
          } else {
            this.notificationsService.error('失败', result.message);
          }
        })
    }

  }
}
