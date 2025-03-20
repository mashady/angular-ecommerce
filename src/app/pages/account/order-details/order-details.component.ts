import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import {
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
  SlicePipe,
} from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [RouterLink, SlicePipe, DatePipe, CurrencyPipe, NgFor, NgIf],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log(orderId);

    this.accountService.account$.subscribe((account) => {
      if (account && account.user && account.user.orders) {
        this.order = account.user.orders.find((o: any) => o._id === orderId);
        //console.log(account.user.orders.find((o: any) => o._id === orderId));
      }
    });
    //console.log(this.order);
  }
}
