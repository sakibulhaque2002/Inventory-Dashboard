import { Component } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { StockStatusPipe } from '../../pipes/stock-status.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [NgClass, RouterLink, FormsModule, DecimalPipe, StockStatusPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  searchTerm = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  get filtered(): Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isLowStock(product: Product): boolean {
    return this.productService.isLowStock(product);
  }

  delete(id: number): void {
    if (confirm('Delete this product?')) {
      this.productService.delete(id);
      this.products = this.productService.getAll();
    }
  }
}
