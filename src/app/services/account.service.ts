import { Account } from './../interfaces/account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, map } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accountData = new BehaviorSubject<any>(null);
  account$ = this.accountData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAccount(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8088/user/profile').pipe(
      /* map((res) => {
        console.log(res.user);
        this.accountData = res.user;
        return res.user;
      })*/
      tap((account) => this.accountData.next(account)),
      catchError((error) => {
        console.error('Error fetching account', error);
        return throwError(() => new Error('Failed to fetch account'));
      })
    );
  }

  setAccount(account: any) {
    this.accountData.next(account);
  }

  updateAccount(data: any): Observable<any> {
    return this.httpClient
      .put<any>('http://localhost:8088/user/profile', data)
      .pipe(
        switchMap(() => this.getAccount()),
        tap((updatedAccount) => this.accountData.next(updatedAccount)),
        catchError((error) => {
          console.error('Error updating account', error);
          return throwError(() => new Error('Failed to update account'));
        })
      );
  }
  addAddress(newAddress: any): Observable<any> {
    const currentAccount = this.accountData.getValue();

    if (currentAccount && currentAccount.user && currentAccount.user.address) {
      delete newAddress._id;

      const updatedAddresses = currentAccount.user.address.map(
        (address: any) => {
          const { _id, ...cleanedAddress } = address;
          return cleanedAddress;
        }
      );

      updatedAddresses.push(newAddress);

      console.log(updatedAddresses);

      return this.updateAccount({ address: updatedAddresses }).pipe(
        switchMap(() => this.getAccount())
      );
    } else {
      console.error('No address array found in the account data.');
      return throwError(() => new Error('Failed to add address'));
    }
  }

  updateAddress(updatedAddress: any, addressId: string): Observable<any> {
    const currentAccount = this.accountData.getValue();
    console.log(addressId);

    if (currentAccount && currentAccount.user && currentAccount.user.address) {
      const addressIndex = currentAccount.user.address.findIndex(
        (address: any) => address._id === addressId
      );

      if (addressIndex !== -1) {
        const addressToUpdate = {
          ...currentAccount.user.address[addressIndex],
          ...updatedAddress,
        };
        delete addressToUpdate._id;

        const updatedAddresses = currentAccount.user.address.map(
          (address: any) => {
            const { _id, ...cleanedAddress } = address;
            return cleanedAddress;
          }
        );

        updatedAddresses[addressIndex] = addressToUpdate;

        console.log(updatedAddresses);

        return this.updateAccount({ address: updatedAddresses }).pipe(
          switchMap(() => this.getAccount())
        );
      } else {
        console.error('Address not found.');
        return throwError(() => new Error('Address not found'));
      }
    } else {
      console.error('No address array found in the account data.');
      return throwError(() => new Error('Failed to update address'));
    }
  }
  beAseller(): Observable<any> {
    return this.httpClient
      .put<any>('http://localhost:8088/user/profile', { role: 'seller' })
      .pipe(
        catchError((error) => {
          console.error('Error changing role to seller:', error);
          throw error;
        })
      );
  }
}
