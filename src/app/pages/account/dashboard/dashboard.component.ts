import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
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
