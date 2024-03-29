import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../core/components/card/card.component';
import { NgForOf, NgStyle } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Order } from '../core/models/order.model';
import { Column } from '../core/models/column.model';
import { CardListComponent } from '../core/components/card-list/card-list.component';
import { Observable } from 'rxjs';
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

    constructor(private dashboardService: ElectronService) {}

    ngOnInit(): void {
        this.numberOfOrders$ = this.dashboardService.getNumberOfOrders()
        this.numberOfProducts$ = this.dashboardService.getNumberOfProducts()
        this.numberOfCustomers$ = this.dashboardService.getNumberOfCustomers()

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
  
          // Initialisez basicData avec this.Data après que toutes les valeurs ont été reçues
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
        
        //Graphe2 config
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
        //Graphe2 config

        //Graphe1 Config
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
        //Graphe1 config

    }
}
