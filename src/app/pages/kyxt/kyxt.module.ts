/**
 * Created by yzy on 2017/1/1.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./kyxt.routing";
import {KyxtComponent} from "./kyxt.component";
import {WdtmComponent} from "./components/wdtm/wdtm.component";
import {ZntmComponent} from "./components/zntm/zntm.component";
import {MyCommonModule} from "../../common/common.module";
import {CjktComponent} from "./components/wdtm/cjkt/cjkt.component";
import {NgaModule} from "../../theme/nga.module";
import {CKEditorModule} from "ng2-ckeditor";
import {XsxtComponent} from "./components/xsxt/xsxt.component";
import {TxxxComponent} from "./components/txxx/txxx.component";
import {XsxxComponent} from "./components/xsxx/xsxx.component";
import {KyxtService} from "./kyxt.service";
import {ModalModule, PaginationModule} from "ng2-bootstrap";
import {SelectModule} from "ng2-select";
import {TjxxComponent} from "./components/tjxx/tjxx.component";
import {TxxxTeacherSelectorComponent} from "./components/txxx/txxx-teacher-selector/txxx-teacher-selector.component";
import {TxxxInterestSelectorComponent} from "./components/txxx/txxx-interest-selector/txxx-interest-selector.component";
import {ProjectDetailComponent} from "./components/project-detail/project-detail.component";
import {XtjcComponent} from "./components/xtjc/xtjc.component";
import {XtfpComponent} from "./components/xtfp/xtfp.component";

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgaModule,
    CKEditorModule,
    ModalModule.forRoot(),
    SelectModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    KyxtComponent,
    WdtmComponent,
    ZntmComponent,
    CjktComponent,
    XsxtComponent,
    TxxxComponent,
    XsxxComponent,
    TjxxComponent,
    TxxxTeacherSelectorComponent,
    TxxxInterestSelectorComponent,
    ProjectDetailComponent,
    XtjcComponent,
    XtfpComponent
  ],
  providers: [
    KyxtService
  ]
})
export class KyxtModule{}
