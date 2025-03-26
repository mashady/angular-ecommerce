import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../services/order.service';
import {
  NgFor,
  NgIf,
  DatePipe,
  TitleCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    RouterLink,
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];page: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];
  currentPage: number = 1;
  limit: number = 9;
  statusOptions: string[] = [
    'pending',
    'paid',
    'shipped',
    'delivered',
    'cancelled',
  ];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getOrders(this.page, this.limit).subscribe({
      next: (response) => {
        console.log(response);
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
        },
      error: (err) => {
        console.error('Error fetching orders', err);
      },
    });
  }

  onStatusChange(orderId: string, newStatus: string): void {
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        console.log('Order status updated successfully', updatedOrder);
      },
      error: (err) => {
        console.error('Error updating order status', err);
      },
    });
  }

  pagenumber(page: number): void {
    console.log(page);
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.orderService.getOrders(page, this.limit).subscribe({
      next: (response) => {
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
      }
    });
  }
}
