/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../core/components/card/card.component';
import { NgForOf, NgStyle } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Order } from '../core/models/order.model';
import { Column } from '../core/models/column.model';
import { CardListComponent } from '../core/components/card-list/card-list.component';
import { Observable, map } from 'rxjs';
import { ElectronService } from '../core/services';
import { AsyncPipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, NgForOf, ChartModule, TableModule, NgStyle, CardListComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    numberOfOrders$!: Observable<number>
    numberOfProducts$!: Observable<number>
    numberOfCustomers$!: Observable<number>
    data: any;
    options: any;
    basicData: any;
    basicOptions: any;
    ordersList$!: Observable<Order[]>;
    cols!: Column[];
    Data: number[] = []
    ProductsCategory$!: Observable<{ "category_name": string, "product_count": number }[]>

    constructor(private dashboardService: ElectronService) {}

    ngOnInit(): void {
        this.numberOfOrders$ = this.dashboardService.getNumberOfOrders()
        this.numberOfProducts$ = this.dashboardService.getNumberOfProducts()
        this.numberOfCustomers$ = this.dashboardService.getNumberOfCustomers()
        this.ProductsCategory$ = this.dashboardService.getProductCategory()

        // Créez un tableau d'observables et attendez qu'ils soient tous résolus
    const observables: Observable<number>[] = [
        this.numberOfOrders$,
        this.numberOfProducts$,
        this.numberOfCustomers$
      ];
  
      // Utilisez forkJoin pour combiner les observables et attendre que toutes les valeurs soient reçues
    forkJoin(observables).subscribe({
        next: (values: number[]) => {
          // Initialisez les propriétés du composant avec les valeurs reçues
          this.Data = values;
  
          // Initialisez basicData avec this.Data après que toutes les valeurs aient été reçues
          //donhut chart data config
          const documentStyle = getComputedStyle(document.documentElement);
          this.basicData = {
            labels: ['Orders', 'Products', 'Customers'],
            datasets: [
              {
                data: this.Data,
                backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'),
                  documentStyle.getPropertyValue('--yellow-500'),
                  documentStyle.getPropertyValue('--green-500')
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--blue-400'),
                  documentStyle.getPropertyValue('--yellow-400'),
                  documentStyle.getPropertyValue('--green-400')
                ]
              }
            ]
        }
    }
      });
        
        
        // Orders List
        this.ordersList$ = this.dashboardService.getOrdersList()
        this.cols = [
          { field: 'id', header: 'ID Order' },
          { field: 'firstname', header: 'Firstname' },
          { field: 'lastname', header: 'Lastname' },
          { field: 'status', header: 'Status' }
        ];
        // Orders List

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        //donhut chart option config
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
        //donhut chart option config

        //vertical bar chart Config
        this.ProductsCategory$.pipe(
            map((categories: { category_name: string, product_count: number }[]) => {
              const labels: string[] = [];
              const data: number[] = [];
              categories.forEach(category => {
                labels.push(category.category_name);
                data.push(category.product_count);
              });
              return {
                labels: labels,
                datasets: [
                  {
                    label: 'Number of products in stock per product category',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: data
                  }
                ]
              };
            })
          ).subscribe((transformedData: { labels: string[], datasets: {label: string, backgroundColor: string, borderColor: string, data: number[]}[] }) => {
                // Mettre à jour la propriété 'data' avec les données transformées
                this.data = transformedData;
            });

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
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
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
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
        //vertical bar chart config

    }
}
