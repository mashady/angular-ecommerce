import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Banner, BannerResponse, BannersResponse, BannerIdResponse, updateBannerResponse, deleteBannerResponse, addBannerResponse } from '../interfaces/banner';
@Injectable({
  providedIn: 'root'
})
export class BannerRequestService {
  private apiUrl = 'http://localhost:8088';
  constructor(private http: HttpClient) { }

  getBannerList() : Observable<any>{
    return this.http.get<BannersResponse>(`${this.apiUrl}/getBanners`);
  }

  getBannerByTitle(title: string): Observable<Banner> {
    return this.http.get<BannerResponse>(`${this.apiUrl}/getBanner`,{params:{title:title}}).pipe(
      map(response => {
        if (response && response.reqBanner) {
          return response.reqBanner;
        }
        throw new Error('Invalid banner data format');
      })
    );
  }

  getBannerById(id: string): Observable<Banner> {
    return this.http.get<BannerIdResponse>(`${this.apiUrl}/getBanner/${id}`).pipe(
      map(response => {
        if (response && response.existingBanner) {
          return response.existingBanner;
        }
        throw new Error('Invalid banner data format');
      })
    );
  }

  addBanner(banner: FormData): Observable<any> {
    return this.http.post<addBannerResponse>(`${this.apiUrl}/addBanner`, banner);
  }

  updateBanner(id: string, banner: FormData): Observable<any> {
    return this.http.put<updateBannerResponse>(`${this.apiUrl}/updateBanner/${id}`, banner);
  }

  deleteBanner(id: string): Observable<any> {
    return this.http.delete<deleteBannerResponse>(`${this.apiUrl}/deleteBanner/${id}`);
  }
}
