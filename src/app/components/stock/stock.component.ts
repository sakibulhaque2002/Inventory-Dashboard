import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockStatusPipe } from '../../pipes/stock-status.pipe';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

type MovementType = 'in' | 'out';

@Component({
  selector: 'app-stock',
  imports: [NgClass, FormsModule, StockStatusPipe],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;
  movementType: MovementType = 'in';
  amount: number | null = null;

  lastMessage: { text: string; type: 'success' | 'error' } | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }

  get selectedProduct(): Product | undefined {
    if (this.selectedProductId === null) return undefined;
    return this.productService.getById(Number(this.selectedProductId));
  }

  get canSubmit(): boolean {
    return (
      this.selectedProductId !== null &&
      this.amount !== null &&
      this.amount > 0
    );
  }

  apply(): void {
    if (!this.canSubmit || !this.amount) return;

    const id = Number(this.selectedProductId);

    if (this.movementType === 'out') {
      const product = this.selectedProduct;
      if (product && this.amount > product.stock) {
        this.showMessage(`Not enough stock. Current stock: ${product.stock}`, 'error');
        return;
      }
      this.productService.decreaseStock(id, this.amount);
      this.showMessage(`Removed ${this.amount} units from stock.`, 'success');
    } else {
      this.productService.increaseStock(id, this.amount);
      this.showMessage(`Added ${this.amount} units to stock.`, 'success');
    }

    // refresh the list so the stock count updates instantly
    this.products = this.productService.getAll();
    this.amount = null;
  }

  isLowStock(product: Product): boolean {
    return this.productService.isLowStock(product);
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    this.lastMessage = { text, type };
    setTimeout(() => (this.lastMessage = null), 3000);
  }
}
