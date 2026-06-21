import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StockStatusPipe } from '../../pipes/stock-status.pipe';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-low-stock',
  imports: [RouterLink, StockStatusPipe],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.css',
})
export class LowStockComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService
      .getLowStock()
      .sort((a, b) => a.stock - b.stock);
  }
}
