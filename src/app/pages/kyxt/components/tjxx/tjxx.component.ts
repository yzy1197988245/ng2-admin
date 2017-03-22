/**
 * Created by yzy on 2017/2/28.
 */

import {Component, OnInit} from "@angular/core";
import {KyxtService} from "../../kyxt.service";
@Component({
  templateUrl: 'tjxx.html',
  styleUrls: ['tjxx.scss']
})
export class TjxxComponent implements OnInit{

  chartData: any;
  chartOptions = {
    fullWidth: true,
    height: '300px',
    showLabel: false,
    axisY: {
      onlyInteger: true
    }
  };

  studentDescriptions: Array<any>;

  totalCount = 0;
  currentPage = 1;
  maxSize = 10;

  constructor(
    private service: KyxtService
  ){}

  ngOnInit(): void {
    this.getChartData();
    this.getStudentDescriptionForTeacher();
  }

  getChartData(): void {
    this.service.getInterestDataForChart()
      .then(result => {
        this.chartData = result.data;
      });
  }

  getStudentDescriptionForTeacher(): void {
    this.service.getStudentDescriptionForTeacher()
      .then(result => {
        this.totalCount = result.total;
        this.studentDescriptions = result.data;
      });
  }

  pageChanged(data): void {
    this.currentPage = data.page;
    this.getStudentDescriptionForTeacher()
  }

}
