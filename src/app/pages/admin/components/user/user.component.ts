/**
 * Created by yzy on 2017/1/9.
 */


import {Component, OnInit, ViewChild} from "@angular/core";
import {AdminService} from "../../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from "ng2-bootstrap";
@Component({
  template: require('./user.html'),
  styles: [require('./user.scss')]
})
export class UserComponent implements OnInit{

  users: Array<any>;
  selectedUser: any;
  newUserForm: FormGroup;

  roleList: Array<any>;

  @ViewChild('addRoleModal') public addRoleModal: ModalDirective;

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder
  ){}

  public ngOnInit(): void {
    this.getUserList();
    this.buildNewUserForm();
  }

  private buildNewUserForm(): void {
    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  getUserList(): void {
    this.service.getUserList()
      .then(result => this.users = result);
  }

  createUser(): void {
    if (this.newUserForm.valid) {
      this.service.createUser(this.newUserForm.value)
        .then(result => {
          console.log(result);
          this.newUserForm.reset();
          this.getUserList();
        });
    }
  }

  deleteUser(user: any): void {
    this.service.deleteUser(user)
      .then(result => {
        console.log(result);
        this.getUserList();
      })
  }

  editUser(user: any): void {
    this.selectedUser = user;
  }

  addRole(user: any): void {
    this.selectedUser = user;
    this.getRoleListWithUserId(user.id);
    this.addRoleModal.show();
  }

  getRoleListWithUserId(userId: any): void {
    let data = {
      userId: userId
    };
    this.service.getRoleListWithUser(data)
      .then(result => {
        this.roleList = result;
      });
  }

  updateUserRole(role: any): void {
    let data = {
      roleId: role.id,
      userId: this.selectedUser.id
    };
    if (role.enable) {
      this.service.deleteUserRole(data)
        .then(result => {
          role.enable = false;
        })
    } else {
      this.service.addRoleToUser(data)
        .then(result => {
          role.enable = true;
        })
    }
  }
}
