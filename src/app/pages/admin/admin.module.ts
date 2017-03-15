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
import {ModalModule, PaginationModule} from "ng2-bootstrap";
import {AdminService} from "./admin.service";
import {MenuItem} from "./components/menu/menu-item/menu-item.component";
import {PowerComponent} from "./components/power/power.component";
import {StudentComponent} from "./components/student/student.component";
import {FileComponent} from "./components/file/file.component";
import {MyCommonModule} from "../../common/common.module";
import {TeacherComponent} from "./components/teacher/teacher.component";
import {StudentForm} from "./components/student/student-form/student-form.component";
import {TeacherForm} from "./components/teacher/teacher-form/teacher-form";

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    UserComponent,
    MenuComponent,
    MenuItem,
    PowerComponent,
    StudentComponent,
    FileComponent,
    TeacherComponent,
    StudentForm,
    TeacherForm
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {}
