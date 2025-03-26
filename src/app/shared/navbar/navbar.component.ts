import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CounterServiceService } from '../../services/counter.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { ProductRequestService } from '../../services/product-request.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, AsyncPipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string = '';
  counter: number = 0;
  account$!: Observable<any>;
  searchQuery222: string = '';

  constructor(
    public AuthService: AuthService,
    public counterServiceService: CounterServiceService,
    public productService: ProductRequestService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.counterServiceService.getCounter().subscribe((response) => {
      this.counter = response;
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

  onSearch(event: Event): void {
    event.preventDefault();
    console.log('Search submitted with:', this.searchQuery222);
    this.router.navigate(['/products']);
  }

  onSearchChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.productService.setSearchQuery(target.value);
    this.productService.getSearchQuery()
    console.log("value service", this.productService.getSearchQuery());
    this.searchQuery222 = target.value;
    console.log('event', target.value);
  }
  xxxxxx($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.productService.setSearchQuery(target.value);
    this.productService.getSearchQuery()
    console.log("value service", this.productService.getSearchQuery());
    this.searchQuery222 = target.value;
    console.log('event', target.value);
  }
}
