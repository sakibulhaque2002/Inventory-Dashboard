import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalProducts  = 0;
  totalStock     = 0;
  lowStockCount  = 0;
  outOfStock     = 0;
  totalCategories = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const products = this.productService.getAll();

    this.totalProducts   = products.length;
    this.totalStock      = products.reduce((sum, p) => sum + p.stock, 0);
    this.lowStockCount   = this.productService.getLowStock().length;
    this.outOfStock      = products.filter(p => p.stock === 0).length;
    this.totalCategories = new Set(products.map(p => p.category)).size;
  }
}
