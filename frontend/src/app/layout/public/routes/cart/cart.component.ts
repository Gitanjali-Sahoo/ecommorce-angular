import { Component, inject } from '@angular/core';
import { CartServiceService } from '../../../../cartService/cart-service.service';
import { CommonModule } from '@angular/common';
import { CartResponse } from '../../../../types/CartResponse';
import { Cart } from '../../../../types/Cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartServiceService);
  cartProducts: Cart[] = [];
  total!: number;
  route: any;
  ngOnInit() {
    this.cartService.getCartProducts().subscribe((response: CartResponse) => {
      this.cartProducts = response.items;
      this.total = response.total;
      console.log(this.cartProducts);
      console.log(this.total);
    });
  }
  updateCart(product: Cart) {
    this.cartService
      .updateProductToCart(product.id, product.quantity)
      .subscribe((response) => {
        console.log(response);
      });
  }
  removeItemFromCart(id: number) {
    this.cartService.deleteProductToCart(id).subscribe((response) => {
      console.log(response);
    });
  }
}
