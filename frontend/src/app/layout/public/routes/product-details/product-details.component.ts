import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../types/Product';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../../../cartService/cart-service.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productService = inject(ProductService);
  private cartSerive = inject(CartServiceService);
  private route = inject(ActivatedRoute);
  product!: Product;
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }
  addProductToCart() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cartSerive.postProductToCart(id).subscribe((response) => {
      console.log(response);
    });
  }
}
