import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [NgFor, NgIf, NgClass, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  searchTerm = '';
  selectedCategory = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getAll();
  }

  get categories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }

  get filtered(): Product[] {
    return this.products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? p.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
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
