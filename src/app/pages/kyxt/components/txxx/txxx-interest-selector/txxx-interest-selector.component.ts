/**
 * Created by yzy on 2017/3/20.
 */

import {Component, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../../app.data";
import {KyxtService} from "../../../kyxt.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'txxx-interect-selector',
  templateUrl: './txxx-interest-selector.html',
  styleUrls: ['./txxx-interest-selector.scss'],
})
export class TxxxInterestSelectorComponent {

  @Input() @Output() selectedInterests: any = [];

  interests: Array<any>;

  totalCount = 0;
  currentPage = 1;
  maxSize = 10;

  paramsForm: FormGroup;
  specialtyId: AbstractControl;

  constructor(
    public dataService: DataService,
    public commonService: KyxtService,
    public formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      name: '',
      schoolId: [0],
      specialtyId: [0],
    });
    this.specialtyId = this.paramsForm.controls['specialtyId'];
    this.getInterestList();
  }

  getInterestList(): void {
    let data = this.paramsForm.value;
    data.page = this.currentPage;
    this.commonService.getTxxxInterestsWithParams(data)
      .then(result => {
        this.interests = result.data;
        this.totalCount = result.total;
      })
  }

  pageChanged(data): void {
    this.currentPage = data.page;
    this.getInterestList()
  }

  schoolChanged(): void {
    this.specialtyId.setValue(0);
  }

  interestClicked(interest: any): void {
    let index = this.isSelected(interest);
    if (index != -1) {
      this.selectedInterests.splice(index, 1);
    } else {
      this.selectedInterests.push(interest);
    }
  }

  isSelected(interest: any): number {
    if (isNullOrUndefined(interest))
      return -1;

    for (let i = 0; i < this.selectedInterests.length; i++) {
      if (interest.id == this.selectedInterests[i].id) {
        return i;
      }
    }

    return -1;
  }
}
