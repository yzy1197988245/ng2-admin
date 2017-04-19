/**
 * Created by yzy on 2017/2/7.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {Config} from "../../../../app.config";
import {NotificationsService} from "angular2-notifications/dist";
@Component({
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit{

  files: Array<any>;

  totalCount = 0;
  currentPage = 1;
  maxSize = 10;

  downloadSource: string;

  constructor(
    private service: AdminService,
    private notificationsService: NotificationsService
  ){
    this.downloadSource = Config.SERVER_BASE_URL + 'file/download';
  }

  ngOnInit(): void {
    this.getFileList();
  }

  getFileList(): void {
    let params = {
      page: this.currentPage
    };
    this.service.adminGetFileList(params)
      .then(result => {
        this.files = result.data;
      })
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getFileList();
  }

  uploadFile(files: Array<any>): void {
    let data = new FormData();
    for (let file of files) {
      data.append(file.name, file);
    }
    this.service.uploadFile(data)
      .then(result => {
        if (result.code == 200)
          this.notificationsService.success('成功', result.message);
        this.getFileList();
      })
  }

  downloadFile(form: any, file: any) {
    form.action = this.downloadSource + '?fileId=' + file.id;
    form.submit();
  }
}
