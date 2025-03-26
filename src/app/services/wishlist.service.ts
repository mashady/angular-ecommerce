import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8088/wishlist'; 

  constructor(private http: HttpClient) {}

  addToWishlist(productId: string):Observable<any>{
    const body = {productId}; 
    return this.http.post(this.apiUrl, body);
  }
  
  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  removeFromWishlist(productId: string): Observable<any> {
    const body = { productId };
    return this.http.delete<any>(this.apiUrl,{ body });
  }


  
}