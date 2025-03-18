import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  username: string = '';
  constructor(private AuthService: AuthService) {}
  ngOnInit(): void {
    this.AuthService.userData.subscribe((user) => {
      this.username = user.email.split('@')[0];
      console.log(user);
    });
  }
}

// todo => handle display username in the navbar
