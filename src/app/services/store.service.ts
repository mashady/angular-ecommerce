import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any>(`http://localhost:8088/storeproducts`);
  }
  getOrders(): Observable<any[]> {
    return this.http
      .get<any>(`http://localhost:8088/storeorders`)
      .pipe(map((orders) => orders.data));
  }
  getSingleSore(storeId: string): Observable<any[]> {
    return this.http
      .get<any>(`http://localhost:8088/store/${storeId}`)
      .pipe(map((res) => res));
  }
  getMyStore(): Observable<any[]> {
    return this.http
      .get<any>(`http://localhost:8088/store`)
      .pipe(map((res) => res.store));
  }
  createStore(data: any): Observable<any[]> {
    return this.http
      .post<any>(`http://localhost:8088/store`, data)
      .pipe(map((res) => res.data));
  }
  updateStore(storeId: string, data: any): Observable<any[]> {
    return this.http
      .put<any>(`http://localhost:8088/store/${storeId}`, data)
      .pipe(map((res) => res.data));
  }
  deleteStore(storeId: string): Observable<any[]> {
    return this.http
      .delete<any>(`http://localhost:8088/store/${storeId}`)
      .pipe(map((res) => res.data));
  }
  updateOrderStatus(orderId: string, status: any): Observable<any[]> {
    return this.http
      .put<any>(`http://localhost:8088/orders/${orderId}`, { status: status })
      .pipe(map((res) => res));
  }
}
