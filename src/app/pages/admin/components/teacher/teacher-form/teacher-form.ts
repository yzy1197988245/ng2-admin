/**
 * Created by yzy on 2017/3/15.
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../../../../../app.data";

@Component({
  selector: 'teacher-form',
  templateUrl: './teacher-form.html',
  styleUrls: ['./teacher-form.scss']
})
export class TeacherForm {

  @Input() teacherId: number;
  @Output() commit = new EventEmitter<any>();

  private teacherForm: FormGroup;

  private specialtyId: AbstractControl;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.teacherForm = formBuilder.group({
      'teacherNumber': ['', Validators.required],
      'name': ['', Validators.required],
      'sexId': [0, Validators.required],
      'schoolId': [0, Validators.required],
      'specialtyId': [0, Validators.required],
      'professionalTitleId': [0, Validators.required],
      'phone': [null],
      'email': [null],
      'remarks': [null],
      'available': [1]
    });
    this.specialtyId = this.teacherForm.controls['specialtyId'];
  }

  submit(): void {
    this.commit.emit(this.teacherForm.value);
    this.reset();
  }

  reset(): void {
    this.teacherForm.reset({
      'teacherNumber': '',
      'name': '',
      'sexId': 0,
      'schoolId': 0,
      'specialtyId': 0,
      'professionalTitleId': 0,
      'phone': null,
      'email': null,
      'remarks': null,
      'available': 1
    });
  }

  canSubmit(): boolean {
    let value = this.teacherForm.value;
    return this.teacherForm.valid;
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }
}
