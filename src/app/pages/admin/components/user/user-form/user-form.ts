/**
 * Created by yzy on 2017/3/15.
 */

import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {DataService} from "../../../../../app.data";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserForm {

  @Output() commit = new EventEmitter<any>();

  userForm: FormGroup;
  specialtyId: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.userForm = formBuilder.group({
      userNumber: [null, Validators.required],
      name: [null, Validators.required],
      roleId: [0, Validators.required],
      schoolId: [0, Validators.required],
      specialtyId: [0, Validators.required],
      password: ['123456']
    });
    this.specialtyId = this.userForm.controls['specialtyId'];
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  reset(): void {
    this.userForm.reset({
      userNumber: null,
      name: null,
      roleId: 0,
      schoolId: 0,
      specialtyId: 0,
      password: '123456'
    });
  }

  submit(): void {
    this.commit.emit(this.userForm.value);
  }

  canSubmit(): boolean {
    let value = this.userForm.value;
    return this.userForm.valid && value.roleId !=0;
  }
}
