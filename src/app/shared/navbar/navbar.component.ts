import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CounterServiceService } from '../../services/counter.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string = '';
  counter: number = 0;
  wishCounter:number=0;
  account$!: Observable<any>;

  constructor(
    public AuthService: AuthService,
    public counterServiceService: CounterServiceService,
    private accountService: AccountService
  ) {
    /*this.AuthService.userData.subscribe((user) => {
      this.username = user.firstName;
      console.log(user);
    });*/
    this.counterServiceService.getCounter().subscribe((response) => {
      this.counter = response;
    });
    this.counterServiceService.getWishCounter().subscribe((response) => {
      this.wishCounter = response;
      console.log(this.wishCounter)
    });
    this.account$ = this.accountService.account$;
    this.account$.subscribe((accountData) => {
      if (accountData && accountData.user) {
        this.username = accountData.user.firstName;
      }
    });
    this.accountService.getAccount().subscribe();
    console.log(this.account$);
  }
}

// todo => handle display username in the navbar
