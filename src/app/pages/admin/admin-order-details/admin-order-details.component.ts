import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
  SlicePipe,
} from '@angular/common';

@Component({
  selector: 'app-admin-order-details',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    NgFor,
    NgIf,
    SlicePipe,
    RouterLink,
  ],
  templateUrl: './admin-order-details.component.html',
  styleUrl: './admin-order-details.component.css'
})
export class AdminOrderDetailsComponent {
  order$: Observable<any> | null = null;
  orderId: string | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log('Order ID from route:', this.orderId);

    this.orderService.getOrders(1, 200).subscribe((response) => {
      const order = response.orders.find((o: any) => o._id === this.orderId);
      this.order$ = new Observable((observer: any) => {
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
