import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';
import {AuthService} from "../../app.auth-service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public userNumber:AbstractControl;
  public password:AbstractControl;
  public userType:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      'userNumber': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'userType': [1, Validators.compose([Validators.required])]
    });

    this.userNumber = this.form.controls['userNumber'];
    this.password = this.form.controls['password'];
    this.userType = this.form.controls['userType'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      this.authService.login(this.form.value);
    }
  }
}
