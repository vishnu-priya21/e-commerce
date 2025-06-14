import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  productId?: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  stockQuantity: number;
  expiryDate: string;         // string in ISO format e.g. '2025-12-31'
  manufactureDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:9097/products';

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.baseUrl}/addproducts`, product);
}

updateProduct(productId: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.baseUrl}/updateById/${productId}`, product);
}

getProductById(productId: number): Observable<Product> {
  return this.http.get<Product>(`${this.baseUrl}/${productId}`);
}

viewAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.baseUrl}/viewAll`);
}

deleteProductById(productId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${productId}`);
}
}
