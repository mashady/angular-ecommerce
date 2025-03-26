import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-google-callback',
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.css'
})
export class GoogleCallbackComponent {
  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('userToken', token);

      this.authService.decode();
      console.log(this.authService.userData.value);

      this.router.navigate(['/account']);
    } else {
      console.error('No token found in URL');
      this.router.navigate(['/login']);
    }
  }
}
