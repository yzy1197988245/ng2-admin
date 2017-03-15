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

  @Input() studentId: number;
  @Output() commit = new EventEmitter<any>();

  private teacherForm: FormGroup;

  private schoolId: AbstractControl;
  private specialtyId: AbstractControl;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.teacherForm = formBuilder.group({
      'studentNumber': ['', Validators.required],
      'name': ['', Validators.required],
      'sexId': [0, Validators.required],
      'schoolId': [0, Validators.required],
      'specialtyId': [0, Validators.required],
    });
    this.schoolId = this.teacherForm.controls['schoolId'];
    this.specialtyId = this.teacherForm.controls['specialtyId'];
  }

  submit(): void {
    this.commit.emit(this.teacherForm.value);
    this.reset();
  }

  reset(): void {
    this.teacherForm.reset();
  }

  canSubmit(): boolean {
    let value = this.teacherForm.value;
    return this.teacherForm.valid && value.sexId!=0 && value.schoolId!=0 && value.specialtyId!=0 && value.classId!=0 && value.grade!=0;
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }
}
