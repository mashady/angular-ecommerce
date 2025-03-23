import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8088/cart';

  constructor(private http:HttpClient) { }


getUserCart():Observable<any>{

return this.http.get('http://localhost:8088/cart')

  }

addProductToCart(productId: string, quantity: number): Observable<any> {
  const body = { quantity }; 
  return this.http.post(`${this.apiUrl}/${productId}`, body);
}
reduceProductQuantity(productId: string, quantity: number): Observable<any> {
  const body = { quantity }; 
  return this.http.put(`${this.apiUrl}/${productId}`, body);
}

addPromoCode(promocode: string): Observable<any> {
  const body = { promocode }; 
  return this.http.post(`http://127.0.0.1:8088/promocode`, body);
}
deleteCart(): Observable<any> {
  return this.http.delete(`http://127.0.0.1:8088/cart`);
}
deleteFromCart(productId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${productId}`);
}

}
