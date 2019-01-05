import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems = MENU_ITEMS;

  private alive: boolean = true;
  selectedItem: string;

  constructor(private menuService: NbMenuService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.alive = false;
  }

  addMenuItem() {
    this.menuService.addItems([{
      title: '@nebular/theme',
      target: '_blank',
      icon: 'nb-plus',
      url: 'https://github.com/akveo/ngx-admin',
    }], 'menu');
  }

  collapseAll() {
    this.menuService.collapseAll('menu');
  }

  navigateHome() {
    this.menuService.navigateHome('menu');
  }

  getSelectedItem() {
    this.menuService.getSelectedItem('menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe((menuBag) => {
        this.selectedItem = menuBag.item.title;
      });
  }
}
