import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../types/Product';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // @Input() products: Product[] = [];
  @Input() filteredProducts: Product[] = [];
  @Input() isFiltered!: boolean;
}
