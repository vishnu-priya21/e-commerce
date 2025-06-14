import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PaymentRequest {
  orderId: number;
  amount: number;
  paymentType: string; // e.g., 'CREDIT_CARD', 'DEBIT_CARD', 'UPI'
}

export interface PaymentResponse {
  transactionId: string;
  paymentType: string;
  totalAmount: number;
  status: string;
  paymentTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:9093/payments';

  constructor(private http: HttpClient) {}

  processPayment(request: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.baseUrl}/process`, request);
  }

  getAllPayments(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(`${this.baseUrl}/all`);
  }

  getPaymentsByStatus(status: string): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(`${this.baseUrl}/status/${status}`);
  }

  getPaymentsByType(type: string): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(`${this.baseUrl}/type/${type}`);
  }
}
