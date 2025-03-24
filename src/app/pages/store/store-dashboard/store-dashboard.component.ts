import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-store-dashboard',
  imports: [NgIf, AsyncPipe],
  templateUrl: './store-dashboard.component.html',
  styleUrl: './store-dashboard.component.css',
})
export class StoreDashboardComponent {
  account$!: Observable<any>;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.account$ = this.accountService.account$;
    console.log(this.account$);
  }
  handleLogout() {
    console.log('logout');
    this.authService.logout();
  }
}
