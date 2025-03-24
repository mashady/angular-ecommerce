import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  userData: any;
  constructor(private http: HttpClient) { }

  getUserData(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get<any>('http://localhost:8088/user', { params: { page, limit } });
  }

  updateUser(userId: string, status: string): Observable<any> {
    return this.http.put<any>('http://localhost:8088/user', { userId, status });
  }
}
