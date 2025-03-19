import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string = '';
  constructor(public AuthService: AuthService) {
    this.AuthService.userData.subscribe((user) => {
      this.username = user.firstName;
      console.log(user);
    });
  }
}

// todo => handle display username in the navbar
