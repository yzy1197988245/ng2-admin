/**
 * Created by yzy on 2017/1/9.
 */


import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../app.data";
import {NotificationsService} from "angular2-notifications";

@Component({
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit{

  users: Array<any>;

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private notificationsServic: NotificationsService
  ){

  }

  public ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.service.adminGetUserListWithParams()
      .then(result => {
        this.users = result.data;
      });
  }

  createUser(): void {

  }
}
