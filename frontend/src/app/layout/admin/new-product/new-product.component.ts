import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductService } from '../../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [SidebarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private productService = inject(ProductService);
  productForm!: FormGroup;
  private router = inject(Router);
  message!: string;
  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      sku: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z]{3}[0-9]{3}'),
      ]),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const product = this.productForm.value;
    this.productService.postNewProduct(product).subscribe((response) => {
      this.message = response.message;
    });
    this.productForm.reset('');
    this.router.navigate(['/admin']);
  }
}
