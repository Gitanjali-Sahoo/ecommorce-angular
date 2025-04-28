import { Component, inject } from '@angular/core';
import { CartServiceService } from '../../../../cartService/cart-service.service';
import { CommonModule } from '@angular/common';
import { CartResponse } from '../../../../types/CartResponse';
import { Cart } from '../../../../types/Cart';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartServiceService);
  cartProducts: Cart[] = [];
  total!: number;
  route: any;
  message!: string;
  ngOnInit() {
    this.cartService.getCartProducts().subscribe((response: CartResponse) => {
      this.cartProducts = response.items;
      this.total = response.total;
      console.log(this.cartProducts);
    });
  }
  calculateTotal() {
    this.total = this.cartProducts.reduce((sum, item: Cart) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);
  }
  updateCart(product: Cart) {
    this.cartService
      .updateProductToCart(product.id, product.quantity)
      .subscribe((response) => {
        this.calculateTotal();
        console.log(response);
      });
  }

  removeItemFromCart(id: number, name: string) {
    this.cartService.deleteProductToCart(id).subscribe((response) => {
      this.message = name + ' ' + response.message;
      setTimeout(() => {
        this.message = '';
      }, 2000);
      this.cartProducts = this.cartProducts.filter(
        (product) => product.id !== id
      );
      this.calculateTotal();
    });
  }
}
