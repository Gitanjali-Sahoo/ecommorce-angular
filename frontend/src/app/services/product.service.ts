import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  //Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  //Get a product by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  //Post a product to backend
  postNewProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', newProduct);
  }
}
