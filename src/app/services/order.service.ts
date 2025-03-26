import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface OrderResponse {
  orders: Order[];
  totalPages: number;
}

export interface Order {
  _id: string;
  userId: string;
  products: any[];
  totalOrderPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/orders';
  constructor(private http: HttpClient) {}

  getOrders(page: number, limit: number): Observable<OrderResponse> {
    return this.http
      .get<OrderResponse>(this.apiUrl, { params: { page, limit } })
  }

  updateOrderStatus(orderId: string, status: any): Observable<Order> {
    return this.http
      .put<Order>(` http://localhost:8088/orders/${orderId}`, { status: status })
      .pipe(map((res) => res));
  }
  // cashCheckOut(productId: string, quantity: number): Observable<any> {
  //   const body = { quantity }; 
  //   return this.http.post(`${this.apiUrl}/${productId}`, body);
  // }