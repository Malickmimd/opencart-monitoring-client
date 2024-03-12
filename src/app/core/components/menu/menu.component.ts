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
            { label: 'Orders and Sales', icon: 'fa-solid fa-cart-shopping', routerLink:'order-sale' },
            { label: 'User Activity', icon: 'fa-solid fa-users', routerLink:'user-activity' },
            { label: 'Product Analysis', icon: 'fa-solid fa-gift', routerLink:'product-analysis' }
        ];

        this.activeItem = this.items[0];
    }
}
