import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:              ['', Validators.required],
      category:          ['', Validators.required],
      price:             [null, Validators.required],
      stock:             [null, Validators.required],
      lowStockThreshold: [5,   Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const product = this.productService.getById(Number(idParam));
      if (product) {
        this.isEditMode = true;
        this.editId = product.id;
        this.form.patchValue(product);
      }
    }
  }

  f(field: string) {
    return this.form.get(field)!;
  }

  isInvalid(field: string): boolean {
    const ctrl = this.f(field);
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.editId !== null) {
      this.productService.update({ id: this.editId, ...this.form.value });
    } else {
      this.productService.add(this.form.value);
    }

    this.router.navigate(['/products']);
  }
}
