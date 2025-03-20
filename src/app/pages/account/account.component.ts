import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { Account } from '../../interfaces/account';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  account$!: Observable<any>;
  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.account$ = this.accountService.account$;
    this.accountService.getAccount().subscribe();
    console.log(this.account$);
  }
  handleLogout() {
    console.log('logut out');
    this.authService.logout();
  }
}
