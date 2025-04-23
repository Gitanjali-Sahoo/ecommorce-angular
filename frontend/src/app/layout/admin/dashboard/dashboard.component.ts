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

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          alert(response.message);

          this.products = this.products.filter((product) => product.id !== id);
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete product');
        },
      });
    }
  }
}
