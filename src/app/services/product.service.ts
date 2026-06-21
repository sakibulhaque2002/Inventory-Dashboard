import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

const SEED_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, stock: 45, category: 'Electronics', lowStockThreshold: 10 },
  { id: 2, name: 'USB-C Hub', price: 49.99, stock: 8, category: 'Electronics', lowStockThreshold: 10 },
  { id: 3, name: 'Notebook A5', price: 4.99, stock: 120, category: 'Stationery', lowStockThreshold: 20 },
  { id: 4, name: 'Ballpoint Pen (12pk)', price: 3.49, stock: 5, category: 'Stationery', lowStockThreshold: 15 },
  { id: 5, name: 'Desk Lamp', price: 34.99, stock: 22, category: 'Furniture', lowStockThreshold: 5 },
  { id: 6, name: 'Office Chair', price: 199.99, stock: 3, category: 'Furniture', lowStockThreshold: 5 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private storageKey = 'inv_products';
  private products: Product[] = [];

  constructor() {
    this.loadFromStorage();
  }

  // ── persistence ────────────────────────────────────────────────────────────

  private loadFromStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    this.products = raw ? JSON.parse(raw) : [...SEED_PRODUCTS];
    if (!raw) this.saveToStorage(); // persist seed on first load
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  // ── reads ──────────────────────────────────────────────────────────────────

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getLowStock(): Product[] {
    return this.products.filter((p) => this.isLowStock(p));
  }

  isLowStock(product: Product): boolean {
    return product.stock <= product.lowStockThreshold;
  }

  // ── writes ─────────────────────────────────────────────────────────────────

  add(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: this.nextId(),
    };
    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  update(updated: Product): void {
    const index = this.products.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = updated;
      this.saveToStorage();
    }
  }

  delete(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
    this.saveToStorage();
  }

  // ── stock movements ────────────────────────────────────────────────────────

  increaseStock(id: number, amount: number): void {
    if (amount <= 0) return;
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.stock += amount;
      this.saveToStorage();
    }
  }

  decreaseStock(id: number, amount: number): void {
    if (amount <= 0) return;
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.stock = Math.max(0, product.stock - amount); // never go below zero
      this.saveToStorage();
    }
  }

  // ── helpers ────────────────────────────────────────────────────────────────

  private nextId(): number {
    return this.products.length > 0
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
  }
}
