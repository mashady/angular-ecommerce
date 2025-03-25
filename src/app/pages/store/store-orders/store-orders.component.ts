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
  TitleCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
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
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css'],
})
export class StoreOrdersComponent implements OnInit {
  storeOrders$!: Observable<any[]>;
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalOrders: number = 0;
  totalPages: number = 0;
  statusOptions: string[] = [
    'pending',
    'paid',
    'shipped',
    'delivered',
    'cancelled',
  ];
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeOrders$ = this.storeService.getOrders();
    console.log(this.storeService.getOrders());
    this.storeOrders$.subscribe(
      (orders) => {
        this.totalOrders = orders.length;
        this.totalPages = Math.ceil(this.totalOrders / this.itemsPerPage);
        this.updatePaginatedOrders();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  updatePaginatedOrders() {
    this.storeOrders$.subscribe((orders) => {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedOrders = orders.slice(start, end);
    });
  }
  setPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedOrders();
  }
  onStatusChange(orderId: string, newStatus: string): void {
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);

    this.storeService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        console.log('Order status updated successfully', updatedOrder);
      },
      error: (err) => {
        console.error('Error updating order status', err);
      },
    });
  }
}
