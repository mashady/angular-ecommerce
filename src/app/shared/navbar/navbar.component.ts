import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { CounterServiceService } from '../../services/counter.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string = '';
  counter: number = 0;
  constructor(
    public AuthService: AuthService,
    public counterServiceService: CounterServiceService
  ) {
    this.AuthService.userData.subscribe((user) => {
      this.username = user.firstName;
      console.log(user);
    });
    this.counterServiceService.getCounter().subscribe((response) => {
      this.counter = response;
    });
  }
}

// todo => handle display username in the navbar
