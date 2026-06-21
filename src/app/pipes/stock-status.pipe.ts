import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stockStatus', standalone: true })
export class StockStatusPipe implements PipeTransform {
  transform(stock: number, threshold: number): string {
    if (stock === 0)          return 'Out of Stock';
    if (stock <= threshold)   return 'Low Stock';
    return '';
  }
}
