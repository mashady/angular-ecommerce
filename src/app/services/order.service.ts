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

  cashCheckOut(cart: string, shippingAddress: any): Observable<any> {
    const body = { cart, shippingAddress };  
    console.log("Sending Checkout Request:", body); // Debugging line
    return this.http.post<any>('http://127.0.0.1:8088/checkout/cash', body);
  }
  ePayCheckOut(cart: string, shippingAddress: any): Observable<any> {
    const body = { cart, shippingAddress };  
    console.log("Sending Checkout Request:", body); 
    return this.http.post<any>('http://127.0.0.1:8088/checkout/epay', body);
  }
}
