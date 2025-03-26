import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  private counter = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.loadCounter(); 
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

  getCounter() {
    return this.counter.asObservable(); 
  }

  setCounter(newCounter: number) {
    this.counter.next(newCounter);
    localStorage.setItem('cartCounter', newCounter.toString()); 
  }
  refreshCounter() {
    this.loadCounter();
}

}
