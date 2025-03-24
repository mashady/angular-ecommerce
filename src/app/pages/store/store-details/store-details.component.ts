import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-store-details',
  imports: [],
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.css',
})
export class StoreDetailsComponent {
  storeInfo: any = {};
  apiError: string = '';
  storeId: string = '';
  account!: any;
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.account = this.accountService.account$;
    console.log(this.accountService.accountData);
    this.storeId = this.route.snapshot.paramMap.get('id') || '';
    this.storeService.getSingleSore(this.storeId).subscribe({
      next: (data: any) => {
        console.log(data.store);
        this.storeInfo = data.store;
      },
      error: (err) => {
        console.error('Error fetching store data:', err);
        this.apiError = 'Error fetching store data.';
      },
    });
  }
}
