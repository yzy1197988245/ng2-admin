/**
 * Created by yzy on 2017/3/23.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './zntmgl.html',
  styleUrls: ['./zntmgl.scss']
})
export class ZntmglComponent implements OnInit{

  projects: Array<any>;

  constructor(
    private service: KyxtService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getZNProjectList();
  }

  getZNProjectList(): void {
    this.service.getZNProjectList()
      .then(result => {
        this.projects = result.data;
      });
  }

  projectClicked(project): void {
    this.router.navigate(['pages', 'kyxt', 'zntm', {projectId: project.id}]);
  }

  createProject(): void {
    this.router.navigate(['pages', 'kyxt', 'zntm']);
  }
}
