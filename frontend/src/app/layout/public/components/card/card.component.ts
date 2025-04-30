import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../../../types/Product';
import { CartServiceService } from '../../../../cartService/cart-service.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() filteredProducts: Product[] = [];
  @Input() isFiltered!: boolean;
  private route = inject(ActivatedRoute);
  private cartService = inject(CartServiceService);
  message!: string;

  addProductToCart(id: number) {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cartService.postProductToCart(id).subscribe((response) => {
      this.message = response.message;
      console.log(this.message);
      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }
}
