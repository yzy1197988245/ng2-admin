/**
 * Created by yzy on 2017/1/7.
 */

import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KyxtService} from "../../kyxt.service";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications";

import '../../editor.loader';
import 'ckeditor';

@Component({
  selector: 'txxx',
  templateUrl: 'txxx.html',
  styleUrls: ['txxx.scss']
})
export class TxxxComponent implements OnInit{

  selectedTeacher: any;
  selectedInterests: Array<any> = [];

  formGroup: FormGroup;

  editorConfig = {
    height: '400'
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationService: NotificationsService
  ) {
    this.buildForm();
  }

  public ngOnInit(): void {
    this.service.getStudentBaseInfo()
      .then(result => {
        this.selectedTeacher = result.data.interestTeacher;
        this.selectedInterests = result.data.interests;
        this.formGroup.setValue({description: result.data.description});
      });
  }

  public buildForm(): void {
    this.formGroup = this.fb.group({
      description: ['', Validators.required],
    })
  }

  public teacherSelected(teacher: any): void {
    this.selectedTeacher = teacher;
  }

  public interestChanged(interests: Array<any>): void {
    this.selectedInterests = interests;
  }

  public canCommit(): boolean {
    return this.formGroup.valid && !isNullOrUndefined(this.selectedTeacher) && this.selectedInterests.length > 0;
  }

  public commit(): void {
    if (this.canCommit()) {
      let value = this.formGroup.value;
      let interests = [];
      for (let interest of this.selectedInterests) {
        interests.push(interest.id);
      }
      let data = {
        description: value.description.replace('\n', ''),
        interestTeacher: this.selectedTeacher.id,
        interests: interests,
      };
      this.service.updateStudentDescription(data)
        .then(result => {
          if (result.code == 200) {
            this.notificationService.success('成功', result.message);
          } else {
            this.notificationService.error('失败', result.message);
          }
        })
    }
  }
}
