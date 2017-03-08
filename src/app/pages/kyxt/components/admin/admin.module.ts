/**
 * Created by yzy on 2017/3/3.
 */

import {NgModule} from "@angular/core";
import {routing} from "./admin.routing";
import {AdminService} from "./admin.service";
import {AdminComponent} from "./admin/admin.component";
import {NgaModule} from "../../../../theme/nga.module";
import {MyCommonModule} from "../../../../common/common.module";
@NgModule({
    imports: [
        routing,
        NgaModule,
        MyCommonModule
    ],
    declarations: [
        AdminComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule {

}
