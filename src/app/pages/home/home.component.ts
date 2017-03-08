/**
 * Created by yzy on 2017/3/5.
 */

import {Component, AfterViewInit} from "@angular/core";
import {PagesService} from "../pages.service";
import {Router} from "@angular/router";
@Component({
    template: require('./home.html'),
    styles: [require('./home.scss')]
})
export class HomeComponent implements AfterViewInit{
    tasks: Array<any>;

    constructor(
        private service: PagesService,
        private router: Router
    ) {

    }

    ngAfterViewInit(): void {
        this.service.getTaskList()
            .then(result => {
                if (result.code == 200) {
                    this.tasks = result.data;
                }
            })
    }

    navigateTo(task: any) {
        this.router.navigate([task.route]);
    }
}
