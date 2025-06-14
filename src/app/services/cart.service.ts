// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItemRequestDTO {
  productId: number;
  quantity: number;
}

export interface CartItemDTO {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface CartDTO {
  cartId: number;
  userId: number;
  totalPrice: number;
  cartItems: CartItemDTO[];
}
@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:9094/carts'; // Replace with correct port

  constructor(private http: HttpClient) {}
  private getUserId(): number {
    const id = sessionStorage.getItem('userId');
    return id ? +id : 0;
  }
  getCart(userId: number): Observable<CartDTO> {
    return this.http.get<CartDTO>(`${this.apiUrl}/${this.getUserId()}`);
  }

  addToCart(userId: number, item: CartItemRequestDTO): Observable<CartDTO> {
    return this.http.post<CartDTO>(`${this.apiUrl}/add/${this.getUserId()}`, item);
  }

  removeItem(userId: number, productId: number): Observable<CartDTO> {
    return this.http.delete<CartDTO>(`${this.apiUrl}/${this.getUserId()}/remove/${productId}`);
  }

  clearCart(userId: number): Observable<CartDTO> {
    return this.http.delete<CartDTO>(`${this.apiUrl}/${this.getUserId()}/clear`);
  }

  getTotalPrice(cartId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalprice/${cartId}`);
  }
}
