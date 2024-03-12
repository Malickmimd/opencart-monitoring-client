import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../core/models/card.model';
import { NgForOf, NgStyle } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Order } from '../core/models/order.model';
import { Column } from '../core/models/column.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, NgForOf, ChartModule, TableModule, NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    Cards!: Card[]
    data: any;
    options: any;
    basicData: any;
    basicOptions: any;
    orders!: Order[];
    cols!: Column[];

    ngOnInit(): void {
        this.Cards = [
          {
            title: 'Total Orders',
            amount: 5,
            icon: 'fa-solid fa-cart-shopping fa-2xl'
          },
          {
            title: 'Total Products',
            amount: 30,
            icon: 'fa-solid fa-gift fa-2xl'
          },
          {
            title: 'Total Customers',
            amount: 8,
            icon: 'fa-solid fa-users fa-2xl'
          }
        ]
        this.orders = [
          {
            id: 1,
            firstname: "Abdoulaye",
            lastname: "Wade",
            status: "succès"
          },
          {
            id: 2,
            firstname: "Abdoulaye",
            lastname: "Wade",
            status: "succès"
          },
          {
            id: 3,
            firstname: "Rokhaya",
            lastname: "Pouye",
            status: "succès"
          },
        ]
        this.cols = [
          { field: 'id', header: 'ID Order' },
          { field: 'firstname', header: 'Firstname' },
          { field: 'lastname', header: 'Lastname' },
          { field: 'status', header: 'Status' }
        ];
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.basicData = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [300, 50, 100],
                  backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };


      this.basicOptions = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
    }
}
