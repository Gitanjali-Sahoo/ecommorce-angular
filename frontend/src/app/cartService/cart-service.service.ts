import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../types/CartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private http = inject(HttpClient);

  getCartProducts(): Observable<CartResponse> {
    return this.http.get<CartResponse>('/api/cart');
  }
  postProductToCart(productId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/cart', { productId });
  }
  updateProductToCart(
    id: number,
    quantity: number
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`/api/cart/${id}`, { quantity });
  }
  deleteProductToCart(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/api/cart/${id}`);
  }
}
