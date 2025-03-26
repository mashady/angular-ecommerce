import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  NgFor,
  NgIf,
  SlicePipe,
} from '@angular/common';

@Component({
  selector: 'app-store-order-details',
  imports: [
    SlicePipe,
    DatePipe,
    CurrencyPipe,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './store-order-details.component.html',
  styleUrl: './store-order-details.component.css',
})
export class StoreOrderDetailsComponent {
  order$: Observable<any> | null = null;
  orderId: string | null = null;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log('Order ID from route:', this.orderId);

    this.storeService.getOrders().subscribe((orders) => {
      const order = orders.find((o: any) => o._id === this.orderId);
      this.order$ = new Observable((observer) => {
        if (order) {
          observer.next(order);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }
}
