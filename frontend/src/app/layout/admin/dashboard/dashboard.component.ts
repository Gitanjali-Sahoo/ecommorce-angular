import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/Product';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  message!: string;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  handleDelete(id: number) {
    //   if (confirm('Are you sure you want to delete this product?')) {
    //     this.productService.deleteProduct(id).subscribe((response) => {
    //       alert(response.message);

    //       this.products = this.products.filter((product) => product.id !== id);
    //     });
    //   }
    // }

    this.productService.deleteProduct(id).subscribe((response) => {
      this.message = response.message;

      this.products = this.products.filter((product) => product.id !== id);
      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }
}
