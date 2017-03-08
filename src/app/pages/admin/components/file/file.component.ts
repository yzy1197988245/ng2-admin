/**
 * Created by yzy on 2017/2/7.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  template: require('./file.component.html'),
  styles: [require('./file.component.scss')]
})
export class FileComponent implements OnInit{

  files: Array<any>;

  constructor(
    private service: AdminService
  ){}

  ngOnInit(): void {
    this.getFileList();
  }

  getFileList(): void {
    this.service.getFileList()
      .then(result => {
        this.files = result;
      })
  }

  uploadFile(files: Array<any>): void {
    let data = new FormData();
    for (let file of files) {
      data.append(file.name, file);
    }
    this.service.uploadFile(data)
      .then(result => {
        console.log(result);
      })
  }
}
