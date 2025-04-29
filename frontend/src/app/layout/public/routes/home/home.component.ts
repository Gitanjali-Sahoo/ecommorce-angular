import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Product } from '../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { ChooseUsComponent } from '../../components/choose-us/choose-us.component';
import { HeroImageComponent } from '../../components/hero-image/hero-image.component';
import { SpotComponent } from '../../components/spot/spot.component';
import { routes } from '../../../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';

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
  filteredProducts: Product[] = [];
  private route = inject(ActivatedRoute);
  isFiltered: boolean = false;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response.visibleProducts;

      this.route.queryParams.subscribe((params) => {
        const query = params['query'] || '';

        if (query) {
          this.filteredProducts = this.products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          this.isFiltered = true;
        } else {
          this.filteredProducts = this.products;
          this.isFiltered = false;
        }
      });
    });
  }
}
