import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {PagesService} from "./pages.service";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
`,
})
export class Pages {

  constructor(
    private _menuService: BaMenuService,
    private pagesService: PagesService
  ) {
  }

  ngOnInit() {
    // this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    this.pagesService.getMenu()
      .then(result => {
        this._menuService.updateMenuByRoutes(<Routes>result);
      });
  }
}
