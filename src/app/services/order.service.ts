import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/cart';
  constructor() { 


  }
  // cashCheckOut(productId: string, quantity: number): Observable<any> {
  //   const body = { quantity }; 
  //   return this.http.post(`${this.apiUrl}/${productId}`, body);
  // }
}
