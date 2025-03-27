import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CounterServiceService } from '../../services/counter.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { ProductRequestService } from '../../services/product-request.service';
import { CouponRequestService } from '../../services/coupon-request.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, AsyncPipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string = '';
  counter: number = 0;
  wishCounter:number=0;
  account$!: Observable<any>;
  searchQuery222: string = '';
  coupons$!: Observable<any>;
  currentCoupon: any;
  constructor(
    public AuthService: AuthService,
    public counterServiceService: CounterServiceService,
    public productService: ProductRequestService,
    public couponService: CouponRequestService,
    private accountService: AccountService,
    private router: Router
  ) {
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
    this.coupons$ = this.couponService.getAllCoupons().pipe(
      map((response) => response.Promocodes)
    );
    this.coupons$.subscribe((coupons) => {
      this.currentCoupon = coupons[0];
    });
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
