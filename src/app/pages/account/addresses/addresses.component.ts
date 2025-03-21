import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-addresses',
  imports: [RouterLink, NgFor],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent implements OnInit {
  addresses!: any;
  constructor(public accountService: AccountService) {}
  ngOnInit(): void {
    this.accountService.account$?.subscribe({
      next: (account) => {
        this.addresses = account.user.address;
        console.log(this.addresses);
      },
    });
  }
}
