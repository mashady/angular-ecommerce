import { Injectable } from '@angular/core';
import { Coupon, CouponResponse } from '../interfaces/coupon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponRequestService {
  private apiUrl = 'http://localhost:8088';
  constructor(private http: HttpClient) { }

  getAllCoupons(): Observable<CouponResponse> {
    return this.http.get<CouponResponse>(`${this.apiUrl}/getPromocodes`);
  }

  addCoupon(coupon: Coupon): Observable<CouponResponse> {
    return this.http.post<CouponResponse>(`${this.apiUrl}/addPromocode`, coupon);
  }

  updateCoupon(id: string, coupon: Coupon): Observable<CouponResponse> {
    return this.http.put<CouponResponse>(`${this.apiUrl}/updatePromocode/${id}`, coupon);
  }

  deleteCoupon(id: string): Observable<CouponResponse> {
    return this.http.delete<CouponResponse>(`${this.apiUrl}/deletePromocode/${id}`);
  }
}
