import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject<any>(null);
  constructor(
    public httpClient: HttpClient,
    private router: Router,
    private accountService: AccountService
  ) {
    if (localStorage.getItem('userToken')) {
      this.decode();
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  decode() {
    const token: any = localStorage.getItem('userToken');
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
  }
  login(data: any) {
    return this.httpClient.post('http://localhost:8088/login', data);
  }
  register(data: any) {
    return this.httpClient.post('http://localhost:8088/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address,
      role: data.role,
    });
  }
  test(data: any) {
    return this.httpClient.post('http://localhost:8088/wishlist', data);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.accountService.accountData.next(null);
    //this.router.navigate(['/']);
  }
}
