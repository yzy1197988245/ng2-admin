/**
 * Created by yzy on 2017/1/23.
 */


import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Menu} from "../menu.component";

@Component({
  selector: 'menu-item',
  template: require('./menu-item.html'),
  styles: [require('./menu-item.scss')]
})
export class MenuItem {
  @Input() menuItem: Menu;
  @Input() selected: boolean = false;

  @Output() itemSelected = new EventEmitter<Menu>();

  public itemClicked(menu: Menu):void {
    this.itemSelected.emit(menu);
  }
}
