/**
 * Created by yzy on 2017/2/21.
 */

import {Component, AfterContentInit} from "@angular/core";
import {AdminService} from "../admin.service";
@Component({
  templateUrl: 'admin.html',
  styleUrls: ['admin.scss']
})
export class AdminComponent implements AfterContentInit{

    projects: Array<any>;
    students: Array<any>;

    constructor(
        private service: AdminService
    ){}

    ngAfterContentInit(): void {
        this.getAdminProjectList();
        this.getStudentListWithoutSelectedProject();
    }

    getAdminProjectList(): void {
        this.service.getAdminProjectList()
            .then(result => {

            });
    }

    projectAutomaticDistribution(): void {
        this.service.projectAutomaticDistribution()
            .then(resule => {

            });
    }

    getStudentListWithoutSelectedProject(): void {
        this.service.getStudentListWithoutSelectedProject()
            .then(result => {

            })
    }
}
