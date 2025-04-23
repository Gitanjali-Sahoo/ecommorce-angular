import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  product!: Product;
  // products: Product[] = [];
  ngOnInit() {
    // this.productService.getAllProducts().subscribe((products) => {
    //   this.products = products;
    // });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }
}
