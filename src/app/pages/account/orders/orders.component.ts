import { Component } from '@angular/core';
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

  constructor(private router: Router, private accountService: AccountService) {
    this.account$ = this.accountService.account$;
  }
}
