import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderSalesComponent } from './order-sales/order-sales.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { ProductAnalysisComponent } from './product-analysis/product-analysis.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'order-sale', component: OrderSalesComponent },
  { path: 'user-activity', component: UserActivityComponent },
  { path: 'product-analysis', component: ProductAnalysisComponent },
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
