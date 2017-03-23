/**
 * Created by yzy on 2017/3/23.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";

@Component({
  templateUrl: './zntmgl.html',
  styleUrls: ['./zntmgl.scss']
})
export class ZntmglComponent implements OnInit{

  projects: Array<any>;

  constructor(
    private service: KyxtService
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
}
