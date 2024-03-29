import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'fa-solid fa-chart-line', routerLink:'dashboard' },
        ];

        this.activeItem = this.items[0];
    }
}
