/**
 * Created by yzy on 2017/1/9.
 */

import {Routes, RouterModule} from '@angular/router'
import {AdminComponent} from "./admin.component";
import {MenuComponent} from "./components/menu/menu.component";
import {UserComponent} from "./components/user/user.component";
import {PowerComponent} from "./components/power/power.component";
import {StudentComponent} from "./components/student/student.component";
import {FileComponent} from "./components/file/file.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'power',
        component: PowerComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'file',
        component: FileComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
