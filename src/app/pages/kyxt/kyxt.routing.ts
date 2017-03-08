/**
 * Created by yzy on 2017/1/1.
 */

import {Routes, RouterModule} from "@angular/router";
import {KyxtComponent} from "./kyxt.component";
import {WdtmComponent} from "./components/wdtm/wdtm.component";
import {ZntmComponent} from "./components/zntm/zntm.component";
import {CjktComponent} from "./components/cjkt/cjkt.component";
import {XsxtComponent} from "./components/xsxt/xsxt.component";
import {TxxxComponent} from "./components/txxx/txxx.component";
import {XsxxComponent} from "./components/xsxx/xsxx.component";
import {TjxxComponent} from "./components/tjxx/tjxx.component";
import {ModuleWithProviders} from "@angular/core";

const routes:Routes = [{
    path: '',
    component: KyxtComponent,
    children: [
        {
            path: 'wdtm',
            component: WdtmComponent
        },
        {
            path: 'zntm',
            component: ZntmComponent
        },
        {
            path: 'cjkt',
            component: CjktComponent
        },
        {
            path: 'xsxt',
            component: XsxtComponent
        },
        {
            path: 'txxx',
            component: TxxxComponent
        },
        {
            path: 'xsxx',
            component: XsxxComponent
        },
        // {
        //     path: 'admin',
        //     children: [
        //         {path: '', loadChildren: './components/admin/admin.module'}
        //     ]
        // },
        {
            path: 'tjxx',
            component: TjxxComponent
        }
    ]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
