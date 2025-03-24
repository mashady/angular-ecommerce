import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8088/wishlist'; 

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  removeFromWishlist(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}