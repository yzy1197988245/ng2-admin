/**
 * Created by yzy on 2017/1/2.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {NotificationsService} from "angular2-notifications";
import {isNullOrUndefined} from "util";
import {DataService} from "../../../../app.data";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
@Component({
  templateUrl: 'xsxt.html',
  styleUrls: ['xsxt.scss']
})
export class XsxtComponent implements OnInit{

  projects: Array<any>;
  selectedProject: any;
  selectedProjects: Array<any> = [];
  projectDetail: any = {};

  isShowProjectDetail = false;

  totalCount = 0;
  currentPage = 1;
  maxSize = 10;

  paramsForm: FormGroup;
  specialtyId: AbstractControl;

  constructor(
    private service: KyxtService,
    private notificationsService: NotificationsService,
    public dataService: DataService,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      schoolId: [0],
      specialtyId: [0],
    });
    this.specialtyId = this.paramsForm.controls['specialtyId'];
    this.getProjectList();
    this.getSelectedProjects();
  }

  getProjectList(): void {
    this.service.getStudentProjectList()
      .then(result => {
        this.projects = result;
        this.projects.sort((a, b) => {
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
        this.showProjectDetail();
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

  pageChanged(data): void {
    this.currentPage = data.page;
    this.getProjectList();
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  showProjectDetail(): void {
    this.isShowProjectDetail = true;
  }

  hideProjectDetail(): void {
    this.isShowProjectDetail = false;
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
