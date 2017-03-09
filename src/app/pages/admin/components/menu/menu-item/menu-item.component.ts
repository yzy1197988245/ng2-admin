/**
 * Created by yzy on 2017/1/23.
 */


import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.html',
  styleUrls: ['./menu-item.scss']
})
export class MenuItem {
  @Input() menuItem: any;
  @Input() selected: boolean = false;

  @Output() itemSelected = new EventEmitter<any>();

  public itemClicked(menu: any):void {
    this.itemSelected.emit(menu);
  }
}
