import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  DatePipe,
  NgFor,
  NgForOf,
  NgIf,
  SlicePipe,
} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, NgIf, AsyncPipe, NgFor, SlicePipe, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  account$!: Observable<any>;
  orders: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalOrders: number = 0;

  constructor(private router: Router, private accountService: AccountService) {}
  ngOnInit() {
    this.account$ = this.accountService.account$;
    console.log(this.account$);

    this.account$.subscribe((accountData) => {
      if (accountData && accountData.user && accountData.user.orders) {
       console.log(accountData.user.orders);
       this.orders = accountData.user.orders;
        this.totalOrders = this.orders.length;
        console.log(this.orders);
      }
    });
  }
  get paginatedOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.orders.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.totalOrders / this.pageSize);
  }
}
