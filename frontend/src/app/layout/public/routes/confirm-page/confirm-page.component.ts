import { Component, inject } from '@angular/core';
import { CartServiceService } from '../../../../cartService/cart-service.service';
import { Cart } from '../../../../types/Cart';
import { CartResponse } from '../../../../types/CartResponse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm-page.component.html',
  styleUrl: './confirm-page.component.css',
})
export class ConfirmPageComponent {
  private cartService = inject(CartServiceService);
  cartProducts: Cart[] = [];
  total!: number;
  route: any;
  message!: string;
  ngOnInit() {
    this.cartService.getCartProducts().subscribe((response: CartResponse) => {
      this.cartProducts = response.items;
      this.total = response.total;
    });
  }
}
