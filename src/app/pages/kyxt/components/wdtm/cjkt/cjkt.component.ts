/**
 * Created by yzy on 2017/1/2.
 */

import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {KyxtService} from "../../../kyxt.service";

import '../../../editor.loader';
import 'ckeditor'

@Component({
  selector: 'project-form',
  templateUrl: 'cjkt.html'
})
export class CjktComponent implements OnInit{

  interests: Array<any> = [];
  selectedInterests: Array<any> = [];
  formGroup: FormGroup;

  editorConfig = {
    height: '400',
  };

  constructor(
    private fb: FormBuilder,
    private service: KyxtService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.formGroup = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public ngOnInit(): void {

  }

  public commit(): void {
    let value = this.formGroup.value;
    let interests = [];
    for (let interest of this.selectedInterests) {
      interests.push(interest.id);
    }
    let params = {
      title: value.title,
      description: value.description.replace('\n', ''),
      interests: interests
    };
    if (this.formGroup.valid) {
      this.service.createOrUpdateProject(params)
        .then(result => {
          if (result.code == 200) {
            this.notificationsService.success('成功', result.message);
            this.router.navigate(['pages', 'kyxt', 'wdtm']);
          } else {
            this.notificationsService.error('失败', result.message);
          }
        });
    }
  }
}
