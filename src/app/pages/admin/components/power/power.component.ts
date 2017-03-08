/**
 * Created by yzy on 2017/1/31.
 */

import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Menu} from "../menu/menu.component";
@Component({
  template: require('./power.html'),
  styles: [require('./power.scss')]
})
export class PowerComponent implements OnInit{

  roles: Array<any>;
  selectedRole: any;
  menuTree: Array<any>;

  newRoleForm: FormGroup;

  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder
  ){

    this.newRoleForm = formBuilder.group({
      name: ['', Validators.required]
    })
  }

  public ngOnInit(): void {
    this.getRoles();

  }

  getRoles(): void {
    this.service.getRoleList()
      .then(result => {
        console.log(result);
        this.roles = result;
      })
  }

  createRole(): void {
    console.log(this.newRoleForm.value);
    if (this.newRoleForm.valid) {
      this.service.createRole(this.newRoleForm.value)
        .then(result => {
          console.log(result);
          this.newRoleForm.reset();
          this.getRoles();
        });
    }
  }

  selectRole(role: any): void {
    this.selectedRole = role;
    this.service.getRoleRoutes(role)
      .then(result => {
        console.log(result);
        this.menuTree = result;
      })
  }

  addPower(menu: Menu): void {
    if (menu.enable) {
      let data: any = {
        role_id: this.selectedRole.id,
        route_id: menu.id
      };
      this.service.deletePower(data)
        .then(result => {
          console.log('result');
          menu.enable = false;
        })
    } else {
      let data: any = {
        role_id: this.selectedRole.id,
        route_id: menu.id
      };
      this.service.addPower(data)
        .then(result => {
          menu.enable = true;
        })
    }
  }
}
