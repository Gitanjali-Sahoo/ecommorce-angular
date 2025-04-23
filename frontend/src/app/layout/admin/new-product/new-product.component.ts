import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductService } from '../../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private productService = inject(ProductService);
  productForm!: FormGroup;
  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      sku: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      date: new FormControl(''),
    });
  }
  onSubmit() {
    const product = this.productForm.value;
    this.productService.postNewProduct(product).subscribe((response) => {
      console.log(response);
    });
    console.log(product);
  }
}
