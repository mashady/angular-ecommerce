import { Account } from './../interfaces/account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accountData = new BehaviorSubject<any>(null);
  account$ = this.accountData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAccount(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8088/user/profile').pipe(
      tap((account) => this.accountData.next(account)),
      catchError((error) => {
        console.error('Error fetching account', error);
        return throwError(() => new Error('Failed to fetch account'));
      })
    );
  }

  updateAccount(data: any): Observable<any> {
    return this.httpClient
      .put<any>('http://localhost:8088/user/profile', data)
      .pipe(
        tap((updatedAccount) => this.accountData.next(updatedAccount)),
        catchError((error) => {
          console.error('Error updating account', error);
          return throwError(() => new Error('Failed to update account'));
        })
      );
  }
}
