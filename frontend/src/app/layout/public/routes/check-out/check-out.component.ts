import { Component, inject } from '@angular/core';
import { CartServiceService } from '../../../../cartService/cart-service.service';
import { Cart } from '../../../../types/Cart';
import { CartResponse } from '../../../../types/CartResponse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
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
  // calculateTotal() {
  //   this.total = this.cartProducts.reduce((sum, item: Cart) => {
  //     return sum + Number(item.price) * item.quantity;
  //   }, 0);
  // }
  updateCart(product: Cart) {
    this.cartService
      .updateProductToCart(product.id, product.quantity)
      .subscribe((response) => {
        this.total = this.cartService.calculateTotal(this.cartProducts);
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
      this.total = this.cartService.calculateTotal(this.cartProducts);
    });
  }
}
