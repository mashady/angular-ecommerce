import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
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
