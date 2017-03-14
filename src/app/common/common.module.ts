/**
 * Created by yzy on 2017/1/1.
 */

import {NgModule} from "@angular/core";
import {ContentTopComponent} from "./components/content-top/content-top.component";
import {StudentSelectorComponent} from "./components/student-selector/student-selector.component";
import {TeacherSelectorComponent} from "./components/teacher-selector/teacher-selector.component";
import {CommonService} from "./common.service";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../theme/nga.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CodeNamePipe} from "./pipes/code-name.pipe";
import {PaginationModule} from "ng2-bootstrap";
import {SchoolSpecialtyPipe} from "./pipes/school-specialty.pipe";
import {SpecialtyGradeClassPipe} from "./pipes/specialty-grade-class.pipe";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    ContentTopComponent,
    StudentSelectorComponent,
    TeacherSelectorComponent,
    CodeNamePipe,
    SchoolSpecialtyPipe,
    SpecialtyGradeClassPipe
  ],
  exports: [
    ContentTopComponent,
    StudentSelectorComponent,
    TeacherSelectorComponent,
    CodeNamePipe,
    SchoolSpecialtyPipe,
    SpecialtyGradeClassPipe
  ],
  providers: [
    CommonService
  ]
})
export class MyCommonModule {}
