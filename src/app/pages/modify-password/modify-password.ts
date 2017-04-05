/**
 * Created by yzy on 2017/4/5.
 */

import {Component, OnInit} from "@angular/core";
import {PagesService} from "../pages.service";
import {NotificationsService} from "angular2-notifications";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../app.auth-service";
@Component({
  templateUrl: './modify-password.html'
})
export class ModifyPasswordComponent implements OnInit{

  passwordFormGroup: FormGroup;
  oldPassword: AbstractControl;
  newPassword1: AbstractControl;
  newPassword2: AbstractControl;

  constructor(
    private service: PagesService,
    private notificationsService: NotificationsService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.passwordFormGroup = formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword1: ['', Validators.required],
      newPassword2: ['', Validators.required]
    });
    this.oldPassword = this.passwordFormGroup.controls['oldPassword'];
    this.newPassword1 = this.passwordFormGroup.controls['newPassword1'];
    this.newPassword2 = this.passwordFormGroup.controls['newPassword2'];
  }

  ngOnInit(): void {

  }

  commit(): void {
    if (!this.newPasswordRight()) {
      this.notificationsService.error('错误', '两次密码输入不一致');
      return;
    }
    let params = {
      'old': this.oldPassword.value,
      'new': this.newPassword1.value
    };
    this.service.userModifyPassword(params)
      .then(result => {
        if (result.code == 200) {
          this.notificationsService.success('成功', '修改成功');
          this.authService.logout();
        } else {
          this.notificationsService.error('错误', result.message);
        }
      });
  }

  newPasswordRight(): boolean {
    return this.newPassword1.valid && this.newPassword2.valid && this.newPassword1.value == this.newPassword2.value;
  }
}
