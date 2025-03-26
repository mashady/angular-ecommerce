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
    public accountService: AccountService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.account$ = this.accountService.account$;
    console.log(this.account$);
  }
  onBeSeller() {
    this.accountService.beAseller().subscribe({
      next: (response) => {
        console.log('Role changed to seller successfully', response);
        // call auth decoded
        console.log('response.token', response.token);

        localStorage.setItem('userToken', response.token);
        this.authService.decode();

        this.router.navigate(['/store/settings']);
      },
      error: (error) => {
        console.error('Error while changing role:', error);
      },
    });
  }
  handleLogout() {
    console.log('logout');
    this.authService.logout();
  }
}
