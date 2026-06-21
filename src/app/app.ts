import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <span class="brand">Inventory</span>
      <div class="nav-links">
        <a routerLink="/dashboard"  routerLinkActive="active">Dashboard</a>
        <a routerLink="/products"   routerLinkActive="active">Products</a>
        <a routerLink="/stock"      routerLinkActive="active">Stock</a>
        <a routerLink="/low-stock"  routerLinkActive="active">Low Stock</a>
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 0 24px;
      height: 56px;
      background: #1e293b;
      color: white;
    }
    .brand {
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }
    .nav-links {
      display: flex;
      gap: 4px;
    }
    .nav-links a {
      padding: 6px 14px;
      border-radius: 6px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.15s, color 0.15s;
    }
    .nav-links a:hover {
      background: #334155;
      color: white;
    }
    .nav-links a.active {
      background: #3b82f6;
      color: white;
    }
    main {
      padding: 8px 0;
    }
  `],
})
export class App {
  protected readonly title = signal('inventory-dashboard');
}
