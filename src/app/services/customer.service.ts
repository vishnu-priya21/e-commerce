import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}/api/customer`;

  constructor(private http: HttpClient) {}

  // CART APIs
  addToCart(userId: number, item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/carts/add/${userId}`, item);
  }

  removeCartItem(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carts/${userId}/remove/${productId}`);
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carts/${userId}/clear`);
  }

  // PRODUCTS
  viewProductById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${productId}`);
  }

  // ORDER
  createOrder(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/create/${userId}`, {});
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${orderId}`);
  }

  deleteOrderById(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`);
  }

  // PAYMENT
  processPayment(payment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/process`, payment);
  }

  getPaymentsByStatus(status: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payments/status/${status}`);
  }

  // DELIVERY
  createDelivery(delivery: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/shippings/createDelivery`, delivery);
  }

  getDeliveryById(deliveryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/shippings/view/${deliveryId}`);
  }

  deleteDelivery(deliveryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/shippings/delete/${deliveryId}`);
  }
}
