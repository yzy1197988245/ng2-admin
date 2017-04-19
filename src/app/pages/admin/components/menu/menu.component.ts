/**
 * Created by yzy on 2017/1/9.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  templateUrl: './menu.html',
  styleUrls: ['./modals.scss']
})
export class MenuComponent implements OnInit{

  menuForm: FormGroup;
  menu: any;
  menuDetail: any;

  @ViewChild('lgModal') public lgModal:ModalDirective;

  constructor(
    private fb: FormBuilder,
    private service: AdminService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getMenuTree();
  }

  private buildForm():void {
    this.menuForm = this.fb.group({
      id: [1],
      title: [''],
      icon: [''],
      order: [1],
      path: [''],
      parent_id: [1],
      start_time: [''],
      end_time: [''],
      long_time: [1]
    });
  }

  public createMenu(): void {
    this.menuForm.reset(this.menu);
    this.lgModal.show();
  }

  public onSubmit(): void {
    this.service.createMenu(this.menuForm.value).then(result => {
      console.log(result);
      this.getMenuTree();
      this.lgModal.hide();
    });
  }

  public valid(formControl: string): boolean {
    return this.menuForm.controls[formControl].valid;
  }

  menuTree = [];

  public getMenuTree(): void {
      this.service.getMenu().then(result => this.menuTree = result);
  }

  public getMenuDetail(menu: any): void {
    this.service.getMenuDetail(menu.id).then(result => {
      this.menuDetail = result;
      this.menuForm.reset(result);
      this.lgModal.show();
    });
  }

  public delete(): void {
    if (this.menuDetail.id != null) {
      this.service.deleteMenu(this.menuDetail.id).then(result => {
        console.log(result);
        this.menuDetail = null;
        this.getMenuTree();
        this.menuForm.reset(this.menu);
      });
    }
  }
}
