import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { NgForOf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { ElectronService } from '../../services';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgForOf, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  Cards: Card[] = []
  numberOfOrders$!: Observable<number>
  numberOfProducts$!: Observable<number>
  numberOfCustomers$!: Observable<number>

  constructor(private dashboardService: ElectronService) {}

  ngOnInit(): void {
    this.numberOfOrders$ = this.dashboardService.getNumberOfOrders()
    this.numberOfProducts$ = this.dashboardService.getNumberOfProducts()
    this.numberOfCustomers$ = this.dashboardService.getNumberOfCustomers()

    this.numberOfOrders$.subscribe({
      next: (value: number) => {
        this.Cards.push({
          title: 'Total Orders',
          amount: value,
          icon: 'fa-solid fa-cart-shopping fa-2xl'
        });
      }
    });

    this.numberOfProducts$.subscribe({
      next: (value: number) => {
        this.Cards.push({
          title: 'Total Products',
          amount: value,
          icon: 'fa-solid fa-gift fa-2xl'
        });
      }
    });

    this.numberOfCustomers$.subscribe({
      next: (value: number) => {
        this.Cards.push({
          title: 'Total Customers',
          amount: value,
          icon: 'fa-solid fa-users fa-2xl'
        });
      }
    });
  }
}
