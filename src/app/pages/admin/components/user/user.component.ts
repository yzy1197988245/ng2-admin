/**
 * Created by yzy on 2017/1/9.
 */


import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {DataService} from "../../../../app.data";
import {NotificationsService} from "angular2-notifications";

@Component({
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit{

  users: Array<any>;

  totalCount = 0;
  currentPage = 1;
  maxSize = 10;

  searchParams: FormGroup;
  private specialtyId: AbstractControl;

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private notificationsServic: NotificationsService
  ){
    this.searchParams = formBuilder.group({
      userNumber: [null, Validators.required],
      name: [null, Validators.required],
      roleId: [0, Validators.required],
      schoolId: [0, Validators.required],
      specialtyId: [0, Validators.required],
    });
    this.specialtyId = this.searchParams.controls['specialtyId'];
  }

  public ngOnInit(): void {
    this.getUserList();
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  getUserList(): void {
    let params = this.searchParams.value;
    params.page = this.currentPage;
    this.service.adminGetUserListWithParams(params)
      .then(result => {
        this.users = result.data;
        this.totalCount = result.total;
      });
  }

  pageChanged(data: any): void {
    this.currentPage = data.page;
    this.getUserList();
  }

  createUser(user: any): void {
    this.service.adminCreateUser(user)
      .then(result => {
        if (result.code == 200) {
          this.notificationsServic.success('成功', '创建成功');
          this.getUserList();
        }
      });
  }
}
