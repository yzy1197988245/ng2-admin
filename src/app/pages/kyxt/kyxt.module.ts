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
import {CjktComponent} from "./components/cjkt/cjkt.component";
import {NgaModule} from "../../theme/nga.module";
import {CKEditorModule} from "ng2-ckeditor";
import {XsxtComponent} from "./components/xsxt/xsxt.component";
import {TxxxComponent} from "./components/txxx/txxx.component";
import {XsxxComponent} from "./components/xsxx/xsxx.component";
import {KyxtService} from "./kyxt.service";
import {ModalModule} from "ng2-bootstrap";
import {SelectModule} from "ng2-select";
import {TjxxComponent} from "./components/tjxx/tjxx.component";

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgaModule,
    CKEditorModule,
    ModalModule,
    SelectModule
  ],
  declarations: [
    KyxtComponent,
    WdtmComponent,
    ZntmComponent,
    CjktComponent,
    XsxtComponent,
    TxxxComponent,
    XsxxComponent,
    TjxxComponent
  ],
  providers: [
    KyxtService
  ]
})
export class KyxtModule{}
