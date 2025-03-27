import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WishlistItem } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  private counter = new BehaviorSubject<number>(0);
  private wishCounter = new BehaviorSubject<number>(0);


  constructor(private http: HttpClient) {
    this.loadCounter();
    this.loadWishCounter();

  }

  private loadCounter() {
    this.http.get<{ counter: number }>('http://localhost:8088/cart')
      .subscribe({
        next: (data) => {
          const savedCounter = data?.counter || 0;
          this.counter.next(savedCounter);
        },
        error: () => {
          console.error('Failed to load counter.');
          this.counter.next(0);
        }
      });
  }
  private loadWishCounter() {
    this.http.get<WishlistItem[]>('http://localhost:8088/wishlist')
      .subscribe({
        next: (data) => {
          const savedCounter = data?.length || 0;
          this.wishCounter.next(savedCounter);
          console.log('Wishlist Count:', savedCounter);
        },
        error: () => {
          console.error('Failed to load wishlist counter.');
          this.wishCounter.next(0);
        }
      });
  }

  getCounter() {
    return this.counter.asObservable();
  }
  getWishCounter() {
    return this.wishCounter.asObservable();
  }

  refreshCounter() {
    this.loadCounter();
  }

  refreshWishCounter() {
    this.loadWishCounter();
    }




}
