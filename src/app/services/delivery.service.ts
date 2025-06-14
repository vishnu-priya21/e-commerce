import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Delivery {
  deliveryId?: number;
  address: string;
  deliveryDate: string;
  status: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = 'http://localhost:9092/shippings';

  constructor(private http: HttpClient) {}

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.baseUrl}/allDeliveries`);
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`http://localhost:9092/api/admin/shippings/view/${id}`);
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.baseUrl}/createDelivery`, delivery);
  }

  updateDelivery(id: number, delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`http://localhost:9092/api/admin/shippings/update/${id}`, delivery);
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:9092/api/admin/shippings/delete/${id}`);
  }
}
