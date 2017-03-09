/**
 * Created by yzy on 2017/1/9.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {AdminComponent} from "./admin.component";
import {UserComponent} from "./components/user/user.component";
import {MenuComponent} from "./components/menu/menu.component";
import {routing} from "./admin.routing";
import {DatepickerModule, TimepickerModule, ModalModule} from "ng2-bootstrap";
import {AdminService} from "./admin.service";
import {MenuItem} from "./components/menu/menu-item/menu-item.component";
import {PowerComponent} from "./components/power/power.component";
import {StudentComponent} from "./components/student/student.component";
import {FileComponent} from "./components/file/file.component";
import {MyCommonModule} from "../../common/common.module";

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    DatepickerModule,
    TimepickerModule,
    ModalModule
  ],
  declarations: [
    AdminComponent,
    UserComponent,
    MenuComponent,
    MenuItem,
    PowerComponent,
    StudentComponent,
    FileComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {}
