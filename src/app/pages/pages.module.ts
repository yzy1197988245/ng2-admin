import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import {PagesService} from "./pages.service";
import {HomeComponent} from "./home/home.component";
import {MyCommonModule} from "../common/common.module";
import {ModifyPasswordComponent} from "./modify-password/modify-password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, NgaModule, routing, MyCommonModule, ReactiveFormsModule, FormsModule],
  declarations: [Pages, HomeComponent, ModifyPasswordComponent],
  providers: [
    PagesService
  ]
})
export class PagesModule {
}
