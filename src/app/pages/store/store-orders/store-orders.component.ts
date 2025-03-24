import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  NgFor,
  NgIf,
  DatePipe,
  SlicePipe,
  CurrencyPipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-orders',
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    DatePipe,
    SlicePipe,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css'],
})
export class StoreOrdersComponent implements OnInit {
  storeOrders$!: Observable<any[]>;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeOrders$ = this.storeService.getOrders();
    console.log(this.storeService.getOrders());
    this.storeOrders$.subscribe(
      (orders) => {
        console.log('Orders fetched:', orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
