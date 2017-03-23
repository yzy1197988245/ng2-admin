/**
 * Created by yzy on 2017/3/22.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
import {DataService} from "../../../../app.data";
@Component({
  templateUrl: './xtjc.html',
  styleUrls: ['./xtjc.scss']
})
export class XtjcComponent implements OnInit{
  projects: Array<any>;

  constructor(
    private service: KyxtService,
    public dataService: DataService
  ){}

  ngOnInit(): void {
      this.getProjectListForJM();
  }

  getProjectListForJM(): void {
      this.service.getProjectListForJM()
        .then(result => {
          this.projects = result.data;
        });
  }
}
