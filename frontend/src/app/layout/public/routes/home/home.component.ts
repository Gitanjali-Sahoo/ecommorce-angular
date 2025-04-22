import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Product } from '../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { ChooseUsComponent } from '../../components/choose-us/choose-us.component';
import { HeroImageComponent } from '../../components/hero-image/hero-image.component';
import { SpotComponent } from '../../components/spot/spot.component';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    ChooseUsComponent,
    HeroImageComponent,
    SpotComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
