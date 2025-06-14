import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Order {
  orderId: number;
  status: string;
  totalAmount: number;
  // add other necessary fields here
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:9095/orders'; // Change this if needed

  constructor(private http: HttpClient) {}
private getUserId(): number {
    const id = sessionStorage.getItem('userId');
    return id ? +id : 0;
  }
  createOrder(userId: number): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/create/${this.getUserId()}`, {});
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:9095/api/admin/orders/${orderId}`);
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${this.getUserId()}`);
  }

  getTotalAmount(orderId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${orderId}/total`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.put<Order>(`http://localhost:9095/api/admin/orders/status?status=${status}`, {});
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`http://localhost:9095/orders/${orderId}`);
  }
}
