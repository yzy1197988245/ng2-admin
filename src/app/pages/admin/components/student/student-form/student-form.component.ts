/**
 * Created by yzy on 2017/3/13.
 */


import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DataService} from "../../../../../app.data";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";

@Component({
  selector: 'student-form',
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.scss']
})
export class StudentForm {

  @Input() studentId: number;
  @Output() commit = new EventEmitter<any>();

  private studentForm: FormGroup;

  private schoolId: AbstractControl;
  private specialtyId: AbstractControl;
  private grade: AbstractControl;
  private classId: AbstractControl;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = formBuilder.group({
      'studentNumber': ['', Validators.required],
      'name': ['', Validators.required],
      'sexId': [0, Validators.required],
      'schoolId': [0, Validators.required],
      'specialtyId': [0, Validators.required],
      'grade': [0, Validators.required],
      'classId': [0, Validators.required],
      'year': ['', Validators.required]
    });
    this.schoolId = this.studentForm.controls['schoolId'];
    this.specialtyId = this.studentForm.controls['specialtyId'];
    this.grade = this.studentForm.controls['grade'];
    this.classId = this.studentForm.controls['classId'];
  }

  submit(): void {
    this.commit.emit(this.studentForm.value);
    this.reset();
  }

  reset(): void {
    this.studentForm.reset({
      'studentNumber': '',
      'name': '',
      'sexId': 0,
      'schoolId': 0,
      'specialtyId': 0,
      'grade': 0,
      'classId': 0,
      'year': ''
    });
  }

  canSubmit(): boolean {
    let value = this.studentForm.value;
    return this.studentForm.valid && value.sexId!=0 && value.schoolId!=0 && value.specialtyId!=0 && value.classId!=0 && value.grade!=0;
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
    this.grade.setValue(0);
    this.classId.setValue(0);
  }

  specialtyChanged(): void {
    this.grade.setValue(0);
    this.classId.setValue(0);
  }

  gradeChanged(): void {
    this.classId.setValue(0);
  }
}

