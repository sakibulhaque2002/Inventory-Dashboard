import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StockComponent } from './components/stock/stock.component';
import { LowStockComponent } from './components/low-stock/low-stock.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: 'stock', component: StockComponent },
  { path: 'low-stock', component: LowStockComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
