/**
 * Created by yzy on 2017/1/9.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {ModalDirective} from "ng2-bootstrap";

export class Menu {

  public id: number;
  public title: string = '';
  public icon: string = '';
  public order: number = 0;
  public path: string = '';
  public parent_id: number = 0;
  public start_time: string = '2017-01-01 00:00:00';
  public end_time: string = '2017-01-01 00:00:00';
  public long_time: boolean = true;
  public enable: boolean;
}

@Component({
  template: require('./menu.html'),
  styles: [require('./modals.scss')]
})
export class MenuComponent implements OnInit{

  menuForm: FormGroup;
  menu = new Menu();
  menuDetail: Menu;

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
      id: [this.menu.id],
      title: [this.menu.title],
      icon: [this.menu.icon],
      order: [this.menu.order],
      path: [this.menu.path],
      parent_id: [this.menu.parent_id],
      start_time: [this.menu.start_time],
      end_time: [this.menu.end_time],
      long_time: [this.menu.long_time]
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

  public getMenuDetail(menu: Menu): void {
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
