import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-store',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent {
  constructor(private authService: AuthService) {}

  handleLogout() {
    console.log('logut out');
    this.authService.logout();
  }
}
